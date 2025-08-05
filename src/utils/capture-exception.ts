import type { AxiosError } from "axios"
import api from "src/api"
import { RateLimiter } from "./rate-limiter"

interface IEvent {
  name?: string
  message?: string
  stacktrace?: IStackTrace
  pageUrl: string
  extra?: Record<string, any>
}

interface IStackTrace {
  frames: IFrame[]
}

interface IFrame {
  function?: string
  filename?: string
  lineno?: number
  colno?: number
}

const exceptionRateLimit = new RateLimiter({
  capacity: 3,
  refillRate: 1,
})

/**
 * captureException posts an exception to the admin api.
 */
export default function captureException(exception: Error) {
  const event: IEvent = {
    name: exception.name,
    message: exception.message,
    stacktrace: computeStackTrace(exception.stack),
    pageUrl: window.location.href,
  }
  if (isAxiosError(exception) && exception.config) {
    event.extra = {
      method: exception.config.method,
      url: exception.config.url,
      params: filterParams(exception.config.params),
      data: filterData(exception.config.data),
    }
  }
  if (exceptionRateLimit.tryConsume()) {
    api.post("/event/exception", event).catch((err) => {
      // swallow any errors sending exceptions
    })
  } else {
    console.error("Exception report dropped due to rate limit:", event)
  }
}

function filterParams(params: any) {
  if (!params || typeof params !== "object") {
    return
  }
  return Object.fromEntries(
    Object.entries(params).filter(([k, v]) => INCLUDED_PARAMS.has(k))
  )
}

/**
 * Allowlist of Axios request parameter data that we will include in exception
 * reports, to avoid sending PII to Sentry.
 */
const INCLUDED_PARAMS = new Set(["state", "type"])

function filterData(data: any) {
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data)
      if (typeof parsed === "object") {
        return filterParams(parsed)
      }
    } catch {
      // Ignore, not all POST data is JSON
    }
  }
}

function isAxiosError(err: Error): err is AxiosError {
  return "isAxiosError" in err && (err as AxiosError).isAxiosError === true
}

/**
 * computeStackTrace parses a string stacktrace into an IStackTrace object.
 * This is adapted from https://github.com/getsentry/sentry-javascript/blob/master/packages/browser/src/tracekit.ts.
 */
function computeStackTrace(stack?: string): IStackTrace | undefined {
  if (stack === undefined) {
    return
  }

  const frames: IFrame[] = []
  const lines = stack.split("\n")
  let isEval
  let submatch
  let parts
  let element: IFrame

  lines.forEach((line, i) => {
    if ((parts = chrome.exec(line))) {
      isEval = parts[2] && parts[2].indexOf("eval") === 0 // start of line
      if (isEval && (submatch = chromeEval.exec(parts[2]))) {
        // Throw out eval line/column and use top-most line/column number.
        parts[2] = submatch[1] // url
        parts[3] = submatch[2] // line
        parts[4] = submatch[3] // column
      }
      element = {
        // Working with the regexp above is super painful. It is quite a hack,
        // but just stripping the `address at ` prefix here seems like the
        // quickest solution for now.
        filename:
          parts[2] && parts[2].indexOf("address at ") === 0
            ? parts[2].slice("address at ".length)
            : parts[2],
        function: parts[1] || unknownFunction,
        lineno: parts[3] ? +parts[3] : undefined,
        colno: parts[4] ? +parts[4] : undefined,
      }
    } else if ((parts = winjs.exec(line))) {
      element = {
        filename: parts[2],
        function: parts[1] || unknownFunction,
        lineno: +parts[3],
        colno: parts[4] ? +parts[4] : undefined,
      }
    } else if ((parts = gecko.exec(line))) {
      isEval = parts[3] && parts[3].includes(" > eval")
      if (isEval && (submatch = geckoEval.exec(parts[3]))) {
        // Throw out eval line/column and use top-most line number.
        parts[1] = parts[1] || `eval`
        parts[3] = submatch[1]
        parts[4] = submatch[2]
        parts[5] = "" // no column when eval
      }
      element = {
        filename: parts[3],
        function: parts[1] || unknownFunction,
        lineno: parts[4] ? +parts[4] : undefined,
        colno: parts[5] ? +parts[5] : undefined,
      }
    } else {
      return
    }

    if (!element.function && element.lineno) {
      element.function = unknownFunction
    }

    frames.push(element)
  })

  return frames.length > 0 ? { frames: frames } : undefined
}

const unknownFunction = "?"

const chrome =
  /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[a-z-]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i
const gecko =
  /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code]|[^@]*(?:bundle|\d+\.js)|\/[\w ./=-]+)(?::(\d+))?(?::(\d+))?\s*$/i
const winjs =
  /^\s*at (?:((?:\[object object])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i
const geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i
const chromeEval = /\((\S*):(\d+):(\d+)\)/
