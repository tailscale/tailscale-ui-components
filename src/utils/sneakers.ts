/**
 * @fileoverview Implements a text revealing effect inspired by the 1992 movie
 * Sneakers. Done as an (inert) DOM overlay on top of the the xterm.js DOM
 * renderer output, so that we minimize the risk of disturbing the SSH session.
 *
 * Initially all non-whitespace text is replaced with scrambled letters, and
 * after a short period letters start to be revealed. Revealing is done one
 * letter at a time (i.e. if `a` is revealed, then all `a's on the screen are
 * shown) so that the output is stable across frames (and text scrolling)
 * without having to keep track of per-position state.
 */

export function runSneakersEffect(
  parentWindow: Window,
  containerNode: HTMLElement
) {
  const sneakersEffect = new SneakersEffect(parentWindow, containerNode)
  sneakersEffect.start()
}

// We don't want to run at 60Hz (or whatever the screen refresh rate is,
// which could be even higher), since the letter cycling animation feels
// too fast/not very 90s. Initially do 30Hz, and once we start revealing
// slow it down to 10Hz, which mirrors what the movie does.
const CYPHERED_FPS = 30
const REVEALED_FPS_START_TIME_MS = 1000
const REVEALED_FPS_END_TIME_MS = 2000
const REVEALED_FPS = 10

// No reveals for the first 2 seconds (to give the user a chance to appreciate
// the effect), and then reveal 20 letters every second. Even if the entire
// ASCII set is on screen, it should only take ~7 seconds for everything to be
// revealed.
const REVEALED_START_TIME = 2000
const REVEALED_LETTERS_PER_SECOND = 20

// The movie alternates white-to-blue and blue-to-white transitions when
// revealing. We choose blue-to-white because it looks better.
const CYPHERED_LETTER_COLOR = "#569efe"

const CYPHER =
  // eslint-disable-next-line curly-quotes/no-straight-quotes
  "○◘◙•♂♀☼▲►▼◄↨↕↔¶¡‼§▬↑↓←→!\"#$%&'()*+,-./0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇâäàåáèéêëíîïÄÅÉæÆòóôöùúûüÿÖÜ¢£¥₧ƒñÑªº¿⌐¬¡»«¼½─│┌┐└┘├┤┬┴┼═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬▀▄█▌▐■⌠⌡ΓΘΣΦΩαδεπστφ∙√∞∟∩≈≡≤≥"

function randomCypherLetter() {
  return CYPHER[Math.floor(Math.random() * CYPHER.length)]
}

class SneakersEffect {
  private stepRequest: number | undefined
  private overlayNode: HTMLElement

  constructor(
    private parentWindow: Window,
    private xtermContainerNode: HTMLElement
  ) {
    this.overlayNode = this.parentWindow.document.createElement("div")
    this.overlayNode.className = "pointer-events-none fixed z-100"
    this.overlayNode.setAttribute("aria-hidden", "true")
  }

  start() {
    this.parentWindow.document.body.append(this.overlayNode)

    const startTime = this.parentWindow.performance.now()
    this.requestStep(startTime, startTime, new Set())
  }

  stop() {
    if (this.stepRequest) {
      this.parentWindow.cancelAnimationFrame(this.stepRequest)
      this.stepRequest = undefined
    }
    if (this.overlayNode?.parentElement) {
      this.overlayNode.remove()
    }
  }

  private requestStep(
    startTime: DOMHighResTimeStamp,
    previousTime: DOMHighResTimeStamp,
    revealedLetters: Set<string>
  ) {
    this.stepRequest = this.parentWindow.requestAnimationFrame((time) => {
      this.stepRequest = undefined
      this.step(startTime, previousTime, time, revealedLetters)
    })
  }

  private step(
    startTime: DOMHighResTimeStamp,
    previousTime: DOMHighResTimeStamp,
    currentTime: DOMHighResTimeStamp,
    revealedLetters: Set<string>
  ) {
    if (this.parentWindow.closed) {
      this.stop()
      return
    }

    // Only update the screen at the target fps.
    const elapsedTime = currentTime - startTime
    let fps
    if (elapsedTime < REVEALED_FPS_START_TIME_MS) {
      fps = CYPHERED_FPS
    } else if (elapsedTime < REVEALED_FPS_END_TIME_MS) {
      fps =
        ((elapsedTime - REVEALED_FPS_START_TIME_MS) /
          (REVEALED_FPS_END_TIME_MS - REVEALED_FPS_START_TIME_MS)) *
          (REVEALED_FPS - CYPHERED_FPS) +
        CYPHERED_FPS
    } else {
      fps = REVEALED_FPS
    }
    if (currentTime - previousTime < 1000 / fps) {
      this.requestStep(startTime, previousTime, revealedLetters)
      return
    }

    const xtermBounds = this.xtermContainerNode.getBoundingClientRect()
    this.overlayNode.style.top = xtermBounds.top + "px"
    this.overlayNode.style.left = xtermBounds.left + "px"
    this.overlayNode.style.width = xtermBounds.width + "px"
    this.overlayNode.style.height = xtermBounds.height + "px"

    this.overlayNode.firstChild?.remove()

    const scrambledNode = this.xtermContainerNode.cloneNode(true) as HTMLElement
    // There may not be any text on the screen yet, don't start scrambling yet.
    let hadLetters = false
    let didCypherLetters = false
    const expectedReveals = Math.max(
      Math.ceil(
        ((elapsedTime - REVEALED_START_TIME) / 1000) *
          REVEALED_LETTERS_PER_SECOND
      ),
      0
    )
    let revealsRemaining = expectedReveals - revealedLetters.size

    const letterNodes = Array.from(
      scrambledNode.querySelectorAll<HTMLSpanElement>(".xterm-rows span")
    )
    // Shuffle the letters, so that we reveal them in random order, instead of
    // preferring ones near the start.
    for (let i = letterNodes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = letterNodes[i]
      letterNodes[i] = letterNodes[j]
      letterNodes[j] = temp
    }

    letterNodes.forEach((letterSpan) => {
      const letter = letterSpan.firstChild?.nodeValue
      if (!letter || letter === " ") {
        return
      }
      hadLetters = true
      if (revealedLetters.has(letter)) {
        return
      }
      if (revealsRemaining > 0) {
        revealedLetters.add(letter)
        revealsRemaining--
        return
      }
      letterSpan.firstChild.nodeValue = randomCypherLetter()
      letterSpan.style.background = "black"
      letterSpan.style.fontWeight = "bold"
      letterSpan.style.color = CYPHERED_LETTER_COLOR
      didCypherLetters = true
    })

    this.overlayNode.append(scrambledNode)

    if (!hadLetters || didCypherLetters) {
      this.requestStep(startTime, currentTime, revealedLetters)
    } else {
      this.stop()
    }
  }
}
