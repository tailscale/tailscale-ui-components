import cx from "classnames"
import { useCombobox, useMultipleSelection } from "downshift"
import React, { useCallback, useEffect, useState } from "react"
import { Checkbox } from "src/components/checkbox/checkbox"
import { ApplyButton } from "src/components/select/apply-button"
import { StringConstantValue } from "src/components/select/types"
import { Search } from "src/icons"
import { isArrayEqual } from "src/utils/util"

export type CheckboxSelectProps = {
  label: string
  values: StringConstantValue[]
  selected?: StringConstantValue[]
  onUpdateSelected: (selected: StringConstantValue[]) => void
  searchClassName?: string
}

/**
 * CheckboxSelect is a multiselect UI component.
 */
export function CheckboxSelect({
  label,
  values,
  selected,
  onUpdateSelected,
  searchClassName,
}: CheckboxSelectProps) {
  const [searchString, setSearchString] = useState("")
  const [filteredValues, setFilteredValues] = useState(values)
  const [hasChanged, setHasChanged] = useState(false)

  const {
    addSelectedItem,
    removeSelectedItem,
    getDropdownProps,
    selectedItems,
  } = useMultipleSelection({
    initialSelectedItems: selected || [],
  })

  const filterFunction = useCallback(
    (search: string) =>
      values.filter((v) => v.label.toLowerCase().includes(search)),
    [values]
  )

  const { getMenuProps, getInputProps, getItemProps } = useCombobox({
    inputValue: searchString,
    items: filterFunction(searchString.toLowerCase()),
  })

  useEffect(() => {
    setHasChanged(!isArrayEqual(selected || [], selectedItems))
  }, [selectedItems, selected])

  const changeInputString = (inputValue: string) => {
    inputValue = inputValue.toLowerCase()
    setSearchString(inputValue)
    setFilteredValues(filterFunction(inputValue))
  }

  // handleKeyDown allows selecting and deselecting checklist items
  // using the Enter key, and allows for the updated selection list
  // to be applied with Cmd/Ctrl+Enter
  const handleKeydown = (
    selectedItem: StringConstantValue,
    e: React.KeyboardEvent<HTMLElement>
  ) => {
    if (e.key !== "Enter") return

    if (e.metaKey === true) {
      onUpdateSelected(selectedItems)
    } else {
      toggleSelect(selectedItem)
    }
  }

  const toggleSelect = (item: StringConstantValue) => {
    if (selectedItems.includes(item)) {
      removeSelectedItem(item)
    } else {
      addSelectedItem(item)
    }
  }

  return (
    <div className="rounded-md bg-bg-base max-w-xs">
      <div className="flex items-center border-b">
        <div className="relative w-full p-0.5">
          <input
            type="text"
            aria-label={`Search ${label}...`}
            className={cx(
              "pl-10 h-10 w-full bg-bg-base rounded-b-none input border-0",
              searchClassName
            )}
            placeholder={`Search ${label}...`}
            {...getInputProps(
              getDropdownProps({
                onChange: (e: any) => changeInputString(e.target.value),
              })
            )}
          />
          <Search
            size={20}
            className="inline-block text-text-muted mr-2 absolute left-3 top-3"
          />
        </div>
      </div>
      <div className="bg-bg-base overflow-hidden rounded-b-md">
        <ul
          className={cx("max-h-[14rem] overflow-y-auto")}
          tabIndex={-1}
          {...getMenuProps()}
        >
          {filteredValues.length === 0 ? (
            <p className="text-text-disabled p-3">No results</p>
          ) : (
            filteredValues.map((v, index) => (
              <li
                className="flex px-3 py-2 hover:bg-bg-menu-item-hover"
                key={`select-item-${index}`}
                onClick={(e) => {
                  // Only look at clicks that happen directly on the list item.
                  // Items within it also have click handlers that toggle, and
                  // we want to avoid toggling twice.
                  if (e.target === e.currentTarget) {
                    toggleSelect(v)
                  }
                }}
              >
                <Checkbox
                  checked={selectedItems.includes(v)}
                  label={v.label}
                  {...getItemProps({
                    index,
                    item: v,
                    onChange: () => toggleSelect(v),
                    onKeyDown: (e) => handleKeydown(v, e),
                  })}
                />
              </li>
            ))
          )}
        </ul>
        {filteredValues.length > 0 && (
          <ApplyButton
            className="border-t"
            onClick={() => onUpdateSelected(selectedItems)}
            disabled={!hasChanged}
          />
        )}
      </div>
    </div>
  )
}
