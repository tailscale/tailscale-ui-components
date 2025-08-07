/**
 * Common validation utilities.
 */

export const MagicDNSNameserver = "100.100.100.100"
export const MagicDNSSearchPath = ".beta.tailscale.net"

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export interface IValidator {
  isValid: (input: string) => boolean
  errorMessage: string
}

// Only IPv6 addresses can be in square brackets,
// so append square brackets and use the built-in URL()
// to test for IPv6 addresses.
export function isValidIPv6(ip: string) {
  // Don't allow specifying zone for nameservers
  if (ip.includes("%") || ip.includes("]")) {
    return false
  }
  try {
    new URL(`http://[${ip}]`)
    return true
  } catch {
    return false
  }
}

// (25[0-5]|(2[0-4]|1\d|[1-9])\d|\d) is a regex matching an octet of an IPv4
// 25[0-5] matches 250-255
// Match group:
// (2[0-4]|1\d|[1-9])\d
//     2[0-4] matches 20-24
//     1\d matches 10-19
//     [1-9] matches 1-9
//     \d appends another 0-9 to that match group
//     so this matches 10-99, 100-199, and 200-249
// \d matches 0-9
const isIPv4: RegExp =
  /^((25[0-5]|(2[0-4]|1\d|[1-9])\d|\d)\.){3}(25[0-5]|(2[0-4]|1\d|[1-9])\d|\d)$/

export function isValidIP(ip: string) {
  return isValidIPv4(ip) || isValidIPv6(ip)
}

export function isValidIPv4(ip: string) {
  return isIPv4.test(ip)
}

function isValidNameserver(nameserver: string): boolean {
  return isValidIP(nameserver) && nameserver !== MagicDNSNameserver
}
export const NameserverValidator: IValidator = {
  isValid: isValidNameserver,
  errorMessage: "Invalid resolver. Only IPv4 and IPv6 values are allowed.",
}

export const SearchDomainValidator: IValidator = {
  isValid: (searchDomain: string): boolean => {
    return (
      SearchDomainRegExp.test(searchDomain) &&
      searchDomain !== MagicDNSSearchPath
    )
  },
  errorMessage: "Invalid search domain. Only valid URL characters are allowed.",
}

export function isValidDeviceName(name: string): {
  isValid: boolean
  error?: string
} {
  let isValid = true
  let errors: string[] = []

  if (name.length === 0) {
    isValid = false
    errors = [...errors, "Name must be non-empty"]
  }
  if (name.length > 63) {
    // Max length pulled from corp/control/dnsutil/name.go
    isValid = false
    errors = [...errors, `Name must be less than 64 characters`]
  }

  if (name.startsWith("-") || name.endsWith("-")) {
    isValid = false
    errors = [...errors, "Name cannot start or end with a hyphen"]
  }
  if (!DNSRegExp.test(name)) {
    isValid = false
    errors = [...errors, "Must only contain alphanumeric or hyphen characters"]
  }

  return { isValid, error: errors.join(". ") }
}

const DNSRegExp: RegExp = /^[\dA-Za-z-]+$/
// eslint-disable-next-line curly-quotes/no-straight-quotes
const SearchDomainRegExp: RegExp = /^[\w'./:~-]+$/

export function isValidWebhookURL(urlStr: string) {
  try {
    const url = new URL(urlStr)
    if (url.protocol !== "https:") {
      return false
    }
    if (url.host === "") {
      return false
    }
    if (!["", "80", "443"].includes(url.port)) {
      return false
    }
    return true
  } catch {
    return false
  }
}

// Determines whether the passed in string is a valid number.
// Number.isNaN is required versus global isNaN due to linter, but Number.isNaN does not convert, unlike isNaN
export function isStringNumeric(str: string) {
  return str !== "" && !Number.isNaN(Number(str))
}

// splitIPs splits a comma or whitespace separated list of IPs into an array of strings trimming
// any whitespace as needed.
export function splitIPs(ipString: string): string[] {
  return ipString
    .split(/[\s,]+/)
    .map((r) => r.trim())
    .filter((r) => r.length > 0)
}

// isValidDestination returns true if a comma or whitespace separated list of IPs is purely
// valid IPs, false if any of the comma separate strings are not parsable as IPv4 or IPv6 addresses.
export function isValidDestination(dest: string): boolean {
  if (dest === "") {
    return false
  }

  let ips = splitIPs(dest)
  return ips.every((ip) => {
    return isValidIP(ip)
  })
}
