import cx from "classnames"
import React, { HTMLProps } from "react"
// import LoadingDots from "src/ui/loading-dots"

export type ButtonProps = {
  type?: "button" | "submit" | "reset"
  sizeVariant?: "xsmall" | "input" | "small" | "medium" | "large"
  /**
   * variant is the visual style of the button. By default, this is a filled
   * button. For a less prominent button, use minimal.
   */
  variant?: Variant
  /**
   * intent describes the semantic meaning of the button's action. For
   * dangerous or destructive actions, use danger. For actions that should
   * be the primary focus, use primary.
   */
  intent?: Intent

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

export type Variant = "filled" | "minimal"
export type Intent = "base" | "primary" | "warning" | "danger" | "black"

/**
 * Button is a clickable element that can be used to trigger actions. It can
 * have different visual styles and semantic meanings.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
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
    ...rest
  } = props

  const hasIcon = Boolean(prefixIcon || suffixIcon)

  return (
    <button
      className={cx(
        "button",
        {
          // base filled
          "bg-gray-0 dark:bg-gray-700 border-gray-300 dark:border-gray-600 enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-600 enabled:hover:border-gray-300 dark:enabled:hover:border-gray-500 enabled:focus-visible:bg-gray-100 dark:enabled:focus-visible:bg-gray-600 enabled:focus-visible:border-gray-300 dark:enabled:focus-visible:border-gray-500 enabled:hover:text-gray-900 dark:enabled:hover:text-gray-300 disabled:border-gray-200 dark:disabled:border-gray-600/30 disabled:text-text-disabled":
            intent === "base" && variant === "filled",
          "enabled:bg-gray-200 dark:enabled:bg-gray-800 enabled:border-gray-300 dark:enabled:border-gray-700":
            intent === "base" && variant === "filled" && active,
          // primary filled
          "bg-blue-500 dark:bg-blue-600 border-blue-500 dark:border-blue-600 text-white enabled:hover:bg-blue-600 dark:enabled:hover:bg-blue-500 enabled:hover:border-blue-600 dark:enabled:hover:border-blue-500 enabled:focus-visible:bg-blue-600 dark:enabled:focus-visible:bg-blue-500 disabled:text-blue-50 disabled:bg-blue-300 dark:disabled:bg-blue-600 disabled:border-blue-300 dark:disabled:border-blue-600 dark:disabled:opacity-40":
            intent === "primary" && variant === "filled",
          // danger filled
          "bg-red-400 dark:bg-red-500 border-red-400 dark:border-red-500 text-white enabled:hover:bg-red-500 dark:enabled:hover:bg-red-400 enabled:hover:border-red-500 dark:enabled:hover:border-red-400 enabled:focus-visible:outline-outline-focus-danger enabled:focus-visible:bg-red-500 dark:enabled:focus-visible:bg-red-400 disabled:text-red-50 disabled:bg-red-300 dark:disabled:bg-red-500 disabled:border-red-300 dark:disabled:border-red-500 dark:disabled:opacity-40":
            intent === "danger" && variant === "filled",
          // warning filled
          "bg-yellow-300 dark:bg-yellow-400 border-yellow-300 dark:border-yellow-400 text-white enabled:hover:bg-yellow-400 dark:enabled:hover:bg-yellow-300 enabled:hover:border-yellow-400 dark:enabled:hover:border-yellow-300 enabled:focus-visible:outline-outline-focus-warning enabled:focus-visible:bg-yellow-400 dark:enabled:focus-visible:bg-yellow-300 disabled:text-yellow-50 disabled:bg-yellow-200 dark:disabled:bg-yellow-400 disabled:border-yellow-200 dark:disabled:border-yellow-400 dark:disabled:opacity-40":
            intent === "warning" && variant === "filled",
          // black filled
          "bg-gray-800 border-gray-800 text-white enabled:hover:bg-gray-900 dark:enabled:hover:bg-gray-700 enabled:hover:border-gray-900 dark:enabled:hover:border-gray-700 disabled:opacity-75":
            intent === "black" && variant === "filled",

          // minimal button (base variant, black is also included because its not supported for minimal buttons)
          "bg-transparent border-transparent shadow-none disabled:border-transparent disabled:text-text-disabled":
            variant === "minimal",
          "text-text-base enabled:focus-visible:bg-gray-100 dark:enabled:focus-visible:bg-gray-500/10 enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-500/10":
            variant === "minimal" && (intent === "base" || intent === "black"),
          "enabled:bg-gray-200 border-gray-300":
            variant === "minimal" &&
            (intent === "base" || intent === "black") &&
            active,
          // primary minimal
          "text-text-primary enabled:focus-visible:bg-blue-0 dark:enabled:focus-visible:bg-blue-400/10 enabled:hover:bg-blue-0 dark:enabled:hover:bg-blue-400/10":
            variant === "minimal" && intent === "primary",
          // danger minimal
          "text-text-danger enabled:focus-visible:bg-red-0 dark:enabled:focus-visible:bg-red-400/10 enabled:focus-visible:outline-outline-focus-danger enabled:hover:bg-red-0 dark:enabled:hover:bg-red-400/10":
            variant === "minimal" && intent === "danger",
          // warning minimal
          "text-text-warning enabled:focus-visible:bg-orange-0 dark:enabled:focus-visible:bg-orange-400/10 enabled:focus-visible:outline-outline-focus-warning enabled:hover:bg-orange-0 dark:enabled:hover:bg-orange-400/10":
            variant === "minimal" && intent === "warning",

          // sizeVariants
          "h-10": sizeVariant === "large",
          "h-9": sizeVariant === "medium",
          "h-8 text-sm": sizeVariant === "small",
          "h-6": sizeVariant === "xsmall",
          "px-4": sizeVariant === "large" && !iconOnly,
          "px-3": sizeVariant === "medium" && !iconOnly,
          "px-2.5 text-sm": sizeVariant === "small" && !iconOnly,

          // iconOnly
          "aspect-square": iconOnly,

          // Button with icons
          "icon-parent gap-2": hasIcon,
          "justify-start": hasIcon && !iconOnly,

          // Active button
          "button-active relative z-10": active === true,
        },
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...rest}
    >
      {prefixIcon && <span className="flex-shrink-0">{prefixIcon}</span>}
      {loading && (
        // <LoadingDots className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-current" />
        <div>...</div>
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
      {suffixIcon && <span className="flex-shrink-0">{suffixIcon}</span>}
    </button>
  )
})