import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { StringConstantValue } from "src/components/select/types"
import { CheckboxSelect } from "./checkbox-select"

const meta = {
  title: "Components/CheckboxSelect",
  component: CheckboxSelect,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    values: { control: "object" },
    selected: { control: "object" },
    onUpdateSelected: { action: "updated" },
  },
} satisfies Meta<typeof CheckboxSelect>

export default meta
type Story = StoryObj<typeof meta>

const allValues: StringConstantValue[] = [
  { label: "MagicDNS", value: "magicdns", type: "string-constant" },
  { label: "Access controls", value: "acls", type: "string-constant" },
  { label: "Taildrop", value: "taildrop", type: "string-constant" },
  { label: "SSH", value: "ssh", type: "string-constant" },
  { label: "Subnet routers", value: "subnet-routers", type: "string-constant" },
  { label: "Exit nodes", value: "exit-nodes", type: "string-constant" },
  { label: "Funnel", value: "funnel", type: "string-constant" },
  { label: "Serve", value: "serve", type: "string-constant" },
]

const StoryWithState = (args: Story["args"]) => {
  const [selected, setSelected] = useState<StringConstantValue[]>([
    allValues[1],
    allValues[3],
  ])

  return (
    <CheckboxSelect
      {...args}
      values={allValues}
      selected={selected}
      onUpdateSelected={setSelected}
    />
  )
}

export const Default: Story = {
  render: (args) => <StoryWithState {...args} />,
  args: {
    label: "Features",
    values: allValues,
    selected: [allValues[1], allValues[3]],
    onUpdateSelected: () => {},
  },
}
