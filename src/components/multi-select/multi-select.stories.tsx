import { Meta, StoryFn } from "@storybook/react"
import React, { useState } from "react"
import { Database, User } from "../../icons"
import { MultiSelect, SelectItem } from "./multi-select"

export default {
  title: "components/MultiSelect",
  component: MultiSelect,
  argTypes: {
    updateSelectedValues: { action: "updated" },
  },
} as Meta<typeof MultiSelect>

const Template: StoryFn<typeof MultiSelect> = (args) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    args.selectedValues
  )

  return (
    <div className="w-80">
      <MultiSelect
        {...args}
        selectedValues={selectedValues}
        updateSelectedValues={(v) => {
          args.updateSelectedValues(v)
          setSelectedValues(v)
        }}
      />
    </div>
  )
}

const items: SelectItem[] = [
  { value: "derp", display: "DERP" },
  { value: "nat-traversal", display: "NAT Traversal" },
  { value: "magicdns", display: "MagicDNS" },
  { value: "subnet-router", display: "Subnet Router" },
  { value: "acls", display: "ACLs" },
]

export const SingleSelect = Template.bind({})
SingleSelect.args = {
  title: "Feature",
  items: items,
  multiselect: false,
  selectedValues: ["derp"],
}

export const MultiSelectEnabled = Template.bind({})
MultiSelectEnabled.args = {
  title: "Feature",
  items: items,
  multiselect: true,
  selectedValues: ["derp", "magicdns"],
}

const itemsWithCounts: SelectItem[] = [
  { value: "derp", display: "DERP", count: 10 },
  { value: "nat-traversal", display: "NAT Traversal", count: 5 },
  { value: "magicdns", display: "MagicDNS", count: 2 },
  { value: "subnet-router", display: "Subnet Router", count: 8 },
  { value: "acls", display: "ACLs", count: 12 },
]

export const WithCounts = Template.bind({})
WithCounts.args = {
  title: "Feature",
  items: itemsWithCounts,
  multiselect: true,
  selectedValues: ["derp"],
}

const itemsWithIcons: SelectItem[] = [
  {
    value: "database",
    display: "Database",
    left: <Database className="mr-2" />,
  },
  { value: "user", display: "User", left: <User className="mr-2" /> },
]

export const WithIcons = Template.bind({})
WithIcons.args = {
  title: "Icons",
  items: itemsWithIcons,
  multiselect: true,
  selectedValues: [],
}

export const Disabled = Template.bind({})
Disabled.args = {
  title: "Feature",
  items: items,
  multiselect: true,
  selectedValues: ["derp"],
  disabled: true,
}

export const Small = Template.bind({})
Small.args = {
  title: "Feature",
  items: items,
  multiselect: true,
  selectedValues: [],
  sizeVariant: "small",
}

export const Empty = Template.bind({})
Empty.args = {
  title: "Feature",
  items: [],
  multiselect: true,
  selectedValues: [],
}
