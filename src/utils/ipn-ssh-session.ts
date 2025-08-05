/**
 * @fileoverview Higher-level wrapper for ipn-ssh-client.ts that handles
 * fetching of auth keys to initialize the client and window management for
 * popups where SSH sessions are rendered.
 */

import { IMachine } from "src/types"
import { trackEvent } from "src/utils/analytics"
import type { IPNSSHClient, IPNSSHError } from "src/utils/ipn-ssh-client"
import { createIPNSSHClient } from "src/utils/ipn-ssh-client"
import { runSneakersEffect } from "src/utils/sneakers"
import { isDevInstance } from "src/utils/util"

const MILLISECONDS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60

type IPNSSHSessionRequest = {
  username: string
  machine: IMachine
  clientHostname: string
  reportError: (errorMessage: string) => void
  sneakersEffect: boolean
}

export function runIPNSSHSession(req: IPNSSHSessionRequest) {
  const { machine } = req
  const existingSessionWindow = sessionWindowsByMachineId.get(machine.id)
  if (existingSessionWindow && !existingSessionWindow.closed) {
    existingSessionWindow.focus()
    return
  }
  const sessionWindow = window.open(
    undefined,
    undefined,
    [
      "popup",
      `width=800`,
      `height=450`,
      `top=${window.screenTop + 20}`,
      `left=${window.screenLeft + 20}`,
    ].join(",")
  )

  if (!sessionWindow) {
    req.reportError(
      "Could not open a new window, please check your popup blocker."
    )
    return
  }

  sessionWindowsByMachineId.set(machine.id, sessionWindow)

  if (!addedWindowUnloadListeners) {
    window.addEventListener("beforeunload", windowBeforeunloadListener)
    window.addEventListener("unload", windowUnloadListener)
    addedWindowUnloadListeners = true
  }

  if (sshSessionAuthKey) {
    runAuthedIPNSSHSession(req, sessionWindow, sshSessionAuthKey)
    return
  }

  pendingSessions.set(sessionWindow, req)
  sessionWindow.location.href = `/tsconnect/reauth?target=${machine.stableId}`
}

// Export function to global scope so that the tsconnect-reauth-complete.html
// template can call it.
declare global {
  var tsconnectReauthComplete: (
    sshSessionWindow: Window,
    authKey: string
  ) => void
}

window.tsconnectReauthComplete = (sessionWindow: Window, authKey: string) => {
  const req = pendingSessions.get(sessionWindow)
  if (!req) {
    if (isDevInstance()) {
      console.error(
        "Could not open pending SSH session for window",
        sessionWindow
      )
    }
    return
  }
  pendingSessions.delete(sessionWindow)
  sshSessionAuthKey = authKey

  let ranSession = false
  const runSession = () => {
    if (ranSession) {
      return
    }
    ranSession = true
    runAuthedIPNSSHSession(req, sessionWindow, authKey)
  }

  // Wait for the about:blank navigation to begin before we attempt to continue
  // the SSH session (which renders the MachineSSHSession component into the
  // window).
  sessionWindow.addEventListener("unload", () => setTimeout(runSession, 0), {
    once: true,
  })

  // As a fallback, if the unload event does not fire (which happens sometimes
  // in Safari), we also try to run the session after a delay, by which point
  // the navigation definitely should have happened.
  setTimeout(runSession, 200)

  sessionWindow.location.href = "about:blank"
}

let sshSessionAuthKey: string | undefined
let ipnSSHClient: IPNSSHClient | undefined
const pendingSessions = new WeakMap<Window, IPNSSHSessionRequest>()

