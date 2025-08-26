import React, { InputHTMLAttributes, useCallback, useEffect } from "react"
import useDebounce from "../hooks/debounce"
import { Input } from "../input/input"
import { isValidEmail } from "../utils/validators"

/**
 * EmailInput component provides a text input for entering multiple
 * comma-separated email addresses.
 *
 * The component handles passing the inputted emails back to the parent,
 * as well as doing validation against the values being valid email addresses
 * and (optionally) restricted to provided domains.
 */
export type EmailInputProps = {
  /**
   * restrictToDomains provides the option to optionally restrict to provided
   * email domains. Domains are expected to be provided lowercase.
   *
   * When included, if emails are entered that are not within one of these
   * domains, they will be passed back in `setEmails` in the `invalidEmails`
   * list.
   */
  restrictToDomains?: string[]
  /**
   * setEmails is a callback to update the parent with the list of entered
   * emails. This is called each time on input blur and 500s after the last
   * keystroke.
   *
   * `validEmails` will be sent as the list of valid email addresses that were
   * entered by the user.
   *
   * `invalidEmails` will be sent as the list of strings entered that do not
   * match valid email format.
   */
  setEmails: (validEmails: string[], invalidEmails: string[]) => void
} & InputHTMLAttributes<HTMLInputElement>

/**
 * EmailInput component provides a text input for entering multiple
 * comma-separated email addresses.
 *
 * The component handles passing the inputted emails back to the parent,
 * as well as doing validation against the values being valid email addresses
 * and (optionally) restricted to provided domains.
 */
export function EmailInput({
  restrictToDomains,
  setEmails,
  value,
  onChange,
  ...rest
}: EmailInputProps) {
  const [inputValue, setInputValue] = React.useState(value || "")
  useEffect(() => setInputValue(value || ""), [value])
  const debouncedValue = useDebounce(inputValue, 500)

  const validateInput = useCallback(
    (input: string) => {
      var validEmails: string[] = []
      var invalidEmails: string[] = []

      input
        .replaceAll(" ", "")
        .split(",")
        .map((e) => e.toLowerCase())
        /**
         * Filter out duplicates.
         */
        .filter((email, index, arr) => arr.indexOf(email) === index)
        /**
         * Separate into valid vs invalid emails.
         */
        .forEach((email) => {
          if (email === "") {
            return
          }
          if (!isValidEmail(email)) {
            invalidEmails = invalidEmails.concat(email)
            return
          }
          if (restrictToDomains) {
            /**
             * We've already checked it's a valid email above,
             * so safe to directly index to [1].
             */
            var domain = email.split("@")[1]
            if (!restrictToDomains.includes(domain)) {
              invalidEmails = invalidEmails.concat(email)
              return
            }
          }
          validEmails = validEmails.concat(email)
        })

      setEmails(validEmails, invalidEmails)
    },
    [restrictToDomains, setEmails]
  )

  useEffect(
    () => validateInput(debouncedValue),
    [debouncedValue, validateInput]
  )

  return (
    <Input
      value={inputValue}
      onChange={(e) => {
        setInputValue(e.target.value)
        onChange && onChange(e)
      }}
      onBlur={(e) => validateInput(e.target.value)}
      {...rest}
    />
  )
}
