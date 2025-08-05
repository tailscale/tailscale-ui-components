import cx from "classnames"
import React, { HTMLAttributes } from "react"

export type BadgeColor =
  | "blue"
  | "green"
  | "red"
  | "orange"
  | "yellow"
  | "gray"
  | "outline"

type Props = {
  variant: "tag" | "status" | "cell"
  color: BadgeColor
} & HTMLAttributes<HTMLDivElement>

export default function Badge(props: Props) {
  const { className, color, variant, ...rest } = props

  return (
    <div
      className={cx(
        "inline-flex items-center align-middle justify-center font-medium",
        {
          "border border-gray-200 dark:border-transparent bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300":
            color === "gray",
          "border border-green-50 dark:border-transparent bg-green-50 dark:bg-green-400 text-text-success dark:text-green-0":
            color === "green",
          "border border-blue-50 dark:border-transparent bg-blue-50 dark:bg-blue-600 text-text-primary dark:text-blue-50":
            color === "blue",
          "border border-orange-50 dark:border-transparent bg-orange-50 dark:bg-orange-400/50 text-text-warning dark:text-orange-50":
            color === "orange",
          "border border-yellow-50 dark:border-transparent bg-yellow-50 dark:bg-yellow-200 text-text-warning dark:text-orange-800":
            color === "yellow",
          "border border-red-50 dark:border-transparent bg-red-50 dark:bg-red-800 text-red-text-danger dark:text-red-100":
            color === "red",
          "border border-border-interactive bg-bg-base": color === "outline",
          "rounded-full px-2 py-1 leading-none": variant === "status",
          "rounded-sm px-1": variant === "tag",
          "rounded-md px-1 text-xs": variant === "cell",
        },
        className
      )}
      {...rest}
    />
  )
}

Badge.defaultProps = {
  color: "gray",
}

export function AlphaBadge(props: { className?: string }) {
  return (
    <Badge
      className={cx("relative", props.className)}
      variant="status"
      color="yellow"
    >
      Alpha
    </Badge>
  )
}

export function BetaBadge(props: { className?: string; feature?: string }) {
  return (
    <Badge
      className={cx("relative", props.className)}
      variant="status"
      color="yellow"
    >
      Beta
      {props.feature && (
        <>
          :<span className="font-normal ml-1">{props.feature}</span>
        </>
      )}
    </Badge>
  )
}
