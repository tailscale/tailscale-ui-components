import { Meta, StoryFn } from "@storybook/react"
import React, { useState } from "react"
import { SelectItem } from "../multi-select/multi-select"
import FilterMultiSelect from "./multi-select-filter"

export default {
  title: "components/FilterMultiSelect",
  component: FilterMultiSelect,
  argTypes: {
    updateQuery: { action: "updated" },
  },
} as Meta<typeof FilterMultiSelect>

const Template: StoryFn<typeof FilterMultiSelect> = (args) => {
  const [query, setQuery] = useState<string>(args.query)

  return (
    <div className="w-80">
      <FilterMultiSelect
        {...args}
        query={query}
        updateQuery={(q) => {
          args.updateQuery(q)
          setQuery(q)
        }}
      />
      <div className="mt-4 p-2 bg-gray-100 rounded">
        <p className="text-sm font-mono">Query: {query}</p>
      </div>
    </div>
  )
}

const items: SelectItem[] = [
  { value: "derp", display: "DERP" },
  { value: "nat-traversal", display: "NAT Traversal" },
  { value: "magicdns", display: "MagicDNS" },
]

export const MultiSelectEnabled = Template.bind({})
MultiSelectEnabled.args = {
  title: "Feature",
  items: items,
  multiselect: true,
  filterPrefix: "feature",
  query: "feature:derp feature:magicdns",
}

export const SingleSelect = Template.bind({})
SingleSelect.args = {
  title: "Feature",
  items: items,
  multiselect: false,
  filterPrefix: "feature",
  query: "feature:derp",
}

export const Disabled = Template.bind({})
Disabled.args = {
  title: "Feature",
  items: items,
  multiselect: true,
  filterPrefix: "feature",
  query: "feature:derp",
  disabled: true,
}

export const Empty = Template.bind({})
Empty.args = {
  title: "Feature",
  items: [],
  multiselect: true,
  filterPrefix: "feature",
  query: "",
}
