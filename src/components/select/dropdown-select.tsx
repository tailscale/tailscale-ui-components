import React, { useEffect, useState } from "react"
import { Input } from "src/components/input/input"
import { ApplyButton } from "src/components/select/apply-button"
import { SingleSelect } from "src/components/select/single-select"
import { SelectValue } from "src/components/select/types"
import { assertNever } from "src/utils/util"

export type DropdownSelectProps = {
  values: SelectValue[]
  selected?: SelectValue
  onUpdateSelected: (selected: SelectValue) => void
}

/**
 * DropdownSelect is a picker UI component that wraps the SingleSelect
 * component with additional date/text input options after selection.
 */
export function DropdownSelect({
  values,
  selected,
  onUpdateSelected,
}: DropdownSelectProps) {
  const [tmpSelected, setTmpSelected] = useState(selected)
  const [error, setError] = useState("")

  useEffect(() => {
    setTmpSelected(selected)
    setError("")
  }, [selected])

  return (
    <div className="max-w-xs flex flex-col">
      <SingleSelect
        className="mt-3 mx-3"
        values={values}
        selected={tmpSelected}
        onUpdateSelected={(s) => {
          setTmpSelected(s)
          setError("")
        }}
        placeholder="Select…"
      />
      {tmpSelected &&
        (tmpSelected.type === "text-input" ? (
          <Input
            name="text-input"
            className="pt-3 px-3 block tabular-nums"
            type="text"
            placeholder={tmpSelected.placeholder}
            value={tmpSelected.value || ""}
            onChange={(e) =>
              setTmpSelected({ ...tmpSelected, value: e.target.value })
            }
            onBlur={(e) =>
              setError(
                tmpSelected.hasValidationError
                  ? tmpSelected.hasValidationError(e.target.value)
                  : ""
              )
            }
          />
        ) : tmpSelected.type === "date-input" ? (
          // TODO(sonia/ale): Don't use the default date input, it's ugly.
          // This isn't currently being used, but should be updated before
          // used in an actual filter.
          <Input
            name="date-input"
            className="pt-3 px-3 block tabular-nums"
            type="datetime-local"
            value={tmpSelected.value?.toUpperCase() || ""}
            onChange={(e) =>
              setTmpSelected({ ...tmpSelected, value: e.target.value })
            }
          />
        ) : tmpSelected.type === "string-constant" ? null : (
          assertNever(tmpSelected)
        ))}
      {error && (
        <div className="mt-2 mx-3 text-text-danger text-sm">{error}</div>
      )}
      <ApplyButton
        onClick={() =>
          tmpSelected ? onUpdateSelected(tmpSelected) : undefined
        }
        disabled={
          error !== "" || !tmpSelected?.value || tmpSelected === selected
        }
      />
    </div>
  )
}
