import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { RateLimiter } from "./rate-limiter"

describe("RateLimiter", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it("should initialize with full capacity", () => {
    const limiter = new RateLimiter({
      capacity: 10,
      refillRate: 1,
    })

    expect(limiter.getAvailableTokens()).toBe(10)
  })

  it("consumes tokens correctly", () => {
    const limiter = new RateLimiter({
      capacity: 5,
      refillRate: 1,
    })

    expect(limiter.tryConsume(2)).toBe(true)
    expect(limiter.getAvailableTokens()).toBe(3)
  })

  it("should deny requests when insufficient tokens", () => {
    const limiter = new RateLimiter({
      capacity: 5,
      refillRate: 1,
    })

    expect(limiter.tryConsume(6)).toBe(false)
    expect(limiter.getAvailableTokens()).toBe(5)
  })

  it("should refill tokens at the correct rate", () => {
    const limiter = new RateLimiter({
      capacity: 10,
      refillRate: 2, // 2 tokens per second
    })

    // Consume all tokens
    expect(limiter.tryConsume(10)).toBe(true)
    expect(limiter.getAvailableTokens()).toBe(0)

    // Advance time by 2 seconds
    vi.advanceTimersByTime(2000)

    // Should have 4 tokens (2 tokens/second * 2 seconds)
    expect(limiter.getAvailableTokens()).toBe(4)
  })

  it("should not exceed maximum capacity when refilling", () => {
    const limiter = new RateLimiter({
      capacity: 5,
      refillRate: 2,
    })

    // Consume some tokens
    limiter.tryConsume(3)

    // Advance time by 5 seconds (should add 10 tokens, but capacity is 5)
    vi.advanceTimersByTime(5000)

    expect(limiter.getAvailableTokens()).toBe(5)
  })

  it("should handle burst traffic up to capacity", () => {
    const limiter = new RateLimiter({
      capacity: 5,
      refillRate: 1,
    })

    // Should allow burst of requests up to capacity
    for (let i = 0; i < 5; i++) {
      expect(limiter.tryConsume(1)).toBe(true)
    }

    // Next request should be denied
    expect(limiter.tryConsume(1)).toBe(false)
  })

  it("should handle custom token consumption amounts", () => {
    const limiter = new RateLimiter({
      capacity: 10,
      refillRate: 2,
    })

    // Consume varying amounts of tokens
    expect(limiter.tryConsume(3)).toBe(true)
    expect(limiter.getAvailableTokens()).toBe(7)
    expect(limiter.tryConsume(4)).toBe(true)
    expect(limiter.getAvailableTokens()).toBe(3)
    expect(limiter.tryConsume(4)).toBe(false)
    expect(limiter.getAvailableTokens()).toBe(3)
  })

  it("should handle partial refills correctly", async () => {
    const limiter = new RateLimiter({
      capacity: 10,
      refillRate: 2, // 2 tokens per second
    })

    // Consume all tokens
    limiter.tryConsume(10)

    // Advance time by 1.5 seconds
    vi.advanceTimersByTime(1500)

    // Should have 3 tokens (2 tokens/second * 1.5 seconds)
    expect(limiter.getAvailableTokens()).toBe(3)
  })
})
