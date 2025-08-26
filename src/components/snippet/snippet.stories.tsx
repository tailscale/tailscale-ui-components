

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Snippet } from "./snippet"
import { ToastProvider } from "../toaster/toaster"

const meta: Meta<typeof Snippet> = {
  title: "Components/Snippet",
  component: Snippet,
  argTypes: {
    allowWrap: { control: "boolean" },
    prompt: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Snippet>

export const Default: Story = {
  args: {
    text: "npm install tailscale-ui-components",
    prompt: true,
  },
}

export const WithCustomChildren: Story = {
  args: {
    text: "echo ‘Hello, world!’",
    children: <span style={{ color: "red" }}>echo ‘Hello, world!’</span>,
    prompt: false,
  },
}

export const AllowWrap: Story = {
  args: {
    text:
      "A very long command that will wrap to the next line if allowWrap is true. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    allowWrap: true,
    prompt: false,
  },
}