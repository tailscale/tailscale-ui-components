import * as Primitive from "@radix-ui/react-collapsible"
import cx from "classnames"
import React, { useEffect, useState } from "react"
import { ChevronDown, ChevronRight } from "../../icons"

export type CollapsibleProps = {
  trigger?: string
  children: React.ReactNode
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * An interactive component for expanding and collapsing content which shouldn’t always be shown.
 * Built on top of Radix UI’s collapsible component (https://www.radix-ui.com/docs/primitives/components/collapsible).
 */
export function Collapsible(props: CollapsibleProps) {
  const { children, className, trigger, onOpenChange } = props
  const [open, setOpen] = useState(props.open)

  return (
    <Primitive.Root
      className={className}
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        onOpenChange?.(open)
      }}
    >
      <Primitive.Trigger className="inline-flex items-center cursor-pointer hover:bg-bg-menu-item-hover focus-visible:bg-bg-menu-item-hover rounded pr-3 py-1 transition-colors">
        <span className="ml-2 mr-1.5  state-open:rotate-90">
          <ChevronRight strokeWidth={3} className="text-text-muted w-4" />
        </span>
        {trigger}
      </Primitive.Trigger>
      <Primitive.Content className="mt-2">{children}</Primitive.Content>
    </Primitive.Root>
  )
}

type TableRowProps = {
  /*
   * triggerCols is a callback that returns the set of table cells that are
   * always shown on the top row of a potential set of collapsible rows, written
   * as one or more <td> elements.
   *
   * This callback receives the collapseIcon as an argument. It is the callback's
   * responsibility to place this in the correct location (e.g., in the first
   * <td> returned by the callback).
   *
   * TODO(phirework): find a way of enforcing <td> as direct children that
   * isn't super gross.
   */
  triggerCols: (collapseIcon: React.ReactNode) => React.ReactNode

  /*
   * triggerClasses are optional classes that can be applied to the row of
   * triggerCols.
   */
  triggerClasses?: string

  /*
   * expandCols is an optional set of table cells that can be toggled open.
   * If expandCols is not specified the expand UI is not shown. It is the caller's
   * responsibility to make sure the colSpan of expandCols matches what is in the
   * top row of triggercols.
   */
  expandCols?: React.ReactNode

  /*
   * expandedClasses are optional classes that can be applied to the row of
   * expandCols
   */
  expandedClasses?: string

  // TODO(phirework): enable externally controllable expand state
}

const cellExpandIcon = "text-text-muted w-4 ml-2"

/*
 * CollapsibleTableRow is a special case where the collapsing functionality
 * is built into the structure of the table itself, such that any potential
 * additional content is actually a new table row within the same tbody.
 * This is to preserve the semantics of a table element while abstracting
 * away collapsible state and styling.
 */
export function CollapsibleTableRow(props: TableRowProps) {
  const { triggerCols, expandCols, triggerClasses, expandedClasses } = props
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setExpanded(false)
  }, [triggerCols])

  // TODO(mpminardi): tbody should really be wrapping all of the rows as a set
  // and not each individual row. This works, but is not really semantically
  // what should be happening.
  return (
    <tbody className="border-b last:border-0">
      <tr
        onClick={() => expandCols && setExpanded(!expanded)}
        className={cx(
          "hover:bg-gray-50 dark:hover:bg-gray-800",
          {
            "cursor-pointer": expandCols,
          },
          triggerClasses
        )}
      >
        {triggerCols(
          <div className="float-left">
            {expandCols &&
              (expanded ? (
                <ChevronDown strokeWidth={3} className={cellExpandIcon} />
              ) : (
                <ChevronRight strokeWidth={3} className={cellExpandIcon} />
              ))}
          </div>
        )}
      </tr>
      {expandCols && (
        <tr
          className={cx(expandedClasses, {
            hidden: !expanded,
          })}
        >
          {expandCols}
        </tr>
      )}
    </tbody>
  )
}
