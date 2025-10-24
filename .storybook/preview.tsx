import type { Preview } from "@storybook/react";
import { create } from "storybook/theming";
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: create({
        base: "light",
        fontBase: "'Inter', sans-serif",
      }),
    },
  },
  tags: ['autodocs'],
};

export default preview;