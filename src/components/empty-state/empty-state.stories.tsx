import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { AlertCircle } from "../../icons"
import { Button } from "../button/button"
import { EmptyState } from "./empty-state"

const meta: Meta<typeof EmptyState> = {
  title: "components/EmptyState",
  component: EmptyState,
}

export default meta

type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    description: "No data available.",
    title: "Empty State",
  },
}

export const WithAction: Story = {
  render: (args) => (
    <EmptyState {...args} action={<Button>Try Again</Button>} />
  ),
  args: {
    description: "Something went wrong.",
    title: "Error",
  },
}

export const WithIcon: Story = {
  render: (args) => <EmptyState {...args} icon={<AlertCircle />} />,
  args: {
    description: "No results found.",
    title: "Search Results",
  },
}
