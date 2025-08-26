import { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { ToastProvider } from "../toaster/toaster"
import { QuickCopy } from "./quick-copy"

const meta: Meta<typeof QuickCopy> = {
  title: "Components/QuickCopy",
  component: QuickCopy,
  args: {
    primaryActionSubject: "IPv4",
    primaryActionValue: "100.100.100.100",
    children: "100.100.100.100",
  },
  argTypes: {
    onSecondaryAction: { action: "secondary action triggered" },
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

type Story = StoryObj<typeof QuickCopy>

export const Default: Story = {}

export const WithSecondaryAction: Story = {
  args: {
    primaryActionSubject: "IPv4",
    primaryActionValue: "100.100.100.100",
    secondaryActionName: "IPv6",
    secondaryActionValue: "2345:0425:2CA1:0000:0000:0567:5673:23b5",
  },
}

export const HideAffordance: Story = {
  args: {
    hideAffordance: true,
  },
}

export const CustomClassName: Story = {
  args: {
    className: "text-red-500 font-bold",
    children: "Custom styled text to copy",
  },
}
