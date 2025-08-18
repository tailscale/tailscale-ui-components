import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Error } from "./error"

const meta: Meta<typeof Error> = {
  title: "components/Error",
  component: Error,
}

export default meta

type Story = StoryObj<typeof Error>

export const Default: Story = {
  args: {
    label: "Error",
    children: "Something went wrong.",
  },
}

export const CustomLabel: Story = {
  args: {
    label: "Warning",
    children: "This is a warning message.",
  },
}
