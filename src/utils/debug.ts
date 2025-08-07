/**
 * @fileoverview Debugging utilities. When imported, adds a global
 * console.NOCOMM*T function that can be used for debug logging. The name is
 * intentional so that it's caught by the pre-commit hook and will be flagged
 * for removal before committing.
 */

import { isDevInstance } from "src/utils/util"

// String literal for the forbidden string that does not literally include it
// (to avoid triggering the pre-commit hook). We can't use simple concatenation
// because that will be flagged by the no-useless-concat ESLint rule.
const forbiddenString = `${"NOCOM"}MIT` as const

declare global {
  interface Console {
    [forbiddenString]: typeof console.log
  }
}

if (isDevInstance()) {
  console[forbiddenString] = function (...args: any[]) {
    // Add an expandable stack trace so that log statements can also be used to
    // answer "who's calling me?" type questions.
    console.groupCollapsed(
      "%c%s",
      "background-color: #900; color: white; font-weight: bold;padding: 1px 2px;border-radius: 2px;",
      forbiddenString,
      ...args
    )
    console.trace()
    console.groupEnd()
  }
}
