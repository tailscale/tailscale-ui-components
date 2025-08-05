import cx from "classnames"
import React from "react"
import { Tooltip } from "src/components/tooltip/tooltip"

export type PropertyListItemProps = {
  label: React.ReactNode
  tooltipLabel?: React.ReactNode
  noTruncation?: boolean
  children: React.ReactNode
}

/**
 * Clean horizontal display for a property list item; Can be
 * extended into a full property list component in the future
 * if needed
 */
export function PropertyListItem(props: PropertyListItemProps) {
  return (
    <dl className="flex gap-1 text-sm">
      <dt
        className={cx(
          "text-text-muted",
          "w-1/3 sm:w-1/4 lg:w-1/3 shrink-0",
          "min-w-0 truncate"
        )}
      >
        {props.label}
        {props.tooltipLabel && (
          <Tooltip content={props.tooltipLabel}>
            <Tooltip.InfoIcon
              className={
                "relative -top-px text-text-muted hover:text-text-base ml-1"
              }
            />
          </Tooltip>
        )}
      </dt>
      <dd className={cx("min-w-0", { truncate: !props.noTruncation })}>
        {props.children}
      </dd>
    </dl>
  )
}

/**
 * PropertyListHeader is a standard set of styles for a property list.
 */
export function PropertyListHeader({
  as = "h3",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  className?: string
  children: React.ReactNode
}) {
  const Component = as
  return (
    <Component
      className={cx(
        "first:mt-0 mt-4 mb-2 text-xs uppercase font-semibold text-text-muted tracking-wide",
        className
      )}
    >
      {children}
    </Component>
  )
}
