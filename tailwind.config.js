// tailwind.config.js
import plugin from "tailwindcss/plugin"
const styles = require("./styles.json")

export default {
  darkMode: ["class", ".dark"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./stories/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "420px",
      md: "768px",
      lg: "1024px",
    },
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: [
        "SFMono-Regular",
        "SFMono Regular",
        "Consolas",
        "Liberation Mono",
        "Menlo",
        "Courier",
        "monospace",
      ],
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    boxShadow: {
      sm: "var(--shadow-sm)",
      DEFAULT: "var(--shadow-base)",
      md: "var(--shadow-md)",
      lg: "var(--shadow-lg)",
      xl: "var(--shadow-xl)",
      "2xl": "var(--shadow-2xl)",
      inner: "var(--shadow-inner)",
      none: "var(--shadow-none)",
      button: "var(--shadow-button)",
      dialog: "var(--shadow-dialog)",
      form: "var(--shadow-form)",
      soft: "var(--shadow-soft)",
      popover: "var(--shadow-popover)",
      tooltip: "var(--shadow-tooltip)",
    },
    colors: styles.colors,
    extend: {
      colors: {
        "bg-base": "var(--color-bg-base)",
        "bg-app": "var(--color-bg-app)",
        "bg-menu-item-hover": "var(--color-bg-menu-item-hover)",

        "border-base": "var(--color-border-base)",
        "border-focus": "var(--color-border-focus)",
        "border-focus-warning": "var(--color-border-focus-warning)",
        "border-focus-danger": "var(--color-border-focus-danger)",
        "border-interactive": "var(--color-border-interactive)",
        "border-interactive-hover": "var(--color-border-interactive-hover)",

        "outline-focus": "var(--color-outline-focus)",
        "outline-focus-warning": "var(--color-outline-focus-warning)",
        "outline-focus-danger": "var(--color-outline-focus-danger)",

        "text-base": "var(--color-text-base)",
        "text-muted": "var(--color-text-muted)",
        "text-disabled": "var(--color-text-disabled)",
        "text-primary": "var(--color-text-primary)",
        "text-success": "var(--color-text-success)",
        "text-warning": "var(--color-text-warning)",
        "text-danger": "var(--color-text-danger)",
      },
      borderColor: {
        DEFAULT: "var(--color-border-base)",
      },
      animation: {
        "scale-in": "scale-in 120ms cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-out": "scale-out 120ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transformOrigin: {
        "radix-hovercard": "var(--radix-hover-card-content-transform-origin)",
        "radix-popover": "var(--radix-popover-content-transform-origin)",
        "radix-tooltip": "var(--radix-tooltip-content-transform-origin)",
      },
      keyframes: {
        "scale-in": {
          "0%": {
            transform: "scale(0.94)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        "scale-out": {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0.94)",
            opacity: "0",
          },
        },
      },
    },
  },

  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("state-open", ['&[data-state="open"]', '[data-state="open"] &',])
      addVariant("state-closed", ['&[data-state="closed"]', '[data-state="closed"] &',])
      addVariant("state-delayed-open", ['&[data-state="delayed-open"]', '[data-state="delayed-open"] &',])
      addVariant("state-active", ['&[data-state="active"]'])
      addVariant("state-inactive", ['&[data-state="inactive"]'])
    }),
  ],
}