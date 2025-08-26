import { describe, expect, it } from "vitest"
import { isValidHex } from "./util"

describe("isValidHex", () => {
  it("accepts valid hex strings", () => {
    const strings = ["123456", "abcdef", "123afd", "ABCD12", "abcdef012345c1c8"]
    strings.forEach((string) => {
      expect(isValidHex(string), string).toBeTruthy()
    })
  })

  it("rejects invalid hex strings", () => {
    const strings = ["abc_", "xxxxxx", ""]
    strings.forEach((string) => {
      expect(isValidHex(string), string).toBeFalsy()
    })
  })
})
