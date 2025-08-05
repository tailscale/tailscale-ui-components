import { isAlphanumeric, kebabCase, titleCase } from "src/utils/format"
import { describe, expect, it } from "vitest"

describe("kebabCase", () => {
  it("converts strings to kebab-case", () => {
    expect(kebabCase("hello world")).toBe("hello-world")
    expect(kebabCase("HelloWorld")).toBe("hello-world")
    expect(kebabCase("hello_world")).toBe("hello-world")
    expect(kebabCase("helloWorld")).toBe("hello-world")
    expect(kebabCase("hello-world")).toBe("hello-world")
  })
})

describe("titleCase", () => {
  it("converts strings to title case", () => {
    expect(titleCase("hello world")).toBe("Hello World")
    expect(titleCase("windows")).toBe("Windows")
  })

  it("handles special-cased words", () => {
    expect(titleCase("macos")).toBe("macOS")
    expect(titleCase("ios")).toBe("iOS")
    expect(titleCase("TVOS")).toBe("tvOS")
  })
})

describe("isAlphanumeric", () => {
  it("rejects non-word characters", () => {
    expect(isAlphanumeric("hello&world", true)).toBe(false)
    expect(isAlphanumeric("hello?world", true)).toBe(false)
    expect(isAlphanumeric("hello`world", true)).toBe(false)
  })
  it("rejects non-word characters and spaces", () => {
    expect(isAlphanumeric("hello world", false)).toBe(false)
    expect(isAlphanumeric("hello\tworld", false)).toBe(false)
  })
  it("accepts word characters and spaces, if specified", () => {
    expect(isAlphanumeric("hello world", true)).toBe(true)
    expect(isAlphanumeric("hello_world", true)).toBe(true)
    expect(isAlphanumeric("hello-world", true)).toBe(true)
    expect(isAlphanumeric("hello\tworld", true)).toBe(true)
  })
})
