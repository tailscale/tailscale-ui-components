import cx from "classnames"
import React, { HTMLProps } from "react"
import { LoadingDots } from "../loading-dots/loading-dots"

export type ButtonVariant = "filled" | "minimal"
export type ButtonIntent = "base" | "primary" | "warning" | "danger" | "black"
export type ButtonSize = "xsmall" | "input" | "small" | "medium" | "large"

export const BUTTON_VARIANTS = [
  "filled",
  "minimal",
] as const satisfies readonly ButtonVariant[]

export const BUTTON_INTENTS = [
  "base",
  "primary",
  "warning",
  "danger",
  "black",
] as const satisfies readonly ButtonIntent[]

export const BUTTON_SIZES = [
  "xsmall",
  "input",
  "small",
  "medium",
  "large",
] as const satisfies readonly ButtonSize[]

const BUTTON_FILLED_INTENT_STYLES: Record<ButtonIntent, string> = {
  base: "bg-gray-0 dark:bg-gray-700 border-gray-300 dark:border-gray-600 enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-600 enabled:hover:border-gray-300 dark:enabled:hover:border-gray-500 enabled:focus-visible:bg-gray-100 dark:enabled:focus-visible:bg-gray-600 enabled:focus-visible:border-gray-300 dark:enabled:focus-visible:border-gray-500 enabled:hover:text-gray-900 dark:enabled:hover:text-gray-300 disabled:border-gray-200 dark:disabled:border-gray-600/30 disabled:text-text-disabled",
  primary:
    "bg-blue-500 dark:bg-blue-600 border-blue-500 dark:border-blue-600 text-white enabled:hover:bg-blue-600 dark:enabled:hover:bg-blue-500 enabled:hover:border-blue-600 dark:enabled:hover:border-blue-500 enabled:focus-visible:bg-blue-600 dark:enabled:focus-visible:bg-blue-500 disabled:text-blue-50 disabled:bg-blue-300 dark:disabled:bg-blue-600 disabled:border-blue-300 dark:disabled:border-blue-600 dark:disabled:opacity-40",
  danger:
    "bg-red-400 dark:bg-red-500 border-red-400 dark:border-red-500 text-white enabled:hover:bg-red-500 dark:enabled:hover:bg-red-400 enabled:hover:border-red-500 dark:enabled:hover:border-red-400 enabled:focus-visible:outline-outline-focus-danger enabled:focus-visible:bg-red-500 dark:enabled:focus-visible:bg-red-400 disabled:text-red-50 disabled:bg-red-300 dark:disabled:bg-red-500 disabled:border-red-300 dark:disabled:border-red-500 dark:disabled:opacity-40",
  warning:
    "bg-yellow-300 dark:bg-yellow-400 border-yellow-300 dark:border-yellow-400 text-white enabled:hover:bg-yellow-400 dark:enabled:hover:bg-yellow-300 enabled:hover:border-yellow-400 dark:enabled:hover:border-yellow-300 enabled:focus-visible:outline-outline-focus-warning enabled:focus-visible:bg-yellow-400 dark:enabled:focus-visible:bg-yellow-300 disabled:text-yellow-50 disabled:bg-yellow-200 dark:disabled:bg-yellow-400 disabled:border-yellow-200 dark:disabled:border-yellow-400 dark:disabled:opacity-40",
  black:
    "bg-gray-800 border-gray-800 text-white enabled:hover:bg-gray-900 dark:enabled:hover:bg-gray-700 enabled:hover:border-gray-900 dark:enabled:hover:border-gray-700 disabled:opacity-75",
}

const BUTTON_FILLED_ACTIVE_STYLES: Record<ButtonIntent, string> = {
  base: "enabled:bg-gray-200 dark:enabled:bg-gray-800 enabled:border-gray-300 dark:enabled:border-gray-700",
  primary: "",
  danger: "",
  warning: "",
  black: "",
}

const BUTTON_MINIMAL_INTENT_STYLES: Record<ButtonIntent, string> = {
  base: "text-text-base enabled:focus-visible:bg-gray-100 dark:enabled:focus-visible:bg-gray-500/10 enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-500/10",
  black:
    "text-text-base enabled:focus-visible:bg-gray-100 dark:enabled:focus-visible:bg-gray-500/10 enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-500/10",
  primary:
    "text-text-primary enabled:focus-visible:bg-blue-0 dark:enabled:focus-visible:bg-blue-400/10 enabled:hover:bg-blue-0 dark:enabled:hover:bg-blue-400/10",
  danger:
    "text-text-danger enabled:focus-visible:bg-red-0 dark:enabled:focus-visible:bg-red-400/10 enabled:focus-visible:outline-outline-focus-danger enabled:hover:bg-red-0 dark:enabled:hover:bg-red-400/10",
  warning:
    "text-text-warning enabled:focus-visible:bg-orange-0 dark:enabled:focus-visible:bg-orange-400/10 enabled:focus-visible:outline-outline-focus-warning enabled:hover:bg-orange-0 dark:enabled:hover:bg-orange-400/10",
}

