import cx from "classnames"
import React from "react"
import Confluence from "src/assets/images/preset-apps-icons/confluence.svg?react"
import Github from "src/assets/images/preset-apps-icons/github.svg?react"
import GoogleWorkspace from "src/assets/images/preset-apps-icons/google-workspace.svg?react"
import Jira from "src/assets/images/preset-apps-icons/jira.svg?react"
import Linear from "src/assets/images/preset-apps-icons/linear.svg?react"
import Okta from "src/assets/images/preset-apps-icons/okta.svg?react"
import Stripe from "src/assets/images/preset-apps-icons/stripe.svg?react"
import { PencilRuler } from "src/icons"

/**
 * PresetAppID is an enum of the preset apps available
 * for use with app connectors.
 */
export type PresetAppID =
  | "github"
  | "jira"
  | "confluence"
  | "stripe"
  | "google-workspace"
  | "okta"
  | "linear"
  | "custom"

/**
 * PresetAppIcon returns the icon of an preset app provider.
 * If the app is a custom app, we return a PencilRuler
 * icon.
 */
export default function PresetAppIcon(props: {
  presetAppID?: PresetAppID
  className?: string
  size?: number
}) {
  const { presetAppID, className, size } = props

  switch (presetAppID) {
    case "confluence":
      return <Confluence className={className} width={size} height={size} />
    case "jira":
      return <Jira className={className} width={size} height={size} />
    case "stripe":
      return <Stripe className={className} width={size} height={size} />
    case "google-workspace":
      return (
        <GoogleWorkspace className={className} width={size} height={size} />
      )
    case "okta":
      return (
        <Okta
          className={cx(className, "dark:[--icon-color:#fff]")}
          width={size}
          height={size}
        />
      )
    case "github":
      return (
        <Github
          className={cx(className, "dark:[--icon-color:#fff]")}
          width={size}
          height={size}
        />
      )
    case "linear":
      return <Linear className={className} width={size} height={size} />
    default:
      return <PencilRuler className={className} size={size} />
  }
}
