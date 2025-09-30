/**
 * This file contains lightweight utilities for working with Semantic Version
 * (SemVer) strings. We use a SemVer-like versioning scheme at Tailscale for our
 * client versions, and this file lets us work with those strings.
 */

export type SemVer = {
  major: number
  minor?: number
  patch?: number
}

/**
 * parseSemVer returns a SemVer object from a string. If parsing fails for any
 * reason, it returns undefined.
 */
export function parseSemVer(version: string): SemVer | undefined {
  const [majorStr, minorStr, patchStr] = version.split(".")
  if (!majorStr) {
    return
  }

  const major = Number.parseInt(majorStr, 10)
  if (Number.isNaN(major)) {
    return
  }
  let minor, patch
  if (minorStr !== undefined) {
    minor = Number.parseInt(minorStr, 10)
    if (Number.isNaN(minor)) {
      return
    }
  }
  if (patchStr !== undefined) {
    patch = Number.parseInt(patchStr, 10)
    if (Number.isNaN(patch)) {
      return
    }
  }

  return { major, minor, patch }
}

/**
 * compareSemVer compares two semver strings and returns -1 if a < b, 0 if a == b, 1 if a > b
 *
 * Undefined minor and patch versions are interpreted as 0 (i.e. 1.2 is compared as 1.2.0).
 */
export function compareSemVer(a: SemVer, b: SemVer): number {
  if (a.major < b.major) {
    return -1
  }
  if (a.major > b.major) {
    return 1
  }
  if ((a.minor || 0) < (b.minor || 0)) {
    return -1
  }
  if ((a.minor || 0) > (b.minor || 0)) {
    return 1
  }
  if ((a.patch || 0) < (b.patch || 0)) {
    return -1
  }
  if ((a.patch || 0) > (b.patch || 0)) {
    return 1
  }
  return 0
}

/**
 * equivalentSemVer reports wheter a and b can be used to describe
 * the same version.
 *
 * Examples:
 *  - 1.2.0, 1.2.0 = true
 *  - 1.2, 1.2.2 = true
 *  - 2.2.2, 1.1.1 = false
 */
export function equivalentSemVer(a: SemVer, b: SemVer): boolean {
  if (a.major !== b.major) {
    return false
  }
  // Only compare minor if both defined.
  if (a.minor !== undefined && b.minor !== undefined && a.minor !== b.minor) {
    return false
  }
  // Only compare patch if both defined.
  if (a.patch !== undefined && b.patch !== undefined && a.patch !== b.patch) {
    return false
  }
  return true
}

/**
 * isPatch checks if a latest available version for a
 * machine is a patch. If the version has the same
 * major and minor SemVar as the machines current
 * TS version, then it is a patch.
 * This function should only be used to compare two
 * different SemVers.
 */
export function isPatchUpdate(
  current: SemVer | undefined,
  next: SemVer | undefined
): boolean {
  if (current === undefined || next === undefined) {
    return false
  }

  if (
    next.major === current.major &&
    next.minor === current.minor &&
    next.patch !== 0
  ) {
    return true
  }

  return false
}

/**
 * cmpver returns -1 to indicate v1 < v2, 0 to indicate v1 == v2, or 1 to
 * indicate v1 > v2. The version strings v1 and v2 are expected to be be
 * semver-ish, but we fall back to sensible-looking comparison: numeric strings
 * are compared as base-10 numbers, while alphabetic strings are compared
 * lexicographically.
 *
 * Prefer parseSemVer, compareSemVer, equivalentSemVer, isPatchUpdate functions
 * for exact comparisons of known-semver values. Use cmpver if the format of the
 * comparison value is user-provided.
 *
 * @see https://pkg.go.dev/tailscale.com/util/cmpver#Compare.
 */
export function cmpver(v1: string, v2: string): -1 | 0 | 1 {
  // Empty strings.
  const m = v1.length,
    n = v2.length
  if (m === 0) {
    if (n === 0) {
      return 0
    }
    return -1
  }
  if (n === 0) {
    return +1
  }

  let i = 0,
    j = 0
  while (true) {
    // Consume runs of non-numeric characters.
    while (true) {
      const a = v1[i],
        b = v2[j]
      if (isnum(a)) {
        if (isnum(b)) {
          // We're switching to numbers.
          break
        }
        // v1 has shorter alpha string ending at i, so it's less.
        return -1
      }
      if (isnum(b)) {
        // v1 is the longer alpha string ending at i, so it's greater.
        return +1
      }

      // Compare the nexts char in our text string.
      if (a < b) {
        return -1
      }
      if (a > b) {
        return +1
      }

      // Check the next character in our text string.
      i++
      j++
      if (i === m || j === n) {
        return i < m ? +1 : j < n ? -1 : 0
      }
    }

    // Discard runs of zero. i and j can diverge here without meaning there's
    // any difference between v1 and v2.
    while (i < m && v1[i] === "0") i++
    while (j < n && v2[j] === "0") j++
    if (i === m || j === n) {
      return i < m ? +1 : j < n ? -1 : 0
    }

    // Compare runs of numerals.
    while (true) {
      const a = v1[i],
        b = v2[j]
      if (!isnum(a)) {
        if (!isnum(b)) {
          // The numerals were equal. We're switching to alpha.
          break
        }
        return -1
      }
      if (!isnum(b)) {
        return +1
      }

      if (a === b) {
        // Check the next numeral.
        i++
        j++
        if (i === m || j === n) {
          return i < m ? +1 : j < n ? -1 : 0
        }
        continue
      }

      // Since we've found numeral a != numeral b, then the shortest
      // remaining run of numerals points to the lower version. If they're
      // equal length then smallest is determined directly from a and b.
      while (true) {
        // Check if v1[i+1] continues to be a number.
        let cm = false
        if (i + 1 < m && isnum(v1[i + 1])) {
          cm = true
          i++
        }

        // Check if v2[j+1] continues to be a number.
        let cn = false
        if (j + 1 < n && isnum(v2[j + 1])) {
          cn = true
          j++
        }

        if (!cm) {
          if (!cn) {
            // Both numbers are the same length, compare a and b.
            if (a < b) {
              return -1
            }
            return +1
          }
          // v1 has the shorter run of numerals, so v1 is less.
          return -1
        }
        if (!cn) {
          // v2 has the shorter run of numerals, so v1 is greater.
          return +1
        }
      }
    }
  }
}

export type Track = "stable" | "unstable"

/**
 * releaseTrack returns a Track for a SemVer.
 */
export function releaseTrack(version: SemVer): Track {
  return (version.minor || 0) % 2 === 0 ? "stable" : "unstable"
}

function isnum(char: string | undefined): boolean {
  return char !== undefined && char.length === 1 && "0" <= char && char <= "9"
}