const BUTTON_MINIMAL_ACTIVE_STYLES: Record<ButtonIntent, string> = {
  base: "enabled:bg-gray-200 border-gray-300",
  black: "enabled:bg-gray-200 border-gray-300",
  primary: "",
  danger: "",
  warning: "",
}

const BUTTON_SIZE_STYLES: Record<
  ButtonSize,
  { height: string; padding?: string; text?: string }
> = {
  xsmall: { height: "h-6" },
  input: { height: "h-9" },
  small: { height: "h-8 text-sm", padding: "px-2.5 text-sm" },
  medium: { height: "h-9", padding: "px-3" },
  large: { height: "h-10", padding: "px-4" },
}

export type ButtonProps = {
  type?: "button" | "submit" | "reset"
  sizeVariant?: ButtonSize
  /**
   * variant is the visual style of the button. By default, this is a filled
   * button. For a less prominent button, use minimal.
   */
  variant?: ButtonVariant
  /**
   * intent describes the semantic meaning of the button's action. For
   * dangerous or destructive actions, use danger. For actions that should
   * be the primary focus, use primary.
   */
  intent?: ButtonIntent

  active?: boolean
  /**
   * prefixIcon is an icon or piece of content shown at the start of a button.
   */
  prefixIcon?: React.ReactNode
  /**
   * suffixIcon is an icon or piece of content shown at the end of a button.
   */
  suffixIcon?: React.ReactNode
  /**
   * loading displays a loading indicator inside the button when set to true.
   * The sizing of the button is not affected by this prop.
   */
  loading?: boolean
  /**
   * iconOnly indicates that the button contains only an icon. This is used to
   * adjust styles to be appropriate for an icon-only button.
   */
  iconOnly?: boolean
  /**
   * textAlign align the text center or left. If left aligned, any icons will
   * move to the sides of the button.
   */
  textAlign?: "center" | "left"
} & HTMLProps<HTMLButtonElement>

/**
 * Buttons are used to trigger actions throughout the UI. Buttons take both a variant (filled or ghost) and an intent (base, primary, warning, danger).
 *
 * @example
 * ```tsx
 * // Basic button
 * <Button variant="filled" intent="base">Click me</Button>
 *
 * // Primary button
 * <Button variant="filled" intent="primary">Save</Button>
 *
 * // Button with icon
 * <Button prefixIcon={<Plus size={16} />}>Add Item</Button>
 *
 * // Minimal button
 * <Button variant="minimal" intent="danger">Delete</Button>
 *
 * // Loading button
 * <Button loading>Submitting...</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = "filled",
      intent = "base",
      sizeVariant = "medium",
      disabled,
      children,
      loading,
      active,
      iconOnly,
      prefixIcon,
      suffixIcon,
      textAlign,
      type = "button",
      ...rest
    } = props

    const hasIcon = Boolean(prefixIcon || suffixIcon)
    const isDisabled = disabled || loading

    // Get styles based on variant and intent
    const intentStyles =
      variant === "filled"
        ? BUTTON_FILLED_INTENT_STYLES[intent]
        : BUTTON_MINIMAL_INTENT_STYLES[intent]

    const activeStyles =
      active && variant === "filled"
        ? BUTTON_FILLED_ACTIVE_STYLES[intent]
        : active && variant === "minimal"
        ? BUTTON_MINIMAL_ACTIVE_STYLES[intent]
        : ""

    const sizeStyles = BUTTON_SIZE_STYLES[sizeVariant]

    return (
      <button
        className={cx(
          "button",
          "transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          // Variant-specific base styles
          {
            "bg-transparent border-transparent shadow-none disabled:border-transparent disabled:text-text-disabled":
              variant === "minimal",
          },

          // Intent styles
          intentStyles,

          // Active styles
          activeStyles,

          // Size styles
          sizeStyles.height,
          {
            [sizeStyles.padding || ""]: !iconOnly && sizeStyles.padding,
            [sizeStyles.text || ""]: sizeStyles.text,
          },

          // Icon-only styles
          {
            "aspect-square": iconOnly,
          },

          // Button with icons
          {
            "gap-2": hasIcon,
            "justify-start": hasIcon && !iconOnly && textAlign === "left",
          },

          // Active button
          {
            "relative z-10": active === true,
          },

          className
        )}
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...rest}
      >
        {prefixIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {prefixIcon}
          </span>
        )}
        {loading && (
          <LoadingDots
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-current"
            aria-hidden="true"
          />
        )}
        {children && (
          <span
            className={cx("max-w-full", {
              "text-transparent": loading === true,
              "text-left flex-1": textAlign === "left",
            })}
          >
            {children}
          </span>
        )}
        {suffixIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {suffixIcon}
          </span>
        )}
        {loading && <span className="sr-only">Loading...</span>}
      </button>
    )
  }
)
