import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { SingleSelect, InlineSingleSelect } from "./single-select"
import { SelectValue, StringConstantValue } from "src/components/select/types"

const meta: Meta<typeof SingleSelect> = {
  title: "Components/Select",
  component: SingleSelect,
  tags: ["autodocs"],
  argTypes: {
    onUpdateSelected: { action: "updated" },
  },
}

export default meta

const sampleValues: SelectValue[] = [
  { type: "string-constant", label: "DERP", value: "derp" },
  { type: "string-constant", label: "NAT Traversal", value: "nat-traversal" },
  { type: "string-constant", label: "MagicDNS", value: "magicdns" },
  { type: "string-constant", label: "Subnet Router", value: "subnet-router" },
  { type: "string-constant", label: "ACLs", value: "acls" },
]

// =============================================================================
// SingleSelect
// =============================================================================

type Story = StoryObj<typeof SingleSelect>

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<SelectValue | undefined>(undefined)
    return (
      <SingleSelect
        {...args}
        selected={selected}
        onUpdateSelected={setSelected}
      />
    )
  },
  args: {
    values: sampleValues,
    placeholder: "Select an option…",
  },
}

export const WithValue: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<SelectValue | undefined>(
      args.selected
    )
    return (
      <SingleSelect
        {...args}
        selected={selected}
        onUpdateSelected={setSelected}
      />
    )
  },
  args: {
    values: sampleValues,
    selected: sampleValues[2],
    placeholder: "Choose a fruit…",
  },
}

export const Disabled: Story = {
  args: {
    ...WithValue.args,
    disabled: true,
  },
}

// =============================================================================
// InlineSingleSelect
// =============================================================================

const inlineSampleValues: StringConstantValue[] = [
  {
    value: "one", label: "First option",
    type: "string-constant"
  },
  {
    value: "two", label: "Second option",
    type: "string-constant"
  },
  {
    value: "three", label: "Third option",
    type: "string-constant"
  },
]

export const Inline: StoryObj<typeof InlineSingleSelect> = {
  render: (args) => {
    const [selected, setSelected] = useState<StringConstantValue | undefined>(
      args.selected
    )
    return (
      <div className="w-48">
        <InlineSingleSelect
          {...args}
          selected={selected}
          onUpdateSelected={setSelected}
        />
      </div>
    )
  },
  args: {
    values: inlineSampleValues,
    selected: inlineSampleValues[1],
  },
}