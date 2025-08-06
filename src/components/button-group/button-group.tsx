import cx from "classnames"
import React, { HTMLAttributes } from "react"

type Props = {
  className?: string
  children: React.ReactNode
} & HTMLAttributes<HTMLDivElement>

export default function ButtonGroup(props: Props) {
  const { className, children, ...rest } = props
  return (
    <div className={cx("button-group", className)} {...rest}>
      {children}
    </div>
  )
}
