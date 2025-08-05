let serverOffset: number = 0
let serverTimeLastUpdated: Date | undefined

/**
 * serverNow returns a timestamp representing the current time, skew
 * accounting for between client and server time.
 * Use in place of `new Date()`.
 */
export function serverNow(): Date {
  const now = Date.now() + serverOffset
  return new Date(now)
}

/**
 * setServerTime calculates the offset between the client and server clocks.
 */
export function setServerTime(date: string) {
  if (!shouldServerTimeBeUpdated()) {
    return
  }

  const serverTime = new Date(date)
  const localTime = new Date()
  serverOffset = serverTime.getTime() - localTime.getTime()
  serverTimeLastUpdated = serverTime
}

/**
 * shouldServerTimeBeUpdated returns whether the serverOffset
 * should be updated by checking if it has been updated in the
 * last 29 seconds. This means that automatically update in
 * sync with background refresh requests of the admin panel.
 */
function shouldServerTimeBeUpdated(): boolean {
  let now = serverNow()
  now.setSeconds(now.getSeconds() - 29)

  if (serverTimeLastUpdated === undefined || serverTimeLastUpdated < now) {
    return true
  }
  return false
}
