import { Indicator, Root } from "@radix-ui/react-checkbox"
import cx from "classnames"
import React, { JSX } from "react"
import { Check } from "src/icons"

export type CheckboxProps = {
  id: string
  label: string | JSX.Element
  description?: string
  disabled?: boolean
  checked: boolean
  className?: string
  labelClassName?: string
  truncateLabel?: boolean
  onChange: (checked: boolean) => void
}

/**
 * Checkbox renders a styled and accessible checkbox with an optional label.
 * 
 * They are used to select one or more options. These options can either take effect immediately or on submit.
 * For a single option or for changes that are applied immediately, use a `Toggle` instead.
 *
 *     <Checkbox checked onChange={...} />
 *     <Checkbox checked onChange={...} label="Sign me up" />
 */
export function Checkbox(props: CheckboxProps) {
  const {
    id,
    label,
    description,
    disabled,
    checked,
    className,
    labelClassName,
    truncateLabel,
    onChange,
  } = props

  return (
    <div className={cx("flex flex-col", className)}>
      <div
        className={cx("items-center gap-3", {
          flex: description,
          "inline-flex": !description,
          "min-w-0": truncateLabel,
        })}
      >
        <Root
          id={id}
          checked={checked}
          className={cx(
            "flex flex-shrink-0 w-4 h-4 items-center justify-center relative",
            "text-white border rounded shadow-form transition-colors duration-[120ms]",
            "enabled:focus-visible:visible-focus",
            "disabled:pointer-events-none disabled:select-none",
            {
              "bg-blue-500 border-blue-500 dark:bg-blue-400 dark:border-blue-400":
                checked,
              "enabled:hover:bg-blue-600 dark:enabled:hover:bg-blue-500 enabled:hover:border-blue-600 dark:enabled:hover:border-blue-500":
                checked,
              "disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:border-blue-300 dark:disabled:border-blue-800 disabled:text-blue-50 dark:disabled:text-blue-500":
                checked,
              "bg-gray-0 border-gray-300 dark:bg-gray-700 dark:border-gray-600":
                !checked,
              "enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-600 enabled:hover:border-gray-300 dark:enabled:hover:border-gray-500":
                !checked,
              "disabled:border-gray-200 dark:disabled:bg-gray-700 dark:disabled:border-gray-600/30":
                !checked,
            }
          )}
          disabled={disabled}
          onCheckedChange={onChange}
        >
          <Indicator className="absolute">
            <Check
              className={cx(
                "transition-colors duration-[120ms] group-disabled:text-blue-50 dark:group-disabled:text-blue-500",
                {
                  "opacity-0": !checked,
                }
              )}
              size=".875rem"
              strokeWidth={3}
            />
          </Indicator>
        </Root>
        <div className={cx({ "max-w-full min-w-0": truncateLabel })}>
          <label
            className={cx(
              "select-none block leading-tight",
              {
                "text-text-disabled cursor-not-allowed transition-colors duration-[120ms]":
                  disabled,
                truncate: truncateLabel,
              },
              labelClassName
            )}
            htmlFor={id}
          >
            {label}
          </label>
        </div>
      </div>
      {description && (
        <p className="ml-7 text-text-muted leading-tight select-none transition-colors duration-[120ms]">
          {description}
        </p>
      )}
    </div>
  )
}
