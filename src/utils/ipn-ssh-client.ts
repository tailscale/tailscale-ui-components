/**
 * @fileoverview Low-level wrapper for @tailscale/connect package to allow it to
 * be used for SSH sessions. Handles:
 * - Using dynamic imports so that we only load the package when actually
 *   invoking the functionality.
 * - Using a local/dev version of the package if doing two-sided development.
 * - Creating only one IPN client per session.
 * - IPN client lifecycle management, so that callers don't need to wait for it
 *   to load and connect.
 */

import defaultWasmURL from "@tailscale/connect/main.wasm?url"
import "@tailscale/connect/pkg.css"
import { isDevInstance } from "src/utils/util"

export type IPNSSHClient = {
  logout: () => void
  isRunning: Promise<boolean>
  runSSHSession: (def: IPNSSHSessionDef) => void
}

type IPNSSHSessionDef = {
  username: string
  hostname: string
  timeoutSeconds?: number
  termContainerNode: HTMLDivElement
  onRun: () => void
  onConnectionProgress: (message: string) => void
  onConnected: () => void
  onDone: () => void
}

type IPNSSHClientCallbacks = {
  onNeedsLogin?: () => void
  onStarting?: () => void
  onLockedOutState?: (lockedOut: boolean, nodeKey: string) => void
  onError?: (error: IPNSSHError) => void
}

export type IPNSSHError = {
  type: "panic" | "ssh-session"
  err: string
}

export function createIPNSSHClient(
  authKey: string,
  hostname: string,
  callbacks: IPNSSHClientCallbacks
): Promise<IPNSSHClient> {
  if (!ipnSSHClientPromise) {
    ipnSSHClientPromise = loadIPNSSHClient(authKey, hostname, callbacks)
  }
  return ipnSSHClientPromise
}

export async function preloadIPNSSHClient() {
  if (preloadedIPNSSHClient) {
    return
  }
  preloadedIPNSSHClient = true
  const { wasmURL } = await loadTailscaleConnect()
  const linkNode = document.createElement("link")
  linkNode.rel = "preload"
  linkNode.as = "fetch"
  linkNode.crossOrigin = "anonymous"
  linkNode.href = wasmURL
  document.head.append(linkNode)
}

let preloadedIPNSSHClient = false

async function loadTailscaleConnect() {
  let tsconnectModule: typeof import("@tailscale/connect")
  let wasmURL: string | undefined
  if (
    isDevInstance() &&
    new URLSearchParams(window.location.search).get("use_dev_tsconnect") ===
      "true"
  ) {
    console.log("Using dev @tailscale/connect package")
    try {
      // Ignore TypeScript errors, it doesn't know that this dynamic import
      // also has the same type as the npm package.
      // @ts-ignore
      tsconnectModule = await import("http://localhost:9090/pkg/pkg.js")
    } catch (e) {
      console.error(
        "Failed to load dev @tailscale/connect package, ensure that the server is running. " +
          "In the OSS repo, start it with:\n" +
          "./tool/go run ./cmd/tsconnect dev-pkg"
      )
      throw e
    }
    wasmURL = "http://localhost:9090/pkg/main.wasm"
  } else {
    tsconnectModule = await import("@tailscale/connect")
    wasmURL = defaultWasmURL
  }
  return { tsconnectModule, wasmURL }
}

let ipnSSHClientPromise: Promise<IPNSSHClient> | undefined

async function loadIPNSSHClient(
  authKey: string,
  hostname: string,
  callbacks: IPNSSHClientCallbacks
): Promise<IPNSSHClient> {
  const { tsconnectModule, wasmURL } = await loadTailscaleConnect()

  const panicHandler = (err: string) => {
    callbacks.onError?.({ type: "panic", err })
  }
  const ipn = await tsconnectModule.createIPN({
    wasmURL,
    controlURL: window.location.protocol + "//" + window.location.host,
    authKey,
    panicHandler,
    hostname,
  })

  let isRunning = false
  let hasNetMap = false
  let lockedOut = false
  let pendingSSHSessions: IPNSSHSessionDef[] = []
  function runSSHSession(def: IPNSSHSessionDef) {
    def.onRun()
    tsconnectModule.runSSHSession(def.termContainerNode, def, ipn, {
      onConnectionProgress: def.onConnectionProgress,
      onConnected: def.onConnected,
      onDone: def.onDone,
      onError(err) {
        callbacks.onError?.({ type: "ssh-session", err })
      },
    })
  }

  const isRunningPromise = new Promise<boolean>((resolve, reject) => {
    function sshConnectIfReady() {
      if (hasNetMap && !lockedOut) {
        resolve(true)
        isRunning = true
        for (const session of pendingSSHSessions) {
          runSSHSession(session)
        }
        pendingSSHSessions = []
      }
    }

    ipn.run({
      notifyState(state) {
        switch (state) {
          case "NeedsLogin":
            callbacks.onNeedsLogin?.()
            ipn.login()
            break
          case "Starting":
            callbacks.onStarting?.()
            break
          case "Running":
            sshConnectIfReady()
            break
        }
      },
      notifyNetMap(netMapStr) {
        const netMap = JSON.parse(netMapStr) as IPNNetMap
        lockedOut = netMap.lockedOut
        callbacks.onLockedOutState?.(lockedOut, netMap.self.nodeKey)
        hasNetMap = true
        sshConnectIfReady()
      },
      notifyBrowseToURL(url) {
        // No-op, we're already logged in via the auth key
      },
      notifyPanicRecover(err) {
        panicHandler(err)
      },
    })
  })

  return {
    isRunning: isRunningPromise,
    logout() {
      ipn.logout()
    },
    runSSHSession(def) {
      if (isRunning) {
        runSSHSession(def)
      } else {
        pendingSSHSessions.push(def)
      }
    },
  }
}
