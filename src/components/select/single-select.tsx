import * as SelectPrimitive from "@radix-ui/react-select"
import cx from "classnames"
import React, {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useState,
} from "react"
import { Check, ChevronDown } from "../../icons"
import { Button } from "../button/button"
import { SelectValue, StringConstantValue } from "./types"

/**
 * SingleSelect is a picker UI component.
 *
 * The component renders a trigger that opens a Portal with the
 * selection option on press.
 */
export function SingleSelect({
  className,
  values,
  selected,
  onUpdateSelected,
  placeholder,
  children,
  disabled,
  variant,
  asPopper,
  withoutIndicator,
}: {
  className?: string
  values: SelectValue[]
  selected?: SelectValue
  onUpdateSelected: (selected: SelectValue) => void
  placeholder?: string
  children?: ReactNode
  disabled?: boolean
  variant?: ComponentPropsWithoutRef<typeof Button>["variant"]
  asPopper?: boolean
  withoutIndicator?: boolean
}) {
  // TODO(sonia): This is a temporary hack to get around the open radix
  // select reset bug: https://github.com/radix-ui/primitives/issues/1569
  //
  // When the selected item is removed, we must explicitly set the selection
  // to the empty string, since an undefined value doesn't clear the current
  // selection, as reported in the above bug.
  // The initial value is set as `selected?.label` directly so the placeholder
  // is picked up before any selection has been made.
  //
  // Once the above bug has been resolved, this extra state can be removed,
  // and `selected?.label` passed into `value` directly on `SelectPrimitive.Root`.
  const [value, setValue] = useState(selected?.label)
  useEffect(() => {
    setValue((o) => (selected?.label !== o ? selected?.label || "" : o))
  }, [selected?.label])

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={(v) => {
        const s = values.find((item) => item.label === v)
        if (s) {
          onUpdateSelected(s)
        }
      }}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger className={className} asChild>
        {children ? (
          <button>
            <SelectPrimitive.Value asChild>{children}</SelectPrimitive.Value>
          </button>
        ) : (
          <Button
            className="flex min-w-[180px]"
            textAlign="left"
            variant={variant}
            suffixIcon={<ChevronDown className="text-text-muted" />}
          >
            <div className="truncate">
              <SelectPrimitive.Value placeholder={placeholder} />
            </div>
          </Button>
        )}
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cx(
            "dropdown rounded-md bg-bg-base max-w-lg overflow-hidden z-50 text-sm",
            {
              "radix-select-full-width": asPopper,
            }
          )}
          position={asPopper ? "popper" : "item-aligned"}
        >
          <SelectPrimitive.Viewport>
            {values.map(({ label }) => (
              <SelectPrimitive.Item
                className={selectItemClasses}
                key={label}
                value={label}
              >
                {!withoutIndicator && (
                  <div className="w-6 ml-2 mr-1">
                    <SelectPrimitive.ItemIndicator>
                      <Check
                        size="1em"
                        strokeWidth="2.2"
                        className="text-text-muted"
                      />
                    </SelectPrimitive.ItemIndicator>
                  </div>
                )}
                <SelectPrimitive.ItemText className="!text-sm">
                  {label}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

/**
 * InlineSingleSelect is a picker UI component that is not contained
 * in a dropdown. It mirrors the contents within the Portal of the
 * SingleSelect component.
 */
export function InlineSingleSelect({
  values,
  selected,
  onUpdateSelected,
}: {
  values: StringConstantValue[]
  selected?: StringConstantValue
  onUpdateSelected: (selected: StringConstantValue) => void
}) {
  return (
    <div>
      {values.map((v) => (
        <button
          className={cx("w-full", selectItemClasses)}
          key={v.value}
          value={v.value}
          onClick={() => onUpdateSelected(v)}
        >
          <div className="w-6 ml-2 mr-1">
            {selected?.value === v.value && (
              <Check size="1em" strokeWidth="2.2" className="text-text-muted" />
            )}
          </div>
          <div>{v.label}</div>
        </button>
      ))}
    </div>
  )
}

const dropdownMenuItemClasses = "block px-4 py-2"
const dropdownMenuItemInteractiveClasses =
  "cursor-pointer hover:enabled:bg-bg-menu-item-hover focus:outline-none focus:bg-bg-menu-item-hover"
export const selectItemClasses = `${dropdownMenuItemClasses} ${dropdownMenuItemInteractiveClasses} flex items-center select-none`
