import cx from "classnames"
import React, { InputHTMLAttributes } from "react"

export type InputProps = {
  className?: string
  inputClassName?: string
  error?: boolean
  suffix?: JSX.Element
} & InputHTMLAttributes<HTMLInputElement>

// Input is styled in a way that only works for text inputs.
export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    inputClassName,
    error,
    prefix,
    suffix,
    disabled,
    ...rest
  } = props
  return (
    <div className={cx("relative", className)}>
      <input
        ref={ref}
        className={cx("input z-10", inputClassName, {
          "input-error": error,
        })}
        disabled={disabled}
        {...rest}
      />
      {suffix ? <div className={overlayClassName}>{suffix}</div> : null}
    </div>
  )
})

const overlayClassName =
  "bg-bg-base top-1 bottom-1 right-1 rounded-r-md absolute flex items-center"


