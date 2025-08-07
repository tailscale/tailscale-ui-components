import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import cx from "classnames"
import React from "react"
import { Badge } from "src/components/badge/badge"
import { Button } from "src/components/button/button"
import { Check, ChevronDown } from "src/icons"


type MultiSelectProps = {
  title: string
  items: SelectItem[]
  multiselect: boolean
  disabled?: boolean
  sizeVariant?: MultiselectSizeVariant

  selectedValues: string[]
  updateSelectedValues: (nextSelectedValues: string[]) => void
}

type CheckedState = boolean | "indeterminate"

export type MultiselectSizeVariant =
  | "input"
  | "small"
  | "medium"
  | "large"
  | undefined

export type SelectItem = {
  value: string
  display?: string // used as item text when provided; otherwise `value` is used
  count?: number
  left?: JSX.Element // optional component to display next to item text
}

/**
 * MultiSelect is UI component that allows users to toggle selection
 * from a list of items. This component does not control state internally.
 * Instead it calls `updateSelectedValues` on item selection to allow the
 * caller to manage the change to `selectedValues`.
 */
export function MultiSelect(props: MultiSelectProps) {
  const {
    title,
    items,
    multiselect,
    sizeVariant = "medium",
    disabled: buttonDisabled = false,
    selectedValues,
    updateSelectedValues,
  } = props

  const onSetSelection = (item: string) => (selected: CheckedState) => {
    let nextSelection: string[]
    if (!selected) {
      nextSelection = selectedValues.filter((i) => i !== item)
    } else {
      nextSelection = multiselect ? [...selectedValues, item] : [item]
    }
    updateSelectedValues(nextSelection)
  }

  return (
    <DropdownMenu.Root modal>
      <DropdownMenu.Trigger asChild>
        <Button
          className="flex items-center"
          disabled={buttonDisabled || items.length === 0}
          sizeVariant={sizeVariant}
          suffixIcon={<ChevronDown />}
        >
          {title}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dropdown bg-bg-base rounded-md overflow-y-auto max-h-80 max-w-xs z-50"
          sideOffset={10}
        >
          {items.map((item, i) => (
            <MultiSelectItem
              key={item.value}
              item={item}
              selected={selectedValues.includes(item.value)}
              setSelection={onSetSelection(item.value)}
              isLastItem={i === items.length - 1}
            />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

function MultiSelectItem(props: {
  item: SelectItem
  selected: boolean
  setSelection: (selected: CheckedState) => void
  isLastItem: boolean
}) {
  const { item, selected, setSelection, isLastItem } = props

  const dropdownMenuItemInteractiveClasses = "cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover"

  return (
    <DropdownMenu.CheckboxItem
      className={cx(dropdownMenuItemInteractiveClasses, {
        "border-b": !isLastItem,
      })}
      checked={selected}
      onCheckedChange={setSelection}
      aria-label={`Filter by ${item.display || item.value}`}
    >
      <div className="h-full w-full flex justify-between items-center p-4 md:px-3 md:py-2">
        <div className="w-6">
          <DropdownMenu.ItemIndicator className="w-6">
            <Check size={16} />
          </DropdownMenu.ItemIndicator>
        </div>
        <div className="flex-1 flex truncate">
          {item.left}
          {item.display || item.value}
        </div>
        {item.count !== undefined && (
          <Badge variant="status" color="blue" className="text-xs ml-4">
            {item.count}
          </Badge>
        )}
      </div>
    </DropdownMenu.CheckboxItem>
  )
}
