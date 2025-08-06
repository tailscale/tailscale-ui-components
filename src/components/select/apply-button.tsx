import cx from "classnames"
import React from "react"
import { Button } from "src/components/button/button"

export default function ApplyButton({
  className,
  onClick,
  disabled,
}: {
  className?: string
  onClick: () => void
  disabled: boolean
}) {
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
