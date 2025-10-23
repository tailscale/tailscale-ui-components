import { addons } from 'storybook/manager-api';
import { create } from "storybook/theming"
import './storybook.css';

addons.setConfig({
  theme: create({
  base: "light",
  fontBase: "'Inter', sans-serif",

  brandTitle: "Tailscale Design System",
  brandUrl: "https://tailscale.com",
  brandImage: "/images/tailscale-logo.svg",
  brandTarget: "_self",

  colorPrimary: "#4b70cc",
  colorSecondary: "#4b70cc",

  // UI
  appBg: "#ffffff",

  // Text colors
  textColor: "#232222",
  textInverseColor: "#ffffff",
}),
})