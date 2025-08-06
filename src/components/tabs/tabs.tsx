import { Content, List, Root, Trigger } from "@radix-ui/react-tabs"
import cx from "classnames"
import React, { ReactNode } from "react"

type Props = {
  tabs: {
    id: string
    label: ReactNode
    content?: ReactNode
    icon?: ReactNode
  }[]
} & (
  | {
      defaultValue?: string
      value?: string
      onChange?: (value: string) => void
    }
  | { defaultValue?: string; value: string; onChange: (value: string) => void }
)

/**
 * Tabs is a component for displaying different content views behind labelled
 * tabs. Tab content is defined by the `tabs` prop. The component can either be
 * controlled (via `value` and `onChange`) or uncontrolled (via `defaultValue`).
 *
 *     <Tabs tabs={[
 *       { value: "account", label: "Account", content: <AccountTab /> },
 *       { value: "billing", label: "Billing", content: <BillingTab /> },
 *     ]} />
 */
export default function Tabs({ tabs, defaultValue, value, onChange }: Props) {
  const hasValue = value !== undefined && onChange !== undefined
  const hasDefaultValue = !hasValue && defaultValue !== undefined

  return (
    <Root
      defaultValue={hasDefaultValue ? defaultValue : tabs[0].id}
      value={value}
      onValueChange={onChange}
    >
      <List className="flex overflow-x-auto overflow-y-hidden pb-px relative navigation after:absolute after:left-0 after:right-0 after:bottom-0 z-0 after:h-px after:bg-border-base">
        {tabs.map((tab) => (
          <Trigger
            key={tab.id}
            value={tab.id}
            className={cx(
              "flex items-center icon-parent px-2 py-2 first:-ml-2 rounded-md font-medium",
              "after:absolute after:bottom-0 after:right-2 after:left-2 after:h-px after:bg-text-primary after:z-10",
              "select-none whitespace-nowrap relative top-px",
              "state-active:text-text-primary state-active:after:visible",
              "state-inactive:text-text-muted state-inactive:hover:text-text-base state-inactive:after:invisible",
              "transition ease-in-out duration-150"
            )}
          >
            {tab.icon && <span className="shrink-0 mr-2">{tab.icon}</span>}
            {tab.label}
          </Trigger>
        ))}
      </List>
      {tabs.map((tab) => (
        <Content
          key={tab.id}
          value={tab.id}
          className="mt-6 focus:outline-none"
        >
          {tab.content}
        </Content>
      ))}
    </Root>
  )
}
