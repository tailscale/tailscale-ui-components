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

/**
 * Toggles are used to turn an option on or off.
 * Use a toggle only if the option takes effect immediately.
 * For selecting multiple options or for changes that require separate confirmation, use a Checkbox instead.
 */
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
  sizeVariant: "medium" as "medium",
}
