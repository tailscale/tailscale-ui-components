import { differenceInHours, formatDistance } from "date-fns"
import { format } from "date-fns-tz"
import React, { Fragment, ReactNode } from "react"
import { NullValue } from "../components/null/null"
import { Tooltip } from "../components/tooltip/tooltip"
import { serverNow } from "./time"

// IMachine correspond with Go type tailscale.io/control/adminhttp:machineData
export interface IMachine {
  user: string // owner; empty for tagged-nodes
  creator: string
  name: string
  fqdn: string
  hostname: string
  domain: string
  ipnVersion: string
  os: string
  osVersion?: string
  app?: string
  parsedLinuxDistro?: string
  parsedOSVersion?: string
  created: string
  lastSeen?: string // optional, because old nodes in control have empty timestamps
  addresses: string[]
  allowedIPs: string[]
  extraIPs: string[]
  advertisedIPs: string[]
  advertisedExitNode?: boolean
  allowedExitNode?: boolean
  hasSubnets?: boolean
  hasTags?: boolean
  hasExitNode?: boolean
  endpoints?: string[] // optional, migrated to the debug endpoint
  allowedTags: string[]
  invalidTags: string[]
  machineKey: string
  nodeKey: string
  id: string
  stableId: string
  authorized?: boolean
  authURL: string
  expires: string
  neverExpires?: boolean
  isExternal?: boolean
  availableUpdateVersion?: string
  availableUpdateSecurity?: boolean
  availableUpdateVOOD?: boolean
  shareID?: string
  acceptedShareCount: number // -1 indicates you don't have permission to read this, don't show in UI.
  automaticNameMode: boolean
  blocksIncomingConnections?: boolean
  multipleConnections?: boolean
  brokenIPForwarding?: boolean
  connectedToControl?: boolean
  isEphemeral?: boolean
  sshEnabled?: boolean
  funnelEnabled?: boolean
  adminPanelSSH?: boolean
  sshUsernames?: string[]
  otherSSHUsernamesAllowed?: boolean
  upgradeWindowsWarningNov2022?: boolean
  ownerDisabledStatus?: string
  tlLockedOut?: boolean
  tlTrusted?: boolean
  postureIdentity?: PostureIdentity
  appConnector?: boolean
  autoUpdatesEnabled?: boolean
  canNat?: boolean
}

type PostureIdentity = {
  /** needsUpgrade being true means the current client version of tailscaled does not support posture identity collection */
  needsUpgrade?: boolean
  /** notCollected being true means that this node's posture identity will be collected when the machine re-connects */
  notCollected?: boolean
  /** nodeDisabled means that the node has not enabled sharing posture identity data with control */
  nodeDisabled?: boolean
  updated?: string
  serialNumbers?: string[]
  hardwareAddresses?: string[]
}

export const dateFilterFormat = "y/MM/dd"
/**
 * Common formatting utilities. Included in this file to avoid importing lots of
 * small utility libraries to do the same thing.
 */

