import type { Meta, StoryObj } from "@storybook/react"
import CopyInput from "./copy-input"

const meta = {
  title: "Components/CopyInput",
  component: CopyInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onCopySuccess: { action: "copied" },
    onCopyFailed: { action: "copy failed" },
    text: {
      control: "text",
    },
    visibleText: {
      control: "text",
    },
    buttonLabel: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof CopyInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: "Copy me.",
    buttonLabel: "Copy",
  },
}

export const DifferentVisibleText: Story = {
  args: {
    text: "very-long-text-that-will-be-copied-to-clipboard",
    visibleText: "very-long-text-...",
    buttonLabel: "Copy Key",
  },
}

export const Disabled: Story = {
  args: {
    text: "Copy disabled.",
    disabled: true,
  },
}

export const CustomButtonLabel: Story = {
  args: {
    text: "ssh tailscale@tailscale.com",
    buttonLabel: "Copy SSH Command",
  },
}