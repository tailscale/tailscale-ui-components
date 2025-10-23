import { create } from "storybook/theming"

export default create({
  base: "light",
  //   fontBase: '"Inter", sans-serif',

  brandTitle: "Tailscale Design System",
  brandUrl: "https://tailscale.com",
  brandImage: "/src/assets/images/tailscale-logo.svg",
  brandTarget: "_self",

  colorPrimary: "#4b70cc",
  colorSecondary: "#4b70cc",

  // UI
  appBg: "#ffffff",

  // Text colors
  textColor: "#232222",
  textInverseColor: "#ffffff",
})
