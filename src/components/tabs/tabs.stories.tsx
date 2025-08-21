import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Tabs } from "./tabs"

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    tabs: {
      control: { type: "object" },
      defaultValue: [
        { id: "account", label: "Account", content: "Account content" },
        { id: "billing", label: "Billing", content: "Billing content" },
      ],
      description: "Array of tab objects with id, label, and content.",
      table: {
        type: {
          summary:
            "{ id: string, label: ReactNode, content?: ReactNode, icon?: ReactNode }[]",
        },
        defaultValue: {
          summary:
            '[{ id: "account", label: "Account", content: "Account content" }, { id: "billing", label: "Billing", content: "Billing content" }]',
        },
      },
    },
    defaultValue: {
      control: { type: "text" },
      defaultValue: "account",
    },
  },
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Basic: Story = {
  args: {
    tabs: [
      { id: "account", label: "Account", content: "Account content" },
      { id: "billing", label: "Billing", content: "Billing content" },
    ],
    defaultValue: "account",
  },
  render: (args) => <Tabs {...args} />,
}
