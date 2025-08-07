export type SelectValue = StringConstantValue | TextInputValue | DateInputValue

export type StringConstantValue = {
  type: "string-constant"
  label: string
  value: string
}

export type TextInputValue = {
  type: "text-input"
  label: string
  prefix?: string // used for URL filters
  // value, when set, is used as the default input value
  // presented when this item is chosen in the dropdown.
  value?: string
  placeholder?: string

  // hasValidationError, when set, is used to verify that
  // input is valid before allowing a user to "Apply" the
  // value.
  // If a non-empty string is reported, it is displayed
  // as an error to the user.
  hasValidationError?: (raw: string) => string
}

export type DateInputValue = {
  type: "date-input"
  label: string
  prefix?: string // used for URL filters
  // value, when set, is used as the default input value
  // presented when this item is chosen in the dropdown.
  value?: string // format "yyyy-MM-ddThh:mm"
}
