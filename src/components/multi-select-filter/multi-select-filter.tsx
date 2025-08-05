import React, { useMemo } from "react"
import {
  deserializeFilterInQuery,
  FilterPrefix,
  serializeFilterInQuery,
} from "src/hooks/filter-search"
import {
  MultiSelect,
  MultiselectSizeVariant,
  SelectItem,
} from "src/components/multi-select/multi-select"

type FilterMultiSelectProps = {
  title: string
  items: SelectItem[]
  multiselect?: boolean // default false
  disabled?: boolean // default false
  sizeVariant?: MultiselectSizeVariant

  query: string
  filterPrefix: FilterPrefix
  updateQuery: (nextQuery: string) => void
}

/**
 * deserializeQuery finds the subset of `items` that are included
 * in `query`. These should be displayed as the currently selected
 * items in the select UI.
 */
function deserializeQuery(
  query: string,
  filterPrefix: FilterPrefix,
  items: SelectItem[],
  multiselect: boolean
): string[] {
  const queryArgs = new Set(
    deserializeFilterInQuery(query, filterPrefix).map((arg) =>
      arg.toLowerCase()
    )
  )
  let selectedItems = items
    .map((item) => item.value)
    .filter((item) => queryArgs.has(item.toLowerCase()))

  if (selectedItems.length > 1 && !multiselect) {
    // When more than one item is selected for a single-select filter,
    // the terms cancel each other out, so we zero out the selection.
    // We should later enforce that a single-select filter could never
    // get in this state from useURLAwareSearch.
    selectedItems = []
  }
  return selectedItems
}

/**
 * serializeQuery does the opposite of deserializeQuery. It takes an
 * array of the `selectedItems` from the select UI and returns the
 * modified `query` that filters to these items.
 */
function serializeQuery(
  query: string,
  filterPrefix: FilterPrefix,
  selectedItems: string[]
): string {
  return serializeFilterInQuery(query, filterPrefix, selectedItems)
}

/**
 * FilterMultiSelect is UI component that displays the current selection state
 * of a param filter type (`filterPrefix` eg. "type" or "owner") defined in
 * `query`. Changing selection from this component writes back to `query` by
 * calling `updateQuery`.
 */
export default function FilterMultiSelect(props: FilterMultiSelectProps) {
  const {
    title,
    items,
    query,
    disabled,
    filterPrefix,
    sizeVariant,
    updateQuery,
    multiselect = false,
  } = props

  // Deserialize selectedItems from query.
  const selectedItems = useMemo(
    () => deserializeQuery(query, filterPrefix, items, multiselect),
    [query, filterPrefix, items, multiselect]
  )

  const onUpdateSelection = (nextSelectedItems: string[]) => {
    // Serialize nextSelection into query.
    updateQuery(serializeQuery(query, filterPrefix, nextSelectedItems))
  }

  return (
    <MultiSelect
      title={title}
      items={items}
      multiselect={multiselect}
      disabled={disabled}
      selectedValues={selectedItems}
      updateSelectedValues={onUpdateSelection}
      sizeVariant={sizeVariant}
    />
  )
}
