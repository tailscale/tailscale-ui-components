import cx from "classnames"
import React, { ChangeEvent } from "react"

export type ToggleProps = {
  id?: string
  className?: string
  disabled?: boolean
  checked: boolean
  sizeVariant?: "small" | "medium" | "large"
  onChange: (checked: boolean) => void
}

export function Toggle(props: ToggleProps) {
  const { className, id, disabled, checked, sizeVariant, onChange } = props

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked)
  }

  return (
    <input
      id={id}
      type="checkbox"
      className={cx(
        "toggle",
        {
          "toggle-large": sizeVariant === "large",
          "toggle-small": sizeVariant === "small",
        },
        className
      )}
      disabled={disabled}
      checked={checked}
      onChange={handleChange}
    />
  )
}

Toggle.defaultProps = {
  sizeVariant: "medium",
}
