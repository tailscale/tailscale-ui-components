import cx from "classnames"
import {
  GetPropsCommonOptions,
  useCombobox,
  UseComboboxGetItemPropsOptions,
  UseComboboxGetMenuPropsOptions,
  useMultipleSelection,
  UseMultipleSelectionGetSelectedItemPropsOptions,
} from "downshift"
import React, { useEffect, useRef, useState } from "react"
import { ChevronDown, Search } from "../../icons"
import { ComboboxValue } from "./types"

/**
 * ValueWithAddHint extends ComboboxValue for internal usage by the MultiSelectCombobox component for tracking values that should have an
 * "add hint" associated with them - a value that is rendered next to the dropdown item to indicate that the item does not exist in the
 * dropdown list and will instead be added.
 *
 * addHint - a string value used as an additional "hint" label rendered next to the regular combo box value.
 */
// TODO(mpminardi): determine if we need to use this in singular combobox / extract it into types.
class ValueWithAddHint<T> extends ComboboxValue {
  readonly addHint?: string

  constructor({
    value,
    label,
    data,
    addHint,
  }: {
    value: string
    label?: string
    data?: T
    addHint?: string
  }) {
    super({ value: value, label: label, data: data })
    this.addHint = addHint
  }
}

/**
 * A combobox component that allows users to select multiple values from a list of options.
 * It supports filtering and displays a dropdown menu with the available options.
 *
 * note: meant for use inside a FormField component
 */
export default function MultiSelectCombobox({
  values,
  selectedItems,
  onItemCreated,
  onSelectedItemsChanged,
  placeholder,
  hideSelectedItems,
  renderItem,
  addHint,
  withoutLeftBorder,
  withSearchIcon,
}: {
  values: ComboboxValue[]
  selectedItems: ComboboxValue[]
  onItemCreated?: (item: ComboboxValue) => void
  onSelectedItemsChanged: (newItems: ComboboxValue[]) => void
  placeholder?: string
  hideSelectedItems?: boolean
  renderItem?: (item: ComboboxValue) => JSX.Element
  addHint?: string
  withoutLeftBorder?: boolean
  withSearchIcon?: boolean
}) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [filteredValues, setFilteredValues] = useState(values)

  // TODO(mpminardi): potentially look at using fuse here if this "simple" filtering
  // does not seem sufficient.
  useEffect(() => {
    const filterValues = (
      selectedItems: ComboboxValue[],
      inputValue: string
    ) => {
      return values.filter((item) => {
        return (
          !selectedItems.some((val) => val.value === item.value) &&
          item.includesIgnoreCase(inputValue)
        )
      })
    }

    setFilteredValues(filterValues(selectedItems, inputValue))
  }, [inputValue, selectedItems, values])

  const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
    useMultipleSelection({
      selectedItems,
      onStateChange({ selectedItems: newSelectedItems, type }) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes
            .SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
            onSelectedItemsChanged(newSelectedItems || [])
            break
          default:
            break
        }
      },
    })
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    setHighlightedIndex,
    getItemProps,
    getToggleButtonProps,
  } = useCombobox({
    items: filteredValues,
    itemToString(item) {
      return item?.displayLabel() || ""
    },
    // We want this unset so that we do not end up in a cycle where items are
    // repeatedly selected / added from lists when tabbing. This is the same as
    // not specifying this index at all, but it is explicitly unset here to
    // reduce chances of future regression.
    defaultHighlightedIndex: undefined,
    defaultIsOpen: false,
    selectedItem: null,
    inputValue,
    onStateChange({
      inputValue: newInputValue,
      type,
      selectedItem: newSelectedItem,
    }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            onSelectedItemsChanged([...selectedItems, newSelectedItem])
            if (!values.includes(newSelectedItem)) {
              onItemCreated?.(newSelectedItem)
              setFilteredValues(values)
            }
            setInputValue("")
          }
          break
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue || "")
          // Highlight / select the first matching element in the list if we
          // have a non-empty input value. This allows for tab or enter to
          // select the item.
          if (newInputValue !== "") {
            setHighlightedIndex(0)
          }
          break
        default:
          break
      }
    },
  })

  // TODO(mpminardi): clean this up / potentially pull some of the CSS into semantic
  // classes in our tailwind.css
  const focusWithin =
    "focus-within:visible-focus focus-within:outline-offset-0 focus-within:border-border-focus"

  return (
    <div
      ref={containerRef}
      className="relative"
      onClick={() => {
        inputRef.current?.focus()
      }}
    >
      <div
        className={cx(
          focusWithin,
          "flex flex-row rounded-md border border-border-interactive hover:border-border-interactive-hover",
          {
            "rounded-l-none": withoutLeftBorder,
          }
        )}
      >
        {withSearchIcon && (
          <Search
            className="text-text-disabled mx-2 mt-2 flex-shrink-0 flex-grow-0"
            size="1.25em"
          />
        )}
        <div
          className={cx(
            "flex flex-row items-center flex-wrap self-stretch flex-grow flex-shrink mt-[0.3125rem]",
            {
              "ml-[0.5625rem]": !withSearchIcon,
            }
          )}
        >
          {hideSelectedItems ? (
            <></>
          ) : (
            selectedItems.map((item, index) => (
              <Pill
                selectedItem={item}
                index={index}
                getSelectedItemProps={getSelectedItemProps}
                removeSelectedItem={removeSelectedItem}
                key={`selected-item-${index}`}
              />
            ))
          )}

          <input
            type="text"
            className={cx(
              "input !border-none flex-shrink flex-grow mr-0 pl-1 min-w-0 w-9 focus:outline-none h-6 mb-[0.3125rem] text-sm"
            )}
            placeholder={selectedItems.length > 0 ? "" : placeholder}
            {...getInputProps(getDropdownProps({ ref: inputRef }))}
          />
        </div>
        <button aria-label="toggle menu" {...getToggleButtonProps()}>
          <ChevronDown className="text-text-muted w-4 mr-3 mt-0.5 flex-shrink-0 flex-grow-0" />
        </button>
      </div>
      <DropdownMenu
        inputItems={filteredValues}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        getMenuProps={getMenuProps}
        getItemProps={getItemProps}
        renderItem={renderItem}
        inputValue={inputValue}
        addHint={addHint}
        allowCreate={onItemCreated !== undefined}
        containerRef={containerRef}
      />
    </div>
  )
}

