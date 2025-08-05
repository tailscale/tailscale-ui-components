import { v4 } from "uuid"

/**
 * Generates a version 4 UUID
 * Uses the built-in crypto.randomUUID() if available (preferred for better
 * performance and security). Otherwise, falls back to the uuid library's v4()
 * function for broader compatibility.
 */
export function getV4UUID(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID()
  }

  return v4()
}
