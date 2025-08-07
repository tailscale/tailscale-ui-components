interface RateLimiterOptions {
  capacity: number
  refillRate: number
}

export class RateLimiter {
  private tokens: number
  private lastRefillTimestamp: number
  private readonly capacity: number
  private readonly refillRate: number

  constructor({ capacity, refillRate }: RateLimiterOptions) {
    this.tokens = capacity
    this.lastRefillTimestamp = Date.now()
    this.capacity = capacity
    this.refillRate = refillRate
  }

  private refill(): void {
    const now = Date.now()
    const elapsedSeconds = (now - this.lastRefillTimestamp) / 1000
    const tokensToAdd = elapsedSeconds * this.refillRate

    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd)
    this.lastRefillTimestamp = now
  }

  public tryConsume(tokens: number = 1): boolean {
    this.refill()

    if (this.tokens >= tokens) {
      this.tokens -= tokens
      return true
    }

    return false
  }

  public getAvailableTokens(): number {
    this.refill()
    return Math.floor(this.tokens)
  }
}
