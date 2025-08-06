import cx from "classnames"
import React from "react"
import { AlertCircle } from "src/icons"

type Props = {
  className?: string
  children: React.ReactNode
  label: string | false
}

/**
 * Error is a standard way to display errors in the admin panel.
 */
export default function Error(props: Props) {
  const { className, label, children } = props

  return (
    <div
      className={cx("flex items-center text-text-danger", className)}
      role="alert"
    >
      <div className="mr-2" aria-hidden="true">
        <AlertCircle size={20} />
      </div>
      <div>
        {label && <span className="font-medium">{label}: </span>}
        {children}
      </div>
    </div>
  )
}

Error.defaultProps = {
  label: "Error",
}
