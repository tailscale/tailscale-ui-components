import clsx from "classnames"
import React, { HTMLProps, useEffect, useState } from "react"
import { Button } from "src/components/button/button"
import { Minus, Plus } from "src/icons"
import Input from "src/components/input/input"

const constrain = (
  val: number,
  min: number = Number.NEGATIVE_INFINITY,
  max: number = Number.POSITIVE_INFINITY
) => {
  return Math.min(Math.max(val, min), max)
}

const snap = (val: number, step: number) => {
  return Math.ceil(val / step) * step
}

export type Props = {
  max?: number
  min?: number
  step?: number // when provided, users can only increase/decrease the value by this step amount
  value: number
  onChange: (value: number) => void
  inputClassName?: string
  /**
   * steppers controls the +/- buttons. "on" (the default) shows the step buttons,
   * "off" hides them, and "only" disables the input so only the step buttons can be used.
   */
  steppers?: "on" | "off" | "only"
  error?: boolean
} & Omit<HTMLProps<HTMLInputElement>, "onChange" | "ref">

/**
 * NumericInput is an input meant for collecting numeric values. It provides
 * a set of +/- step buttons, and returns a value as a valid number, handling
 * all kinds of invalid inputs and accessibility concerns.
 *
 * Use it for quantities, counts, and integer values. Don't use it for
 * numeric-like values such as phone numbers or PIN codes.
 */
export default function NumericInput(props: Props) {
  const {
    value,
    min,
    max,
    steppers = "on",
    onChange,
    inputClassName,
    disabled,
    error,
    ...rest
  } = props
  const [text, setText] = useState(value.toString())
  const [focused, setFocused] = useState(false)
  const step = props.step || 1

  useEffect(() => {
    setText(value.toString())
  }, [value, setText])

  useEffect(() => {
    // Disable double-tap to zoom on touch-based devices while a NumericInput
    // is present. It makes it difficult to use the +/- buttons.
    document.body.style.setProperty("touch-action", "pan-y")
    return () => {
      document.body.style.removeProperty("touch-action")
    }
  }, [])

  const increment = () => {
    const nextVal = value + step
    onChange(snap(constrain(nextVal, min, max), step))
  }

  const decrement = () => {
    const nextVal = value - step
    onChange(snap(constrain(nextVal, min, max), step))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!focused) {
      return
    }
    switch (e.key) {
      case "ArrowUp":
      case "=":
      case "+":
        increment()
        break
      case "ArrowDown":
      case "-":
      case "_":
        decrement()
        break
    }
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
    // If text is invalid, set it to the last good value.
    const val = text.replace(/\D/g, "")
    const num = Number.parseInt(val, 10)
    if (Number.isNaN(num)) {
      setText(value.toString())
      return
    }
    const constrained = constrain(num, min, max)
    const snapped = snap(constrained, step)
    if (snapped !== num) {
      // If the number is valid, but the snap to step size or min/max constraint changes it, update the text.
      setText(snapped.toString())
      onChange(snapped)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setText(value)
    const number = Number.parseInt(value, 10)
    if (Number.isNaN(number)) {
      return
    }
    const constrained = constrain(number, min, max)
    const snapped = snap(constrained, step)
    if (snapped === number) {
      // Only alert about the change when blur won't adjust the input value again.
      onChange(constrained)
    }
  }

  const inputDisabled = disabled === true || steppers === "only"
  const incrementDisabled = disabled || (max !== undefined && value >= max)
  const decrementDisabled = disabled || (min !== undefined && value <= min)

  return (
    <Input
      // Standard props for numeric inputs. For more details, see:
      // https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      inputClassName={clsx(inputClassName, {
        "!bg-bg-base": steppers === "only" && !disabled,
      })}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      value={text}
      onChange={handleChange}
      disabled={inputDisabled}
      error={error}
      suffix={
        steppers !== "off" ? (
          <div className="flex items-stretch">
            <Button
              type="button"
              variant="minimal"
              className="!h-7 rounded-[0.1875rem]"
              iconOnly
              onClick={decrement}
              disabled={decrementDisabled}
              tabIndex={-1}
            >
              <Minus size={18} />
            </Button>
            <Button
              type="button"
              variant="minimal"
              className="!h-7 rounded-[0.1875rem]"
              iconOnly
              onClick={increment}
              disabled={incrementDisabled}
              tabIndex={-1}
            >
              <Plus size={18} />
            </Button>
          </div>
        ) : undefined
      }
      {...rest}
    />
  )
}
