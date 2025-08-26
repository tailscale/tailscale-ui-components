import cx from "classnames"
import { useCombobox } from "downshift"
import React, { useEffect, useState } from "react"
import { ChevronDown } from "../../icons"
import { ComboboxValue } from "./types"

/**
 * A combobox component that allows users to select a value from a list of options.
 * It supports filtering and displays a dropdown menu with the available options.
 *
 * note: meant for use inside a FormField component
 */
export default function Combobox({
  values,
  initialSelectedItem,
  placeholder,
  hasError,
  onUpdate,
  withoutLeftBorder,
}: {
  values: ComboboxValue[]
  initialSelectedItem?: ComboboxValue
  placeholder?: string
  hasError?: boolean
  onUpdate: (value?: string) => void
  withoutLeftBorder?: boolean
}) {
  const [inputValue, setInputValue] = useState(initialSelectedItem?.value || "")
  const [filterValue, setFilterValue] = useState("")
  const [filteredItems, setFilteredItems] = useState(values)

  useEffect(() => {
    const filterValues = (inputValue: string) => {
      return values.filter((item) => {
        return item.includesIgnoreCase(inputValue)
      })
    }

    setFilteredItems(filterValues(filterValue || ""))
  }, [filterValue, values])

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    setHighlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    itemToString(item) {
      return item?.displayLabel() || ""
    },
    onInputValueChange({ inputValue }) {
      setInputValue(inputValue)
      onUpdate(inputValue)
    },
    stateReducer(_, actionAndChanges) {
      const { changes, type } = actionAndChanges

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:
        case useCombobox.stateChangeTypes.InputBlur:
          setFilterValue("")
          return {
            ...changes,
            highlightedIndex: values.findIndex((value) =>
              value.equalsIgnoreCase(changes.selectedItem?.displayLabel() || "")
            ),
          }
        case useCombobox.stateChangeTypes.InputChange:
          setFilterValue(changes.inputValue || "")
          // Highlight / select the first matching element in the list if we
          // have a non-empty input value. This allows for tab or enter to
          // select the item.
          if (changes.inputValue !== "") {
            setHighlightedIndex(0)
          }
          return changes
        default:
          return changes
      }
    },
    items: filteredItems,
    inputValue: inputValue,
    initialSelectedItem: initialSelectedItem,
    initialHighlightedIndex: initialSelectedItem
      ? values.findIndex((value) =>
          value.equalsIgnoreCase(initialSelectedItem.displayLabel())
        )
      : undefined,
  })

  return (
    <div className="relative flex-1">
      <div
        className={cx(
          "flex flex-row rounded-md border ml-[-1px] border-border-interactive hover:border-border-interactive-hover",
          "focus-within:outline focus-within:outline-2 focus-within:outline-outline-focus sm:flex-shrink",
          {
            "outline input-error": hasError,
            "rounded-l-none": withoutLeftBorder,
          }
        )}
      >
        <div className="flex flex-row items-center flex-wrap self-stretch flex-grow flex-shrink mt-[0.3125rem]">
          <input
            type="text"
            className={cx(
              "input !border-none flex-shrink flex-grow mr-0 min-w-0 w-9 focus:outline-none h-6 mb-[0.3125rem] text-sm"
            )}
            placeholder={placeholder}
            {...getInputProps({
              onChange: (e) => {
                setInputValue(e.currentTarget.value)
                onUpdate(e.currentTarget.value)
              },
            })}
          />
        </div>

        {filteredItems.length > 0 && (
          <button
            aria-label="toggle menu"
            {...getToggleButtonProps()}
            tabIndex={-1}
          >
            <ChevronDown className="text-text-muted w-4 mr-3 flex-shrink-0 flex-grow-0" />
          </button>
        )}
      </div>
      <ul
        className={`absolute w-full bg-bg-base mt-1 shadow-md rounded-b-md max-h-80 overflow-auto p-0 z-10 ${
          !(isOpen && filteredItems.length > 0) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          filteredItems.map((item, index) => (
            <li
              className={cx(
                highlightedIndex === index && "bg-bg-menu-item-hover",
                selectedItem?.equalsIgnoreCase(item.displayLabel()) &&
                  "bg-bg-menu-item-hover",
                "pt-2 pb-2 pl-4 pr-4 flex flex-col"
              )}
              key={`${item.value}${index}`}
              {...getItemProps({ item: item, index })}
            >
              {item.displayLabel()}
            </li>
          ))}
      </ul>
    </div>
  )
}
