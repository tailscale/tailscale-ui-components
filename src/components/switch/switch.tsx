import { List, Root, Trigger } from "@radix-ui/react-tabs"
import cx from "classnames"
import React from "react"

type SwitchOption = {
  id: string
  label: React.ReactNode
}

type SwitchProps = {
  className?: string
  options: [SwitchOption, SwitchOption]
  value: string
  size?: "medium" | "large"
  fullWidth?: boolean
  onChange: (value: string) => void
}

/**
 * Switch is a navigational component for switching between two views.
 * Switch differs from Tabs in that it's a control limited to only two options. Its
 * appearance is also different, and lends itself to places where navigation is less
 * central to the workflow.
 *
 *     <Switch
 *       value={selected}
 *       onChange={setSelected}
 *       options={[
 *         { id: "option1", label: "Option 1" },
 *         { id: "option2", label: "Option 2" },
 *       ]}
 *     />
 */

export default function Switch({
  className,
  options,
  value,
  size = "medium",
  fullWidth = false,
  onChange,
}: SwitchProps) {
  return (
    <Root value={value} onValueChange={onChange}>
      <List
        className={cx(
          "flex flex-row border border-gray-300 dark:border-gray-600 p-1 rounded-full bg-bg-base",
          {
            "h-9": size === "medium",
            "h-10": size === "large",

            "w-full": fullWidth === true,
            "w-fit": fullWidth === false,
          },
          className
        )}
      >
        {options.map((option) => (
          <Trigger
            key={option.id}
            value={option.id}
            className={cx(
              "w-auto text-sm text-center px-3 font-medium transition rounded-full",
              "state-active:cursor-default state-active:bg-gray-200 state-active:dark:bg-gray-600",
              "state-inactive:cursor-pointer",
              {
                "flex-1": fullWidth,
              }
            )}
          >
            {option.label}
          </Trigger>
        ))}
      </List>
    </Root>
  )
}
