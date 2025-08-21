import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { HoverCard } from "./hovercard"

const meta: Meta<typeof HoverCard> = {
  title: "components/HoverCard",
  component: HoverCard,
  argTypes: {
    trigger: { table: { disable: true } },
    children: { table: { disable: true } },
  },
}

export default meta

type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: (args) => (
    <HoverCard
      {...args}
      trigger={<span>Hover me</span>}
      href="https://tailscale.com"
    >
      <div>HoverCard content goes here.</div>
    </HoverCard>
  ),
}
