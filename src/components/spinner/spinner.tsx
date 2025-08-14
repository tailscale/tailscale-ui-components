import cx from "classnames"
import React, { HTMLAttributes } from "react"

export type SpinnerProps = {
  className?: string
  size: "sm" | "md"
} & HTMLAttributes<HTMLDivElement>

export function Spinner(props: SpinnerProps) {
  const { className, size, ...rest } = props

  return (
    <div
      className={cx(
        "spinner inline-block rounded-full align-middle",
        {
          "border-2 w-4 h-4": size === "sm",
          "border-4 w-8 h-8": size === "md",
        },
        className
      )}
      {...rest}
    />
  )
}