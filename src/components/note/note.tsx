import cx from "classnames"
import React, { cloneElement, HTMLAttributes } from "react"
import { Button } from "src/components/button/button"
import { AlertCircle, AlertTriangle, Info, X } from "src/icons"

type Props = HTMLAttributes<HTMLDivElement> & {
  intent?: NoteIntent
  title?: string
  icon?: React.ReactElement | false

  // If onDismiss is set, the Note has state and will hide itself based on
  // conditions passed in by the caller. If onDismiss is set, dismissed
  // and dismissLabel must also be set.
  // must also be set.
  onDismiss?: () => void
  dismissed?: boolean
  dismissLabel?: string // for use on the aria label
}

export type NoteIntent = "info" | "primary" | "warning" | "error"

/**
 * Note is a component for calling out information that requires attention.
 */
export default function Note(props: Props) {
  const {
    className,
    children,
    color,
    icon,
    title,
    intent,
    dismissed,
    onDismiss,
    dismissLabel,
    ...rest
  } = props

  const iconSize = "1.125em"
  const iconComponent = getIcon(icon, iconSize, intent)

  return onDismiss && dismissed ? null : (
    <div
      className={cx(
        "flex overflow-hidden rounded-md py-3 px-4 gap-2 relative",
        className,
        {
          "bg-gray-0 dark:bg-gray-800 border border-gray-200 dark:border-gray-700":
            !intent || intent === "info",
          "bg-blue-0 dark:bg-blue-500/10 text-text-primary border border-blue-50 dark:border-blue-400/20":
            intent === "primary",
          "bg-orange-0 dark:bg-yellow-600/10 text-text-warning border border-orange-50 dark:border-yellow-400/20":
            intent === "warning",
          "bg-red-0 dark:bg-red-600/10 text-text-danger border border-red-50 dark:border-red-400/20":
            intent === "error",
        }
      )}
      role="alert"
      {...rest}
    >
      {iconComponent && <div className="pt-px">{iconComponent}</div>}
      <div
        className={cx("w-full", {
          "pr-4": onDismiss && !dismissed && !title,
        })}
      >
        {title && (
          <h4
            className={cx("font-medium mb-2", {
              "pr-4": onDismiss && !dismissed,
            })}
          >
            {title}
          </h4>
        )}
        {children}
      </div>
      {onDismiss && (
        <Button
          variant="minimal"
          className="absolute top-2 right-2 px-1 py-1"
          iconOnly
          aria-label={dismissLabel}
          prefixIcon={<X />}
          onClick={onDismiss}
        />
      )}
    </div>
  )
}

function getIcon(
  icon: React.ReactElement | false | undefined,
  iconSize: string,
  intent: NoteIntent | undefined
) {
  if (icon) {
    return cloneElement(icon, { size: iconSize })
  } else if (icon === false) {
    return null
  }

  switch (intent) {
    case "warning":
      return <AlertTriangle size={iconSize} />
    case "error":
      return <AlertCircle size={iconSize} />
    default:
      return <Info size={iconSize} />
  }
}