async function runAuthedIPNSSHSession(
  {
    machine,
    username,
    clientHostname,
    reportError,
    sneakersEffect,
  }: IPNSSHSessionRequest,
  sshSessionWindow: Window,
  authKey: string
) {
  const viewportMetaNode = sshSessionWindow.document.createElement("meta")
  viewportMetaNode.setAttribute("name", "viewport")
  viewportMetaNode.setAttribute(
    "content",
    "width=device-width, initial-scale=1"
  )
  sshSessionWindow.document.head.append(viewportMetaNode)
  sshSessionWindow.document.body.className = "overflow-hidden bg-black"

  sshSessionWindow.document.title = `Tailscale - SSH to ${machine.name}`

  // Load stylesheet into new window
  if (isDevInstance()) {
    for (const styleNode of document.querySelectorAll<HTMLStyleElement>(
      "head style"
    )) {
      const newStyleNode = sshSessionWindow.document.createElement("style")
      newStyleNode.innerHTML = styleNode.innerHTML
      sshSessionWindow.document.head.append(newStyleNode)
    }
  } else {
    for (const linkNode of document.querySelectorAll<HTMLLinkElement>(
      "head link[rel=stylesheet]"
    )) {
      const newLinkNode = sshSessionWindow.document.createElement("link")
      newLinkNode.rel = "stylesheet"
      newLinkNode.href = linkNode.href
      sshSessionWindow.document.head.append(newLinkNode)
    }
  }

  function handleIPNSSHError(error: IPNSSHError) {
    console.error("IPN Error", error)
    if (!isSSHSessionRunning) {
      // If the SSH session is no longer running, no need to report the error
      // to the user (this avoids errors when the user closes the window
      // without gracefully ending the SSH session).
      return
    }
    switch (error.type) {
      case "panic":
        reportError(
          "Tailscale SSH has encountered an error, please reload the page and try again."
        )
        break
      case "ssh-session":
        let errorAdvice = "please try again or contact support"
        if (error.err.includes("Dial Error: context deadline exceeded")) {
          errorAdvice = "the machine may be offline"
        } else if (error.err.includes("ssh: unable to authenticate")) {
          errorAdvice =
            "authentication failed (there may not be a local user with that name)"
        }
        reportError(
          `Tailscale SSH encountered an error during the session, ${errorAdvice}.`
        )
        break
    }
  }

  let isSSHSessionRunning = false
  sshSessionWindow.addEventListener("beforeunload", (event) => {
    if (isSSHSessionRunning) {
      event.preventDefault()
      // Modern browsers don't display the message, but it doesn't hurt to
      // include it.
      event.returnValue =
        "This is an active SSH session. Are you sure you want to close it?"
    }
  })
  const cleanupFns: (() => void)[] = []
  sshSessionWindow.addEventListener("unload", () => {
    for (const cleanupFn of cleanupFns) {
      cleanupFn()
    }
    sessionWindowsByMachineId.delete(machine.id)
    isSSHSessionRunning = false
  })

  const termContainerNode = sshSessionWindow.document.createElement("div")
  termContainerNode.className = "absolute inset-0 md:inset-2 overflow-hidden"
  sshSessionWindow.document.body.append(termContainerNode)

  const { visualViewport: sshSessionWindowVisualViewport } = sshSessionWindow
  if (sshSessionWindowVisualViewport) {
    // Make sure that the terminal does not end up under the keyboard on mobile.
    // The VisualViewport API is the best way of doing this for now, the
    // VirtualKeyboard API's CSS variables (http://go/virtual-keyboard-css) are
    // not supported in WebKit yet.
    const updateTermContainerMaxHeight = () =>
      (termContainerNode.style.maxHeight =
        sshSessionWindowVisualViewport.height + "px")

    updateTermContainerMaxHeight()
    sshSessionWindowVisualViewport.addEventListener(
      "resize",
      updateTermContainerMaxHeight
    )
    cleanupFns.push(() =>
      sshSessionWindowVisualViewport.removeEventListener(
        "resize",
        updateTermContainerMaxHeight
      )
    )
  }

  const progressNode = sshSessionWindow.document.createElement("div")
  progressNode.className =
    "absolute inset-0 flex items-center justify-center text-white font-mono"
  sshSessionWindow.document.body.append(progressNode)

  const lockedOutNode = sshSessionWindow.document.createElement("div")
  lockedOutNode.className =
    "absolute inset-2 flex items-center justify-center text-white font-mono"
  lockedOutNode.style.visibility = "hidden"
  sshSessionWindow.document.body.append(lockedOutNode)

  function showProgress(message: string) {
    progressNode.textContent = message
  }

  showProgress("Loading Tailscale SSH Console…")
  ipnSSHClient =
    ipnSSHClient ??
    (await createIPNSSHClient(authKey, clientHostname, {
      onNeedsLogin() {
        showProgress("Logging in to Tailscale…")
      },
      onStarting() {
        showProgress("Starting Tailscale client…")
      },
      onError: handleIPNSSHError,
      onLockedOutState(lockedOut: boolean, nodeKey: string) {
        if (lockedOut) {
          lockedOutNode.style.visibility = "visible"
          lockedOutNode.textContent =
            "The ephemeral node created for this SSH session needs to be signed, due to Tailnet Lock being enabled on this domain. Run the following command on a device with a trusted tailnet lock key: tailscale lock sign " +
            nodeKey
          progressNode.style.visibility = "hidden"
        } else {
          lockedOutNode.style.visibility = "hidden"
          progressNode.style.visibility = "visible"
        }
      },
    }))

  showProgress("Connecting to Tailscale…")
  await ipnSSHClient.isRunning

  const sessionStartTime = Date.now()
  cleanupFns.push(() =>
    trackEvent("Closed machine SSH session", {
      sshProperties: {
        sessionDurationMinutes: Math.round(
          (Date.now() - sessionStartTime) /
            MILLISECONDS_PER_SECOND /
            SECONDS_PER_MINUTE
        ),
      },
    })
  )

  ipnSSHClient.runSSHSession({
    username,
    hostname: machine.fqdn,
    timeoutSeconds: 10,
    termContainerNode,
    onRun() {
      isSSHSessionRunning = true
    },
    onConnectionProgress: showProgress,
    onConnected() {
      if (sneakersEffect) {
        runSneakersEffect(sshSessionWindow, termContainerNode)
      }
      progressNode.remove()
    },
    onDone() {
      isSSHSessionRunning = false
      sshSessionWindow.close()
    },
  })
}

const sessionWindowsByMachineId = new Map<string, Window>()

let addedWindowUnloadListeners = false
function windowBeforeunloadListener(event: BeforeUnloadEvent) {
  const openedSSHWindowCount = Array.from(
    sessionWindowsByMachineId.values()
  ).filter((w) => !w.closed).length
  if (openedSSHWindowCount) {
    event.preventDefault()
    // Modern browsers don't display the message, but it doesn't hurt to include
    // it.
    event.returnValue =
      openedSSHWindowCount > 1
        ? `There are ${openedSSHWindowCount} SSH sessions open. Are you sure you want to close them?`
        : "There is an SSH session open. Are you sure you want to close it?"
  }
}

function windowUnloadListener() {
  for (const window of sessionWindowsByMachineId.values()) {
    if (!window.closed) {
      window.close()
    }
  }
  ipnSSHClient?.logout()
}