export function capitalize(str: string) {
  if (!str) {
    return str // don't do anything to empty strings
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function pascalCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/[^\s\w]/g, "")
    .replace(/\s+(.)(\w*)/g, ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
    .replace(/\w/, (s) => s.toUpperCase())
}

const substitutions: { [key: string]: string } = {
  ios: "iOS",
  macos: "macOS",
  js: "JS",
  openbsd: "OpenBSD",
  freebsd: "FreeBSD",
  tvos: "tvOS",
}
export function titleCase(str: string) {
  const sub = substitutions[str.toLowerCase()]
  if (sub) {
    return sub
  }
  return str.replace(/\b\w/g, (v) => v.toUpperCase())
}

export function snakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`)
}

export function kebabCase(str: string) {
  return (
    str
      // Convert camelCase capitals to kebab-case.
      .replace(
        /([a-z][A-Z])/g,
        (match) => match.slice(0, 1) + "-" + match.slice(1, 2).toLowerCase()
      )
      // Convert non-camelCase capitals to lowercase.
      .toLowerCase()
      // Convert non-alphanumeric characters to hyphens
      .replace(/[^\da-z-]+/g, "-")
      // Remove hyphens from both ends
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  )
}

/**
 * Formats a hostname for end user display, trimming common suffixes like
 * .local and .localdomain.
 */
export function formatHostname(str: string) {
  return str.replace(/\.local$/, "").replace(/\.localdomain$/, "")
}

/**
 * Formats a Tailscale IPNVersion number into a more human-readable equivalent.
 * Currently trims a trailing revision number to reduce visual noise.
 */
export function formatIPNVersion(str: string) {
  return str.replace(/-t[\da-f].*/, "").replace(/-g\w+/, "")
}

/**
 * Formats an OS version number as the human-friendly variant, when available.
 */
export function formatOSVersion(m: IMachine) {
  if (!m.parsedOSVersion) {
    return m.osVersion
  }
  return (
    <Tooltip content={m.osVersion} side="top" align="start">
      {m.parsedOSVersion}
    </Tooltip>
  )
}

/**
 * formatIPWordBreaks formats an IP address with word break points, which allow
 * very long IPv6 addresses to wrap in logical chunks.
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr
 */
export function formatIPWordBreaks(str: string): ReactNode {
  const parts = str.split(":")
  return parts.map((part, i) => {
    if (i === 0) {
      return <span key={i}>{part}</span>
    }
    return (
      <Fragment key={i}>
        <wbr />:<span>{part}</span>
      </Fragment>
    )
  })
}

export function formatBoolean(bool?: boolean) {
  if (typeof bool === "undefined") {
    return <NullValue />
  }
  return bool ? "Yes" : "No"
}

/**
 * Extending the Navigator interface to include the non-standard
 * properties userLanguage, browserLanguage and systemLanguage
 * which are used by IE11 to provide the locale of the user.
 * https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage
 */
declare global {
  interface Navigator {
    userLanguage?: string
    browserLanguage?: string
    systemLanguage?: string
  }
}

/**
 *  getLocale retrieves the users locale. If no locale is found,
 * time and dates will be formatted with "en-US" as the locale.
 */
export const getLocale = (): string =>
  navigator.userLanguage ||
  (navigator.languages &&
    navigator.languages.length > 0 &&
    navigator.languages[0]) ||
  navigator.language ||
  navigator.browserLanguage ||
  navigator.systemLanguage ||
  "en-US"

/**
 *  shortTime returns the time in hours and minutes, either in 'am/pm' format or
 *  24 hour format depending on user locale. Also includes the timezone.
 */
export function shortTime(date: Date): string {
  return format(date, "p z")
}

/**
 * shortAbsTime returns the time in hours, minutes, seconds.
 */
export function shortAbsTime(date: Date): string {
  return format(date, "hh:mmaaa")
}

/**
 * fullDate returns the date with a day, month and year, formatted depending on
 * the users locale.
 */
export function fullDate(date: Date): string {
  return format(date, "MMM d, y")
}

/**
 * shortDate returns the date with a day and month, formatted depending on
 * the users locale.
 */
export function shortDate(date: Date): string {
  return format(date, "MMM d")
}

/**
 * numericDate returns the date in the form of YYYY/MM/DD
 */
export function numericDate(date: Date): string {
  return format(date, dateFilterFormat)
}

/**
 * daysUntil returns the number of days until the given date. If date has passed, returns 0.
 * The number of days returned is rounded up. 6.5 days until a date will return 7.
 */
export function daysUntil(date: Date): number {
  const now = serverNow()
  const days = differenceInHours(date, now) / 24
  return Math.max(0, Math.ceil(days))
}

/**
 * Formats `date` relative to `now` in natural language. Within the last 48
 * hours it returns "4 hours ago" formatted string. Older than the last 48 hours
 * returns an absolute date.
 */
export function formatRelativeDate(date: Date, now: Date = serverNow()) {
  if (differenceInHours(now, date) > 48) {
    return fullDate(date)
  }
  const result =
    formatDistance(date, now) + (date <= now ? " ago" : " from now")

  return result.replace("about ", "")
}

export function formatBytes(bytes: number) {
  let suffix = " B"
  let byteString = String(bytes)
  if (1000 <= bytes && bytes < 1000000) {
    suffix = " KB"
    byteString = (bytes / 1000).toFixed(2)
    byteString = (bytes / 1000).toFixed(0)
  } else if (1000000 <= bytes && bytes < 1000000000) {
    suffix = " MB"
    byteString = (bytes / 1000000).toFixed(2)
    byteString = (bytes / 1000000).toFixed(0)
  } else if (1000000000 <= bytes && bytes < 1000000000000) {
    suffix = " GB"
    byteString = (bytes / 1000000000).toFixed(2)
  } else if (1000000000000 <= bytes && bytes < 1000000000000000) {
    suffix = " TB"
    byteString = (bytes / 1000000000000).toFixed(2)
  }
  return byteString + suffix
}

const currencyWithDecimals = (currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "symbol",
  })

const currencyWithoutDecimals = (currency: string) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "symbol",
    // Apparently the spec requires both `minimumFractionDigits` and
    // `maximumFractionDigits` when the latter is <2.
    // See: https://stackoverflow.com/a/41045289/1266426
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

/**
 * formatCurrency formats price values in cents as a string.
 */
export function formatCurrency(
  amount: number,
  showDecimals: boolean = true,
  currency: string = "usd"
): string {
  const dollars = amount / 100 // converting from cents to dollars
  const result = showDecimals
    ? currencyWithDecimals(currency).format(dollars)
    : currencyWithoutDecimals(currency).format(dollars)

  // We manually remove the US for now, since if we want to display which
  // currency, we should do that once on a page, not everywhere. And
  // Intl.NumberFormat supports the `currencyDisplay: "narrowSymbol"` option
  // to remove this for us, but it throws errors on Safari <14.1.
  return result.replace("US$", "$")
}

/**
 * pluralize returns the plural form of an English word. It's a simple function
 * that doesn't cover all possible cases… but then again, when are we
 * pluralizing "hovercraft." This should work fine for most of our needs.
 */
export function pluralize(word: string, amount?: number) {
  if (amount !== undefined && amount === 1) {
    return word
  }
  const plural: { [key: string]: string } = {
    "(quiz)$": "$1zes",
    "^(ox)$": "$1en",
    "([m|l])ouse$": "$1ice",
    "(matr|vert|ind)ix|ex$": "$1ices",
    "(x|ch|ss|sh)$": "$1es",
    "([^aeiouy]|qu)y$": "$1ies",
    "(hive)$": "$1s",
    "(?:([^f])fe|([lr])f)$": "$1$2ves",
    "(shea|lea|loa|thie)f$": "$1ves",
    sis$: "ses",
    "([ti])um$": "$1a",
    "(tomat|potat|ech|her|vet)o$": "$1oes",
    "(bu)s$": "$1ses",
    "(alias)$": "$1es",
    "(octop)us$": "$1i",
    "(ax|test)is$": "$1es",
    "(us)$": "$1es",
    "([^s]+)$": "$1s",
  }
  const irregular: { [key: string]: string } = {
    move: "moves",
    foot: "feet",
    goose: "geese",
    sex: "sexes",
    child: "children",
    man: "men",
    tooth: "teeth",
    person: "people",
  }
  const uncountable: string[] = [
    "sheep",
    "fish",
    "deer",
    "moose",
    "series",
    "species",
    "money",
    "rice",
    "information",
    "equipment",
    "bison",
    "cod",
    "offspring",
    "pike",
    "salmon",
    "shrimp",
    "swine",
    "trout",
    "aircraft",
    "hovercraft",
    "spacecraft",
    "sugar",
    "tuna",
    "you",
    "wood",
  ]
  // save some time in the case that singular and plural are the same
  if (uncountable.includes(word.toLowerCase())) {
    return word
  }
  // check for irregular forms
  for (const w in irregular) {
    const pattern = new RegExp(`${w}$`, "i")
    const replace = irregular[w]
    if (pattern.test(word)) {
      return word.replace(pattern, replace)
    }
  }
  // check for matches using regular expressions
  for (const reg in plural) {
    const pattern = new RegExp(reg, "i")
    if (pattern.test(word)) {
      return word.replace(pattern, plural[reg])
    }
  }
  return word
}

// isAlphanumeric reports whether that the string only contains
// alphaumeric characters, and optionally, whitespace.
export const isAlphanumeric = (val: string, allowSpace: boolean) => {
  const regex = allowSpace ? /^[\s\w-]+$/ : /^\w+$/
  return regex.test(val)
}

/**
 * DocsLink is a standard "Learn More" link to our documentation.
 * @example
 *  <DocsLink
 *    kbTopic="subnet routers"
 *    url="https://tailscale.com/kb/1019/subnets"
 *  />
 */
export function DocsLink({
  url,
  kbTopic,
  onClick,
}: {
  url: string
  kbTopic: string
  onClick?: () => void
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link whitespace-nowrap"
      aria-label={`Read documentation about ${kbTopic}`}
      onClick={onClick}
    >
      Learn more &#8599;
    </a>
  )
}

/**
 * splitStringWithCommas is used to process the user inputted list of domains.
 * It removes spaces in case the user did not use a consistent delimiter.
 */

export function splitStringWithCommas(str: string) {
  // remove spaces and leading '.'
  // eslint-disable-next-line curly-quotes/no-straight-quotes
  const sanitizedStr = str.replace(/^[\s*.]+|\s+/g, "")
  if (!sanitizedStr) {
    return []
  }
  const domainsList = sanitizedStr.split(",")

  return domainsList
}