function Pill({
  selectedItem,
  index,
  getSelectedItemProps,
  removeSelectedItem,
}: {
  selectedItem: ComboboxValue
  index: number
  getSelectedItemProps: (
    options: UseMultipleSelectionGetSelectedItemPropsOptions<ComboboxValue>
  ) => any
  removeSelectedItem: (item: ComboboxValue) => void
}) {
  // TODO(mpminardi): look into potentially using a <Badge> here instead
  return (
    <span
      className="bg-gray-100 dark:bg-gray-800 rounded-md pr-1 pl-2 py-1 flex-shrink-0 flex-grow-0 mb-[0.3125rem] text-xs mx-[0.1875rem]"
      key={`selected-item-${index}`}
      {...getSelectedItemProps({
        selectedItem: selectedItem,
        index,
      })}
    >
      {selectedItem.displayLabel()}
      <span
        className="px-1 cursor-pointer text-text-disabled"
        onClick={(e) => {
          e.stopPropagation()
          removeSelectedItem(selectedItem)
        }}
      >
        &#10005;
      </span>
    </span>
  )
}

function DropdownMenu({
  inputItems,
  highlightedIndex,
  isOpen,
  getMenuProps,
  getItemProps,
  renderItem,
  inputValue,
  addHint,
  allowCreate,
  containerRef,
}: {
  inputItems: ComboboxValue[]
  highlightedIndex: number
  isOpen: boolean
  getMenuProps: (
    options?: UseComboboxGetMenuPropsOptions,
    otherOptions?: GetPropsCommonOptions
  ) => any
  getItemProps: (options: UseComboboxGetItemPropsOptions<ComboboxValue>) => any
  renderItem?: (item: ComboboxValue) => JSX.Element
  inputValue: string
  addHint?: string
  allowCreate: boolean
  containerRef: React.RefObject<HTMLDivElement>
}) {
  useEffect(() => {
    if (!containerRef.current) return

    // Force parent containers to allow overflow when dropdown is open
    const modifiedElements: {
      element: HTMLElement
      originalOverflow: string
    }[] = []

    if (isOpen) {
      let element = containerRef.current.parentElement

      // Traverse up the DOM tree and modify overflow styles
      while (element && element !== document.body) {
        // Store original overflow value
        modifiedElements.push({
          element,
          originalOverflow:
            element.style.overflow || getComputedStyle(element).overflow,
        })
        // Force overflow visible
        element.style.overflow = "visible"
        element = element.parentElement
      }
    }

    // Cleanup function to restore original overflow values
    return () => {
      modifiedElements.forEach(({ element, originalOverflow }) => {
        element.style.overflow =
          originalOverflow === "visible" ? "" : originalOverflow
      })
    }
  }, [isOpen, containerRef])

  if (allowCreate) {
    const appendInput =
      !!inputValue &&
      !inputItems.some((item) => item.equalsIgnoreCase(inputValue))
    if (appendInput) {
      inputItems.unshift(
        new ValueWithAddHint({ value: inputValue, addHint: addHint })
      )
    }
  }

  return (
    <div className="bg-bg-base overflow-auto rounded-b-md -mt-[1px]">
      <ul
        className={`absolute w-full bg-bg-base mt-1 shadow-md rounded-b-md max-h-80 overflow-auto p-0 z-[9999] ${
          !(isOpen && inputItems.length > 0) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              className={cx(
                highlightedIndex === index && "bg-bg-menu-item-hover",
                "py-2 px-3 flex flex-col"
              )}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              {renderItem ? (
                renderItem(item)
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-sm">{item.displayLabel()}</span>
                  {index === 0 &&
                    inputValue &&
                    item instanceof ValueWithAddHint && (
                      <span className="text-xs text-text-disabled float-right">
                        {item.addHint}
                      </span>
                    )}
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}
