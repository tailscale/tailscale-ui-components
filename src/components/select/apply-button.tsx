import cx from "classnames"
import React from "react"
import { Button } from "../button/button"

export type ApplyButtonProps = {
  className?: string
  onClick: () => void
  disabled: boolean
}

export function ApplyButton({
  className,
  onClick,
  disabled,
}: ApplyButtonProps) {
  return (
    <div className={cx("p-3", className)}>
      <Button
        aria-live="polite"
        className="w-full"
        sizeVariant="small"
        disabled={disabled}
        onClick={onClick}
      >
        Apply
      </Button>
    </div>
  )
}
