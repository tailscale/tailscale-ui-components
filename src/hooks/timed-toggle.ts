import { useEffect, useRef, useState } from "react"

type Options = {
  timeout: number
}

/**
 * useTimedToggle is a hook for providing a UI state change that resets to the
 * default value after a set amount of time. This is useful for confirmation
 * changes where we temporarily show a confirmation that later disappears.
 */
export default function useTimedToggle(
  defaultValue: boolean,
  options: Partial<Options> = {}
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [value, setValue] = useState(defaultValue)
  const timeoutId = useRef<number>()
  const timeoutLength = options.timeout || 3000

  useEffect(() => {
    if (value !== defaultValue) {
      timeoutId.current = window.setTimeout(() => {
        setValue(defaultValue)
      }, timeoutLength)
    }

    return () => {
      if (!timeoutId.current) {
        return
      }
      clearTimeout(timeoutId.current)
    }
  }, [value, defaultValue, timeoutLength])

  return [value, setValue]
}
