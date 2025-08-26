import cx from "classnames"
import React, { forwardRef, InputHTMLAttributes } from "react"
import { Search, X } from "../../icons"

export type SearchInputProps = {
  className?: string
  onClearClick?: () => void
  inputClassName?: string
} & InputHTMLAttributes<HTMLInputElement>

/**
 * SearchInput is a standard input with a search icon and optional clear button.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const { className, inputClassName, onClearClick, ...rest } = props
    return (
      <div className={cx("relative", className)}>
        <Search
          className="absolute text-text-disabled h-full ml-2"
          size="1.25em"
        />
        <input
          type="text"
          className={cx("input px-8", inputClassName)}
          ref={ref}
          {...rest}
        />
        {onClearClick && rest.value && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onClearClick()
            }}
          >
            <X
              className="absolute text-text-disabled h-full top-0 right-0 mr-2"
              size="1.25em"
            />
          </a>
        )}
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"
export default SearchInput
