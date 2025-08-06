import cx from "classnames"
import React, { Children, cloneElement, isValidElement, useId } from "react"

/**
 * FormField is a component for wrapping an input in standard form text: a
 * label, a description, help text, and an error message.
 */
export default function FormField({
  id: idProp,
  className,
  sideElement,
  label,
  description,
  help,
  children,
  error,
}: {
  /**
   * className is an optional class name to add to the root element.
   */
  className?: string
  /**
   * id is the id of the input. If not provided, a unique id will be generated.
   */
  id?: string
  /**
   * label is the name of the form field.
   */
  label?: React.ReactNode

  /**
   * optionality is whether the field is required or optional. By default,
   * this is undefined and shows no indicator. If more fields in the form are
   * required than optional, this should be set to "optional" to indicate the
   * exceptions. Conversely, if more fields are optional than required, this
   * should be set to "required" to indicate the exceptions.
   */
  optionality?: "required" | "optional"
  /**
   * description is optional text that lives above the input that gives extra
   * context to the label. For example, if the label is "Webhook URL", the text
   * should explain something like "Events will be sent to this URL via a POST request."
   */
  description?: React.ReactNode

  /**
   * sideElement is an optional element that appears to the right of the label.
   * This is commonly used for toggle-based fields, where they don't need to
   * occupy their own line.
   */
  sideElement?: React.ReactNode
  /**
   * children is the input element for this field.
   */
  children?: React.ReactNode
  /**
   * help is help text which appears underneath the input. It should be used to
   * describe any constraints that input imposes. For example "Only letters and
   * numbers are allowed."
   *
   * When an error occurs, this text is replaced with the error text.
   */
  help?: React.ReactNode
  error?: React.ReactNode
}) {
  const id = useId()
  return (
    <div className={className}>
      {(label || description || sideElement) && (
        <div
          className={cx("flex justify-between", {
            "mb-2": children,
          })}
        >
          <div>
            {label && (
              <label className="block font-medium" htmlFor={idProp || id}>
                {label}
              </label>
            )}
            {description && (
              <p className="text-text-muted text-sm mt-1">{description}</p>
            )}
          </div>
          {sideElement ? <div>{sideElement}</div> : null}
        </div>
      )}
      {idProp
        ? children
        : Children.map(children, (child) =>
            // @ts-expect-error
            isValidElement(child) ? cloneElement(child, { id, error }) : child
          )}
      {error ? (
        <p className="text-sm text-text-danger mt-2">{error}</p>
      ) : help ? (
        <p className="text-sm text-text-muted mt-2">{help}</p>
      ) : null}
    </div>
  )
}
