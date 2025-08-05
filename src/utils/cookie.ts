/**
 * getCookie returns the string value of a cookie if it exists,
 * or undefined if not
 */
export function getCookie(name: string): string | undefined {
  var nameeq = name + "="
  var cookies = document.cookie.split(";")

  for (const cookie of cookies) {
    var c = cookie.trim()
    if (c.indexOf(nameeq) === 0) {
      return c.slice(nameeq.length)
    }
  }

  return undefined
}
