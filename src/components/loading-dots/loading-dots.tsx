import cx from "classnames"
import React, { HTMLAttributes } from "react"

export type LoadingDotsProps = HTMLAttributes<HTMLDivElement>

/**
 * LoadingDots provides a set of horizontal dots to indicate a loading state.
 * These dots are helpful in horizontal contexts (like buttons) where a spinner
 * doesn't fit as well.
 */
export function LoadingDots(props: LoadingDotsProps) {
  const { className, ...rest } = props
  return (
    <div className={cx(className, "loading-dots flex gap-1")} {...rest}>
      <span />
      <span />
      <span />
    </div>
  )
}
