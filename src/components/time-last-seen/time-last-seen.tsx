import cx from "classnames"
import { differenceInMinutes, isSameDay, isSameYear, isValid } from "date-fns"
import React from "react"
import { StatusDot } from "src/components/status-dot/status-dot"
import { Time } from "src/components/time/time"
import { fullDate, shortDate, shortTime } from "src/utils/format"
import { serverNow } from "src/utils/time"

export type TimeLastSeenProps = {
  connected?: boolean
  restricted?: boolean
  date: any
  dot?: boolean
  className?: string
}

/**
 * TimeLastSeen renders a "🟢 Connected" when connected or "⚫ 2pm" with the
 * date. If not connected and the date is invalid, null is returned so that you
 * can use fallback content:
 *
 * @example
 *  Last Seen: {<TimeLastSeen connected={false} date={undefined} /> || "Never"}
 */
export function TimeLastSeen({
  connected,
  restricted,
  date,
  className,
  dot = true,
}: TimeLastSeenProps) {
  if (connected) {
    return (
      <span className={className}>
        {dot && <StatusDot status="connected" className="mr-2" />}Connected
      </span>
    )
  }

  if (typeof date === "string") {
    date = new Date(date)
  }
  if (!date || !isValid(date)) {
    return <span className={cx("text-text-disabled", className)}>—</span>
  }

  const now = serverNow()
  const diffMinutes = differenceInMinutes(now, date)
  if (diffMinutes < -10) {
    return null
  }

  if (restricted) {
    return (
      <span className={className}>
        {dot && <StatusDot status="restricted" className="mr-2" />}Restricted
      </span>
    )
  }

  return (
    <Time time={date} className={className}>
      {dot && <StatusDot status="unknown" className="mr-2" />}
      {formatLastSeenTime(date, now)}
    </Time>
  )
}

function formatLastSeenTime(date: Date, now: Date): string {
  if (isSameDay(date, now)) {
    return shortTime(date)
  }
  if (differenceInMinutes(now, date) < 10080) {
    return `${shortDate(date)}, ${shortTime(date)}`
  }
  if (isSameYear(date, now)) {
    return shortDate(date)
  }
  return fullDate(date)
}
