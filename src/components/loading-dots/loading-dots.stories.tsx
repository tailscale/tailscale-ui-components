import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { LoadingDots } from "./loading-dots"

const meta: Meta<typeof LoadingDots> = {
  title: "Components/LoadingDots",
  component: LoadingDots,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof LoadingDots>

export const Default: Story = {}