import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Collapsible } from "./collapsible"

const meta: Meta<typeof Collapsible> = {
  title: "components/Collapsible",
  component: Collapsible,
  argTypes: {
    trigger: { control: "text" },
    open: { control: "boolean" },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  args: {
    trigger: "Click to expand",
    children: (
      <div>
        <p>This is the collapsible content.</p>
        <p>It can contain any React node.</p>
      </div>
    ),
  },
}

export const InitiallyOpen: Story = {
  args: {
    ...Default.args,
    open: true,
  },
}
