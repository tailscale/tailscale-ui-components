import { addons } from "storybook/manager-api"
import tailscaleStorybookTheme from "./TailscaleStorybookTheme"

addons.setConfig({
  theme: tailscaleStorybookTheme,
})
