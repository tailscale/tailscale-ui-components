import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Tooltip } from "../tooltip/tooltip"
import { TimeLastSeen } from "./time-last-seen"

const meta: Meta<typeof TimeLastSeen> = {
  title: "components/TimeLastSeen",
  component: TimeLastSeen,
  decorators: [
    (Story) => (
      <Tooltip.Provider>
        <Story />
      </Tooltip.Provider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof TimeLastSeen>

const now = new Date()
const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)
const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)

export const Connected: Story = {
  args: {
    connected: true,
  },
}

export const Restricted: Story = {
  args: {
    restricted: true,
  },
}

export const RecentlyDisconnected: Story = {
  args: {
    connected: false,
    date: fiveMinutesAgo,
  },
}

export const DisconnectedToday: Story = {
  args: {
    connected: false,
    date: oneDayAgo,
  },
}

export const DisconnectedThisWeek: Story = {
  args: {
    connected: false,
    date: oneWeekAgo,
  },
}

export const DisconnectedThisYear: Story = {
  args: {
    connected: false,
    date: oneYearAgo,
  },
}

export const WithoutDot: Story = {
  args: {
    connected: false,
    date: fiveMinutesAgo,
    dot: false,
  },
}

export const InvalidDate: Story = {
  args: {
    connected: false,
    date: "invalid date",
  },
}

export const NeverConnected: Story = {
  args: {
    connected: false,
    date: null,
  },
}
