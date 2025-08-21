import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Card } from "./card"

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: "text" },
    elevated: { control: "boolean" },
    empty: { control: "boolean" },
    noPadding: { control: "boolean" },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "This is the content of the card.",
    elevated: false,
    empty: false,
    noPadding: false,
  },
  render: (args) => (
    <Card {...args} className="w-80">
      {args.children}
    </Card>
  ),
}

export const Elevated: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: "This card is elevated.",
    elevated: true,
  },
}

export const Empty: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: "This card is for empty states.",
    empty: true,
  },
}

export const NoPadding: Story = {
  ...Default,
  args: {
    ...Default.args,
    children: (
      <div className="bg-blue-50 text-blue-600 p-4">
        This card has no padding, so the content inside can extend to the edges.
      </div>
    ),
    noPadding: true,
  },
}
