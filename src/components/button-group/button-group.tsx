import cx from "classnames"
import React, { HTMLAttributes } from "react"

export type ButtonGroupProps = {
  className?: string
  children: React.ReactNode
} & HTMLAttributes<HTMLDivElement>

export function ButtonGroup(props: ButtonGroupProps) {
  const { className, children, ...rest } = props
  return (
    <div className={cx("button-group", className)} {...rest}>
      {children}
    </div>
  )
}
