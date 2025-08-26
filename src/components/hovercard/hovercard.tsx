import {
  Content,
  HoverCardContentProps,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-hover-card"
import React from "react"
import { isExternalUrl } from "../../utils/util"
import { PortalContainerContext } from "../portal-container-context"

export type HoverCardProps = {
  children: React.ReactNode
  trigger: React.ReactNode
  asChild?: boolean
  href: string
} & Pick<HoverCardContentProps, "side" | "sideOffset" | "align" | "alignOffset">

/**
 * HoverCards are used to provide more context and preview content behind a link.
 */
export function HoverCard(props: HoverCardProps) {
  const {
    children,
    trigger,
    asChild,
    side,
    sideOffset = 10,
    align,
    alignOffset,
    href,
  } = props

  const extraLinkProps = isExternalUrl(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {}

  return (
    <Root openDelay={400} closeDelay={300}>
      <Trigger href={href} asChild={asChild} {...extraLinkProps}>
        {trigger}
      </Trigger>
      <PortalContainerContext.Consumer>
        {(portalContainer) => (
          <Portal container={portalContainer}>
            <Content
              className="hovercard bg-bg-base rounded-md px-3 py-3 z-50 max-w-sm"
              side={side}
              sideOffset={sideOffset}
              align={align}
              alignOffset={alignOffset}
              collisionPadding={12}
              aria-live="polite"
            >
              {children}
            </Content>
          </Portal>
        )}
      </PortalContainerContext.Consumer>
    </Root>
  )
}
