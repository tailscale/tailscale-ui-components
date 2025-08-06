import cx from "classnames";
import React, { HTMLAttributes } from "react";

export type BadgeColor =
  | "blue"
  | "green"
  | "red"
  | "orange"
  | "yellow"
  | "gray"
  | "outline";
export type BadgeVariant = "tag" | "status" | "cell";

export const BADGE_COLORS = [
  "blue",
  "green",
  "red",
  "orange",
  "yellow",
  "gray",
  "outline",
] as const satisfies readonly BadgeColor[];

export const BADGE_VARIANTS = [
  "tag",
  "status",
  "cell",
] as const satisfies readonly BadgeVariant[];

const BADGE_COLOR_STYLES: Record<BadgeColor, string> = {
  gray: "border-gray-200 dark:border-transparent bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300",
  green:
    "border-green-50 dark:border-transparent bg-green-50 dark:bg-green-400 text-text-success dark:text-green-0",
  blue: "border-blue-50 dark:border-transparent bg-blue-50 dark:bg-blue-600 text-text-primary dark:text-blue-50",
  orange:
    "border-orange-50 dark:border-transparent bg-orange-50 dark:bg-orange-400/50 text-text-warning dark:text-orange-50",
  yellow:
    "border-yellow-50 dark:border-transparent bg-yellow-50 dark:bg-yellow-200 text-text-warning dark:text-orange-800",
  red: "border-red-50 dark:border-transparent bg-red-50 dark:bg-red-800 text-red-text-danger dark:text-red-100",
  outline: "border-border-interactive bg-bg-base",
};

/**
 * Badge variant style mappings
 */
const BADGE_VARIANT_STYLES: Record<BadgeVariant, string> = {
  status: "rounded-full px-2 py-1 leading-none",
  tag: "rounded-sm px-1",
  cell: "rounded-md px-1 text-xs",
};

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  variant: BadgeVariant;
  color: BadgeColor;
  children: React.ReactNode;
}

/**
 * Badge component for displaying status indicators, tags, and labels.
 *
 * @example
 * ```tsx
 * <Badge variant="status" color="green">Online</Badge>
 * <Badge variant="tag" color="blue">Frontend</Badge>
 * <Badge variant="cell" color="red">Error</Badge>
 * ```
 */
export default function Badge(props: BadgeProps) {
  const {
    className,
    color = "gray",
    variant,
    children,
    role = "img",
    ...rest
  } = props;

  const colorStyles = BADGE_COLOR_STYLES[color];
  const variantStyles = BADGE_VARIANT_STYLES[variant];

  return (
    <div
      className={cx(
        "inline-flex items-center align-middle justify-center font-medium border transition-colors",
        colorStyles,
        variantStyles,
        className
      )}
      role={role}
      aria-label={typeof children === "string" ? children : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}

// Named export for consistency
export { Badge };

export function AlphaBadge({
  className,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, "children" | "color">) {
  return (
    <Badge
      className={cx("relative", className)}
      variant="status"
      color="yellow"
      aria-label="Alpha version"
      {...props}
    >
      Alpha
    </Badge>
  );
}

export function BetaBadge({
  className,
  feature,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, "children" | "color"> & {
  feature?: string;
}) {
  const label = feature ? `Beta: ${feature}` : "Beta version";

  return (
    <Badge
      className={cx("relative", className)}
      variant="status"
      color="yellow"
      aria-label={label}
      {...props}
    >
      Beta
      {feature && (
        <span className="font-normal ml-1" aria-hidden="true">
          :{feature}
        </span>
      )}
    </Badge>
  );
}
