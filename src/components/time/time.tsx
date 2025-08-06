import React, { ReactNode } from "react"
import Tooltip from "src/components/tooltip/tooltip"
import { formatRelativeDate, fullDate, shortTime } from "src/utils/format"

type TimeProps = {
  time: Date
  className?: string

  /**
   * children is the content of the time element if set. The title attribute is
   * omitted if children is a string with the same value.
   */
  children?: ReactNode

  /**
   * If children is omitted, this is the time format used. Defaults to "long".
   */
  format?: TimeFormat
}

type TimeFormat = "long" | "relative" | "date"

/**
 * Time is a helper for inserting a HTML5 time tag with dateTime and title set
 * to the exact time. The default contents is formatRelativeDate(t) but this
 * can be overriden by inserting children or specifying a label.
 * @param props
 * @returns
 * @example
 *      <Time time={new Date()} />
 * @example
 *      <Time time={new Date()} format="relative" />
 * @example
 *      const t = new Date()
 *      return <Time time={t}>{t.getFullYear()}</Time>
 */
export default function Time({ time, className, children, format }: TimeProps) {
  let title: string | undefined = formatTime("long", time)
  if (!format) {
    format = "long"
  }
  if (!children) {
    children = format === "long" ? title : formatTime(format, time)
  }
  if (children === title) {
    title = undefined
  }

  return (
    <Tooltip content={title} side="bottom">
      <time dateTime={time.toISOString()} className={className}>
        {children}
      </time>
    </Tooltip>
  )
}

function formatTime(format: TimeFormat, time: Date): string {
  switch (format) {
    default:
    case "long":
      return fullDate(time) + " at " + shortTime(time)
    case "date":
      return fullDate(time)
    case "relative":
      return formatRelativeDate(time)
  }
}
