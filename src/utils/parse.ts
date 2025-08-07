import { parse } from "date-fns"
import { format } from "date-fns-tz"
import { dateFilterFormat } from "src/utils/format"

/**
 * parseNumericDate validates and returns a date in the form of YYYY/MM/DD
 */

export function parseNumericDate(dateString: string) {
  try {
    // Date.parse will not return a NaN on a date like 2020/0/0 even
    // though we want to reject it (2020/0/0 gets read as 2019/11/29),
    // so we're making use of date-fn's format() function to throw an
    // error at the parsing stage
    const parseAttempt = format(
      parse(dateString, dateFilterFormat, new Date()),
      dateFilterFormat
    )
    if (Number.isNaN(parseAttempt)) {
      return Number.NaN
    }
  } catch {
    return Number.NaN
  }

  return parse(dateString, dateFilterFormat, new Date())
}
