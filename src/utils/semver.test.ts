import { describe, expect, it } from "vitest"
import {
  SemVer,
  Track,
  cmpver,
  equivalentSemVer,
  parseSemVer,
  releaseTrack,
} from "./semver"

describe("parseSemVer", () => {
  it("accurately parses raw versions", () => {
    const versions: { raw: string; parsed: SemVer | undefined }[] = [
      { raw: "", parsed: undefined }, // invalid raw form
      { raw: "s", parsed: undefined }, // invalid raw form
      { raw: "1.s", parsed: undefined }, // invalid raw form
      { raw: "1", parsed: { major: 1, minor: undefined, patch: undefined } },
      { raw: "1.1", parsed: { major: 1, minor: 1, patch: undefined } },
      { raw: "1.1.11", parsed: { major: 1, minor: 1, patch: 11 } },
    ]
    versions.forEach((v) => {
      expect(parseSemVer(v.raw), v.raw).toEqual(v.parsed)
    })
  })
  it("accurately compares equality", () => {
    const tests: { a: string; b: string; equivalent: boolean }[] = [
      { a: "1", b: "1.1", equivalent: true },
      { a: "1.2", b: "1.1", equivalent: false },
      { a: "1.2.2", b: "1.2", equivalent: true },
    ]
    tests.forEach((t) => {
      const a = parseSemVer(t.a) || { major: 0 }
      const b = parseSemVer(t.b) || { major: 0 }
      expect(equivalentSemVer(a, b), `${t.a} ${t.b}`).toBe(t.equivalent)
    })
  })
})

describe("cmpver", () => {
  it("compares version strings", () => {
    const tests: { v1: string; v2: string; cmp: -1 | 0 | 1 }[] = [
      { v1: "", v2: "", cmp: 0 },

      { v1: "1", v2: "", cmp: 1 },
      { v1: "10", v2: "9", cmp: 1 },
      { v1: "10", v2: "11", cmp: -1 },
      { v1: "-1", v2: "1", cmp: 1 }, // Negative numbers aren't supported.
      { v1: "1", v2: "1", cmp: 0 },
      { v1: "01", v2: "1", cmp: 0 },
      { v1: "01", v2: "001", cmp: 0 },

      { v1: "a", v2: "", cmp: 1 },
      { v1: "a", v2: "a", cmp: 0 },
      { v1: "a", v2: "0a", cmp: 1 }, // Zeroes not ignored when comparing alpha.

      { v1: "a1", v2: "a", cmp: 1 },
      { v1: "a1", v2: "a", cmp: 1 },
      { v1: "a1", v2: "a1", cmp: 0 },

      { v1: "1.2.3", v2: "1.2.3", cmp: 0 },
      { v1: "1.2.3", v2: "1.02.03", cmp: 0 },
      { v1: "1.2.3", v2: "1.02.030", cmp: -1 },
      { v1: "1.2.3", v2: "1.02.9", cmp: -1 },
      { v1: "1.2.3", v2: "1.2.3-alpha1", cmp: -1 },

      { v1: "12.3-STABLE", v2: "12.3-STABLE", cmp: 0 },
      { v1: "12.3-STABLE", v2: "12.3-stable", cmp: -1 },
      { v1: "12.3-STABLE", v2: "12.4-STABLE", cmp: -1 },
      { v1: "12.3-STABLE", v2: "12.3-UNSTABLE", cmp: -1 },

      { v1: "10.0.19044.1889", v2: "10.0.19044.1890", cmp: -1 },
      { v1: "5.10.0-17-amd64", v2: "5.10.0-17-amd65", cmp: -1 },

      // cmpver expects v1 and v2 to each be scalars, and does not support
      // longer strings containing version numbers throughout. This is
      // essentially "Debian > 10.3".
      { v1: "Debian 10.4; kernel=xxx; container; env=kn", v2: "10.3", cmp: 1 },
    ]
    tests.forEach((test) => {
      expect(
        cmpver(test.v1, test.v2),
        `cmpver(${JSON.stringify(test.v1)}, ${JSON.stringify(test.v2)})`
      ).toEqual(test.cmp)

      if (test.cmp !== 0) {
        expect(
          cmpver(test.v2, test.v1),
          `cmpver(${JSON.stringify(test.v2)}, ${JSON.stringify(test.v1)})`
        ).toEqual(-test.cmp)
      }
    })
  })
})

describe("releaseTrack", () => {
  it("reports correct track", () => {
    const versions: { raw: string; track: Track }[] = [
      { raw: "1.0.0", track: "stable" },
      { raw: "1.1.0", track: "unstable" },
    ]
    versions.forEach((v) => {
      expect(releaseTrack(parseSemVer(v.raw)!), v.raw).toEqual(v.track)
    })
  })
})
