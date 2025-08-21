import type { Meta, StoryObj } from "@storybook/react"
import { PropertyListItem } from "./property-list-item"

const meta: Meta<typeof PropertyListItem> = {
  title: "Components/PropertyListItem",
  component: PropertyListItem,
}
export default meta

type Story = StoryObj<typeof PropertyListItem>

export const Default: Story = {
  args: {
    label: "Property Label",
    children: "Property Value",
  },
}
