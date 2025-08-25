import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Tooltip } from "../tooltip/tooltip"
import { Time } from "./time"

const meta: Meta<typeof Time> = {
  title: "components/Time",
  component: Time,
  decorators: [
    (Story) => (
      <Tooltip.Provider>
        <Story />
      </Tooltip.Provider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Time>

const now = new Date()
const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)

export const LongFormat: Story = {
  args: {
    time: oneHourAgo,
    format: "long",
  },
}

export const RelativeFormat: Story = {
  args: {
    time: oneDayAgo,
    format: "relative",
  },
}

export const DateFormat: Story = {
  args: {
    time: oneYearAgo,
    format: "date",
  },
}

export const WithChildren: Story = {
  args: {
    time: now,
    children: "Custom time display",
  },
}
