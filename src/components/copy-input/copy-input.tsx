import cx from "classnames"
import React, { MouseEvent } from "react"
import useTimedToggle from "src/hooks/timed-toggle"
import { copyText } from "src/utils/clipboard"
import { noop } from "src/utils/util"

type Props = {
  text: string
  visibleText?: string
  buttonLabel?: string
  className?: string
  autoFocus?: boolean
  onCopySuccess?: () => void
  onCopyFailed?: () => void
  disabled?: boolean
}

/**
 * CopyInput is an input component with a "copy" button for easy clipboard
 * management.
 */
export default function CopyInput(props: Props) {
  const {
    buttonLabel = "Copy",
    className,
    onCopySuccess = noop,
    onCopyFailed = noop,
    text,
    visibleText,
    autoFocus,
    disabled,
  } = props
  const [copied, setCopied] = useTimedToggle(false)
  const copiedText = "Copied!"
  const labelLongerThanCopied = copiedText.length > buttonLabel.length

  return (
    <div
      className={cx(
        "flex input-wrapper relative overflow-hidden min-w-0",
        className
      )}
    >
      <input
        className={cx(
          "outline-none py-2 px-3 w-full h-full font-mono text-sm text-ellipsis bg-gray-100 dark:bg-gray-900 dark:hover:border-gray-900",
          {
            "bg-gray-0 dark:bg-gray-800 text-text-muted": disabled,
          }
        )}
        type="text"
        readOnly
        autoFocus={autoFocus}
        onCopy={onCopySuccess}
        onClick={(e: MouseEvent<HTMLInputElement>) => {
          const input = e.currentTarget
          input.setSelectionRange(0, input.value.length)
        }}
        value={visibleText || text}
        disabled={disabled}
      />
      <button
        className={cx(
          "flex justify-center py-2 pl-3 pr-4 rounded-md bg-bg-base focus:outline-none font-sans font-medium text-sm",
          {
            link: !disabled,
            "bg-gray-0 dark:bg-gray-900 text-text-muted": disabled,
          }
        )}
        type="button"
        disabled={disabled}
        onClick={() => {
          setCopied(true)
          copyText(text)
            .then(() => {
              setCopied(true)
              onCopySuccess?.()
            })
            .catch(() => {
              onCopyFailed?.()
            })
        }}
      >
        <span
          className={cx("whitespace-nowrap", {
            invisible: copied,
            absolute: labelLongerThanCopied,
          })}
        >
          {buttonLabel}
        </span>
        <span
          className={cx({
            invisible: !copied,
            visible: copied,
            absolute: !labelLongerThanCopied,
          })}
        >
          {copiedText}
        </span>
      </button>
    </div>
  )
}
