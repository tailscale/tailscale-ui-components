import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Switch } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["medium", "large"],
      defaultValue: "medium",
    },
    fullWidth: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    className: {
      control: { type: "text" },
      defaultValue: "",
    },
    options: {
      control: { type: "object" },
      defaultValue: [
        { id: "option1", label: "Option 1" },
        { id: "option2", label: "Option 2" },
      ],
      description: "Array of two options, each with id and label.",
      table: {
        type: {
          summary:
            "[{ id: string, label: ReactNode }, { id: string, label: ReactNode }]",
        },
        defaultValue: {
          summary:
            '[{ id: “option1”, label: “Option 1” }, { id: “option2”, label: “Option 2” }]',
        },
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Switch>

export const Basic: Story = {
  args: {
    size: "medium",
    fullWidth: false,
    className: "",
    options: [
      { id: "option1", label: "Option 1" },
      { id: "option2", label: "Option 2" },
    ],
  },
  render: function SwitchStory(args){
    const [selected, setSelected] = useState(args.options[0]?.id || "option1")
    return <Switch {...args} value={selected} onChange={setSelected} />
  },
}
