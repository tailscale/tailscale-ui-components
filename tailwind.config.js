import tailscalePreset from "./tailwind.preset.js"

const config = {
  presets: [tailscalePreset],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./stories/**/*.{js,jsx,ts,tsx}"],
};

export default config;