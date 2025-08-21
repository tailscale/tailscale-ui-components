import type { Meta, StoryObj } from "@storybook/react"
import { LoadingDots } from "./loading-dots"

const meta: Meta<typeof LoadingDots> = {
  title: "Components/LoadingDots",
  component: LoadingDots,
}

export default meta

type Story = StoryObj<typeof LoadingDots>

export const Default: Story = {}
