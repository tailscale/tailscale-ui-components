import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  "stories": [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  staticDirs: ['../src/assets'],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  async viteFinal(config) {
    config.plugins = [...(config.plugins || []), tsconfigPaths()];
    return config;
  },
};
export default config;