import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import Combobox from "./combobox"
import { ComboboxValue } from "./types"
import FormField from "src/components/form-field/form-field"

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onUpdate: { action: "updated" },
  },
  decorators: [
    (Story) => (
      <div className="w-[24rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const sampleValues: ComboboxValue[] = [
  new ComboboxValue({ value: "derp", label: "DERP" }),
  new ComboboxValue({ value: "nat-traversal", label: "NAT Traversal" }),
  new ComboboxValue({ value: "magicdns", label: "MagicDNS" }),
  new ComboboxValue({ value: "subnet-router", label: "Subnet Router" }),
  new ComboboxValue({ value: "acls", label: "ACLs" }),
]

export const Default: Story = {
  render: (args) => (
    <FormField label="Feature">
      <Combobox {...args} />
    </FormField>
  ),
  args: {
    values: sampleValues,
    placeholder: "Select a feature",
    onUpdate: () => {},
  },
}

export const WithInitialValue: Story = {
  render: (args) => (
    <FormField label="Feature">
      <Combobox {...args} />
    </FormField>
  ),
  args: {
    values: sampleValues,
    initialSelectedItem: sampleValues[2],
    placeholder: "Select a feature",
    onUpdate: () => {},
  },
}

export const WithError: Story = {
  render: (args) => (
    <FormField label="Feature" error="Please select a feature.">
      <Combobox {...args} />
    </FormField>
  ),
  args: {
    values: sampleValues,
    placeholder: "Select a feature",
    hasError: true,
    onUpdate: () => {},
  },
}

export const WithoutLeftBorder: Story = {
  render: (args) => (
    <FormField label="Feature">
      <Combobox {...args} />
    </FormField>
  ),
  args: {
    values: sampleValues,
    placeholder: "Select a feature",
    withoutLeftBorder: true,
    onUpdate: () => {},
  },
}
