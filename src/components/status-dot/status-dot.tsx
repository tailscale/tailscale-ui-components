import cx from "classnames"
import React from "react"

export type StatusDotProps = {
  className?: string
  status: "connected" | "restricted" | "offline" | "unknown" | "error"
  size?: "medium" | "large"
}

export function StatusDot(props: StatusDotProps) {
  const { className, status, size = "medium" } = props

  if (status === "error") {
    return (
      <span
        className={cx(
          "inline-block text-orange-400",
          {
            "w-2.5 h-2.5": size === "medium",
            "w-3 h-3": size === "large",
          },
          className
        )}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.63767 3.36389C10.6876 1.54537 13.3124 1.54537 14.3623 3.36389L22.6305 17.6847C23.6804 19.5033 22.368 21.7764 20.2681 21.7764H3.73185C1.632 21.7764 0.319599 19.5033 1.36952 17.6847L9.63767 3.36389Z"
            fill="currentColor"
          />
        </svg>
      </span>
    )
  }

  return (
    <span
      className={cx(
        "inline-block w-2 h-2 rounded-full",
        {
          "w-2.5 h-2.5": size === "large",
          "bg-green-300 dark:bg-green-400": status === "connected",
          "bg-gray-300 dark:bg-gray-500":
            status === "offline" || status === "unknown",
          "bg-yellow-300 dark:bg-yellow-500": status === "restricted",
        },
        className
      )}
    />
  )
}
