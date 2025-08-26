import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { FormField } from "src/components/form-field/form-field"
import MultiSelectCombobox from "./multi-select-combobox"
import { ComboboxValue } from "./types"

const meta = {
  title: "Components/MultiSelectCombobox",
  component: MultiSelectCombobox,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSelectedItemsChanged: { action: "selectedItemsChanged" },
    onItemCreated: { action: "itemCreated" },
  },
  decorators: [
    (Story) => (
      <div className="w-[24rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MultiSelectCombobox>

export default meta
type Story = StoryObj<typeof meta>

const sampleValues: ComboboxValue[] = [
  new ComboboxValue({ value: "derp", label: "DERP" }),
  new ComboboxValue({ value: "nat-traversal", label: "NAT Traversal" }),
  new ComboboxValue({ value: "magicdns", label: "MagicDNS" }),
  new ComboboxValue({ value: "subnet-router", label: "Subnet Router" }),
  new ComboboxValue({ value: "acls", label: "ACLs" }),
]

const StatefulMultiSelectCombobox = (
  props: React.ComponentProps<typeof MultiSelectCombobox>
) => {
  const [selectedItems, setSelectedItems] = React.useState(
    props.selectedItems || []
  )
  const [values, setValues] = React.useState(props.values)

  return (
    <MultiSelectCombobox
      {...props}
      values={values}
      selectedItems={selectedItems}
      onSelectedItemsChanged={(newItems) => {
        setSelectedItems(newItems)
        props.onSelectedItemsChanged(newItems)
      }}
      onItemCreated={(item) => {
        setValues((oldValues) => [...oldValues, item])
        props.onItemCreated?.(item)
      }}
    />
  )
}

export const Default: Story = {
  render: (args) => (
    <FormField label="Features">
      <StatefulMultiSelectCombobox {...args} />
    </FormField>
  ),
  args: {
    values: sampleValues,
    selectedItems: [],
    placeholder: "Select features",
    onSelectedItemsChanged: () => {},
  },
}

export const WithInitialValue: Story = {
  render: (args) => (
    <FormField label="Features">
      <StatefulMultiSelectCombobox {...args} />
    </FormField>
  ),
  args: {
    values: sampleValues,
    selectedItems: [sampleValues[2], sampleValues[3]],
    placeholder: "Select features",
    onSelectedItemsChanged: () => {},
  },
}

export const WithItemCreation: Story = {
  render: (args) => (
    <FormField label="Features">
      <StatefulMultiSelectCombobox {...args} />
    </FormField>
  ),
  args: {
    values: sampleValues,
    selectedItems: [],
    placeholder: "Select or create features",
    addHint: "Add",
    onItemCreated: () => {},
    onSelectedItemsChanged: () => {},
  },
}

export const WithSearchIcon: Story = {
  render: (args) => (
    <FormField label="Features">
      <StatefulMultiSelectCombobox {...args} />
    </FormField>
  ),
  args: {
    values: sampleValues,
    selectedItems: [],
    placeholder: "Search for features",
    withSearchIcon: true,
    onSelectedItemsChanged: () => {},
  },
}

export const WithoutLeftBorder: Story = {
  render: (args) => (
    <FormField label="Features">
      <StatefulMultiSelectCombobox {...args} />
    </FormField>
  ),
  args: {
    values: sampleValues,
    selectedItems: [],
    placeholder: "Select features",
    withoutLeftBorder: true,
    onSelectedItemsChanged: () => {},
  },
}
