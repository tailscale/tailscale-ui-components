import type { Meta, StoryObj } from "@storybook/react"
import { SearchInput } from "./search-input"

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
}
export default meta

type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  args: {
    placeholder: "Search...",
  },
}
