import cx from "classnames"
import React from "react"
import { NumericInput } from "src/components/input-numeric/input-numeric"

export type DurationInputProps = {
  id: string
  value: number | string
  onChange: (value: number) => void
  disabled?: boolean
}

/**
 * DurationInput is a pair of "days" and "hours" inputs whose value is
 * translated to/from the value in seconds.
 */
export function DurationInput(props: DurationInputProps) {
  const value =
    typeof props.value === "string"
      ? Number.parseInt(props.value, 10)
      : props.value || 0
  const days = Math.max(0, Math.floor(value / 86400))
  const hours = Math.floor((value % 86400) / 3600)
  const seconds = value % 3600
  return (
    <div className="flex">
      <NumericInput
        id={props.id + "-days"}
        inputClassName="rounded-r-none w-24 text-right"
        steppers="off"
        min={0}
        value={days}
        onChange={(days) =>
          props.onChange(days * 86400 + hours * 3600 + seconds)
        }
        disabled={props.disabled}
      />
      <div
        className={cx(
          "flex items-center mr-3 px-3 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border rounded-r border-l-0",
          {
            "border-gray-300 dark:border-gray-800": !props.disabled,
            "border-gray-200 dark:border-gray-600 cursor-not-allowed":
              props.disabled,
          }
        )}
      >
        days
      </div>

      <NumericInput
        id="session-duration"
        inputClassName="rounded-r-none w-24 text-right"
        steppers="off"
        value={hours}
        onChange={(hours) =>
          props.onChange(days * 86400 + hours * 3600 + seconds)
        }
        disabled={props.disabled}
      />
      <div
        className={cx(
          "flex items-center px-3 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 border rounded-r border-l-0",
          {
            "border-gray-300 dark:border-gray-800": !props.disabled,
            "border-gray-200 dark:border-gray-600 cursor-not-allowed":
              props.disabled,
          }
        )}
      >
        hours
      </div>
    </div>
  )
}
