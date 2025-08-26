import cx from "classnames"
import React, { SyntheticEvent } from "react"
import useTimedToggle from "../../hooks/timed-toggle"
import { copyText } from "../../utils/clipboard"
import { useToaster } from "../toaster/toaster"
import { Button } from "../button/button"
import { Check, Copy } from "../../icons"

export type SnippetProps = {
  className?: string
  text: string
  children?: string | React.ReactNode
  prompt?: boolean
  copySuccessMessage?: string
  copyFailureMessage?: string
  onClickCallback?: () => void
  allowWrap?: boolean
}

export function Snippet(props: SnippetProps) {
  const {
    className,
    children,
    text,
    prompt = true,
    copySuccessMessage = "Copied to clipboard",
    copyFailureMessage = "Failed to copy to clipboard",
    onClickCallback,
    allowWrap,
  } = props
  const toaster = useToaster()

  const [copied, setCopied] = useTimedToggle(false, { timeout: 750 })
  const onCopyClick = (e: SyntheticEvent) => {
    e.preventDefault()
    setCopied(true)
    copyText(text)
      .then(() => {
        toaster.show({ message: copySuccessMessage })
        if (onClickCallback !== undefined) {
          onClickCallback()
        }
      })
      .catch(() => {
        toaster.show({
          message: copyFailureMessage,
          variant: "danger",
        })
      })
  }

  return (
    <div
      className={cx(
        "relative flex items-center rounded-md max-w-full",
        "select-text",
        "transition-colors",
        "text-sm",
        "bg-gray-50 dark:bg-gray-800",
        "overflow-hidden",
        className
      )}
      aria-label={`Copy ${text} to your clip board.`}
    >
      <pre className={cx("overflow-hidden pl-3 pr-10 py-3")}>
        <code
          className={cx({
            // eslint-disable-next-line curly-quotes/no-straight-quotes
            "before:mr-2 before:text-text-muted before:content-['$'] flex":
              prompt,
            "whitespace-pre-wrap": allowWrap,
          })}
        >
          {children || text}
        </code>
      </pre>
      <div
        className={cx("absolute top-0 right-0 bottom-0 pl-12 pr-1.5", {
          "bg-gradient-to-r from-transparent via-gray-50 to-gray-50 dark:via-gray-800 dark:to-gray-800":
            !allowWrap,
        })}
      >
        <Button
          className={cx("!p-2 rounded", "enabled:hover:bg-gray-200", {
            "mt-1.5": allowWrap,
            "relative top-1/2 -translate-y-1/2": !allowWrap,
          })}
          onClick={onCopyClick}
          iconOnly
          suffixIcon={copied ? <Check size={16} /> : <Copy size={16} />}
          variant="minimal"
          sizeVariant="small"
        />
      </div>
    </div>
  )
}