import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import cx from "classnames"
import React from "react"
import { Info } from "src/icons"
import { PortalContainerContext } from "src/components//portal-container-context"

export type TooltipProps = {
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  delay?: number
  content: React.ReactNode
  children: React.ReactNode
  asChild?: boolean // when true, renders the tooltip trigger as a child; defaults to true
}

export function Tooltip(props: TooltipProps) {
  const { delay = 150, side, align, content, children, asChild = true } = props

  return (
    <TooltipPrimitive.Root delayDuration={delay}>
      <TooltipPrimitive.TooltipTrigger asChild={asChild}>
        {asChild ? <span>{children}</span> : children}
      </TooltipPrimitive.TooltipTrigger>
      {content && (
        <PortalContainerContext.Consumer>
          {(portalContainer) => (
            <TooltipPrimitive.Portal container={portalContainer}>
              <TooltipPrimitive.Content
                className="tooltip"
                role="tooltip"
                sideOffset={10}
                side={side}
                align={align}
                aria-live="polite"
                collisionPadding={12}
              >
                {content}
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          )}
        </PortalContainerContext.Consumer>
      )}
    </TooltipPrimitive.Root>
  )
}

type InfoIconProps = {
  className?: string
}

function InfoIcon(props: InfoIconProps) {
  return (
    <Info
      size="1em"
      className={cx(props.className, "cursor-default inline-flex")}
    />
  )
}

Tooltip.InfoIcon = InfoIcon
Tooltip.Provider = TooltipPrimitive.Provider
