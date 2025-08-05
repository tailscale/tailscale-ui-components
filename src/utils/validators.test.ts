import { isValidWebhookURL, NameserverValidator } from "src/utils/validators"
import { describe, expect, it } from "vitest"

describe("NameserverValidator", () => {
  it("accepts valid IPv4 addresses", () => {
    const validIPs = ["0.0.0.0", "8.8.8.8", "255.255.255.255", "1.12.23.4"]
    validIPs.forEach((ip) => {
      expect(NameserverValidator.isValid(ip), ip).toBeTruthy()
    })
  })
  it("rejects invalid IPv4 addresses", () => {
    const invalidIPs = [
      // Empty string
      "",
      // Garbage non-IP
      "bad",
      // Single number. Some parsers accept this as an IPv4 address in
      // big-endian uint32 form, but we don't.
      "1234",
      // IPv4 with a zone specifier
      "1.2.3.4%eth0",
      // IPv4 field must have at least one digit
      ".1.2.3",
      "1.2.3.",
      "1..2.3",
      "1.2.3..",
      // IPv4 address too long
      "1.2.3.4.5",
      // IPv4 in dotted octal form
      "0300.0250.0214.0377",
      // IPv4 in dotted hex form
      "0xc0.0xa8.0x8c.0xff",
      // IPv4 in class B form
      "192.168.12345",
      // IPv4 in class B form, with a small enough number to be
      // parseable as a regular dotted decimal field.
      "127.0.1",
      // IPv4 in class A form
      "192.1234567",
      // IPv4 in class A form, with a small enough number to be
      // parseable as a regular dotted decimal field.
      "127.1",
      // IPv4 field has value >255
      "192.168.300.1",
      // IPv4 with too many fields
      "192.168.0.1.5.6",
      // IPv4 with too many zeros
      "127.0.0.00",
    ]
    invalidIPs.forEach((ip) => {
      expect(NameserverValidator.isValid(ip), ip).toBeFalsy()
    })
  })
  it("accepts valid IPv6 addresses", () => {
    const validIPs = [
      // Fully expanded address
      "fd7a:115c:a1e0:ab12:4843:cd96:626b:430b",
      // Single elided field at end
      "fd7a:115c:a1e0:ab12:4843:cd96:626b::",
      // Elided fields at end
      "fd7a:115c:a1e0:ab12:4843:cd96::",
      // Elided field in middle
      "fd7a:115c:a1e0::4843:cd96:626b:430b",
      // Basic zero IPv6 address
      "::",
      // Localhost
      "::1",
      // IPv6 with the trailing 32 bits written as IPv4 dotted decimal. (4in6)
      "::ffff:192.0.2.128",
      // IPv6 with capital letters
      "FD9E:1A04:F01D::1",
    ]
    validIPs.forEach((ip) => {
      expect(NameserverValidator.isValid(ip), ip).toBeTruthy()
    })
  })
  it("rejects invalid IPv6 addresses", () => {
    const invalidIPs = [
      // IPv6 with not enough fields
      "1:2:3:4:5:6:7",
      // IPv6 with too many fields
      "1:2:3:4:5:6:7:8:9",
      // IPv6 with 8 fields and a :: expander
      "1:2:3:4::5:6:7:8",
      // IPv6 with a field bigger than 2b
      "fe801::1",
      // IPv6 with non-hex values in field
      "fe80:tail:scal:e::",
      // IPv6 with a zone delimiter but no zone.
      "fe80::1%",
      // IPv6 (without ellipsis) with too many fields for trailing embedded IPv4.
      "ffff:ffff:ffff:ffff:ffff:ffff:ffff:192.168.140.255",
      // IPv6 (with ellipsis) with too many fields for trailing embedded IPv4.
      "ffff::ffff:ffff:ffff:ffff:ffff:ffff:192.168.140.255",
      // IPv6 with invalid embedded IPv4.
      "::ffff:192.168.140.bad",
      // IPv6 with multiple ellipsis ::.
      "fe80::1::1",
      // IPv6 with invalid non hex/colon character.
      "fe80:1?:1",
      // IPv6 with truncated bytes after single colon.
      "fe80:",
      // With zone identifier (not valid for nameservers)
      "::1%eth0",
      // With improper brackets
      "::1]/foo.com",
    ]
    invalidIPs.forEach((ip) => {
      expect(NameserverValidator.isValid(ip), ip).toBeFalsy()
    })
  })
})

describe("isValidWebhookURL", () => {
  it("accepts valid URLs", () => {
    const validURLs = [
      "https://example.com",
      "https://example.com/path",
      "https://example.com/path?query",
      "https://example.com:443",
      "https://example.com:80",
    ]
    validURLs.forEach((url) => {
      expect(isValidWebhookURL(url), url).toBeTruthy()
    })
  })
  it("rejects valid URLs", () => {
    const invalidURLs = [
      "notaurl",
      "http://example.com", // Invalid scheme
      "file:///etc/passwd", // Invalid scheme
      "https://", // No domain
      "https://example.com:27", // Invalid port
    ]
    invalidURLs.forEach((url) => {
      expect(isValidWebhookURL(url), url).toBeFalsy()
    })
  })
})
