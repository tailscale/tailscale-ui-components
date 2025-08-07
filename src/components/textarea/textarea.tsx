import cx from "classnames"
import React, { HTMLProps, useLayoutEffect } from "react"

export type TextAreaProps = HTMLProps<HTMLTextAreaElement> & {
  /**
   * autoResize enables auto-resizing of the textarea to fit its content.
   * Defaults to true.
   */
  autoResize?: boolean
  /**
   * minHeight is the minimum height in px of the textarea when auto-resizing.
   * Defaults to 32px.
   */
  minHeight?: number
  /**
   * maxHeight is the maximum height in px of the textarea when auto-resizing.
   * Defaults to undefined.
   */
  maxHeight?: number
  /**
   * visible is whether the textarea is currently visible. This value is fed
   * into the dependency array for the useLayoutEffect in this function to
   * recalculate height when visibility changes (e.g., if the text area is used
   * in a collapsible section) as this can have impacts on the scroll height
   * used in these calculations.
   * Defaults to true.
   */
  visible?: boolean
}

export function TextArea(props: TextAreaProps) {
  const {
    className,
    autoResize = true,
    visible = true,
    minHeight = 32,
    maxHeight,
    ...rest
  } = props
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    // Resize the textarea to fit its content.
    const ta = textAreaRef.current
    if (!ta) {
      return
    }
    if (!autoResize) {
      return
    }
    // Resize the textarea to fit its content.
    const onInput = () => {
      ta.style.resize = "none"
      ta.style.height = "inherit"
      const height = Math.min(
        // The 4px here is to account for the border.
        Math.max(minHeight, ta.scrollHeight + 4),
        maxHeight || Number.POSITIVE_INFINITY
      )
      ta.style.height = `${height}px`
    }
    ta.addEventListener("input", onInput)
    onInput()

    return () => {
      ta.removeEventListener("input", onInput)
    }
  }, [minHeight, maxHeight, autoResize, visible])

  return (
    <textarea
      ref={textAreaRef}
      className={cx(
        "textarea input py-3",
        // Use scroll-padding to keep some space at the bottom when scrolling.
        "scroll-py-3",
        className
      )}
      {...rest}
    />
  )
}
