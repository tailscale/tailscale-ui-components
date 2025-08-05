import api from "src/api"
import type { AnalyticsProperties } from "src/types/analytics"
import captureException from "src/utils/capture-exception"

/**
 * trackEvent sends an analytics event to control. Be sure to name your event
 * in the format: "<noun> <past-tense verb>" eg. "Post Saved"
 */
export function trackEvent(event: string, properties: AnalyticsProperties) {
  api
    .post("/event/track", {
      event,
      properties,
    })
    .catch((err) => {
      // We capture errors here so any issues never bring down the page.
      console.error(err)
      captureException(err)
    })
}

export const AnalyticsEvent = {
  BillingPageViewed: "Billing Page Viewed",
  UpgradePlanButtonClicked: "Upgrade Plan Button Clicked",
  SwitchPlanButtonClicked: "Switch Plan Button Clicked",
  ContactSalesButtonClicked: "Contact Sales Button Clicked",
  ManageAddonsButtonClicked: "Manage Addons Button Clicked",
  PlansPageViewed: "Plans Page Viewed",
  BackToBillingClicked: "Back To Billing Clicked",
  ComparePlansClicked: "Compare Plans Clicked",
  DowngradeToPersonalButtonClicked: "Downgrade To Personal Button Clicked",
  UpgradeToPersonalPlusButtonClicked: "Upgrade To Personal Plus Button Clicked",
  DowngradeToPersonalPlusButtonClicked:
    "Downgrade To Personal Plus Button Clicked",
  ViewPlansForBusinessClicked: "View Plans For Business Clicked",
  ContactSupportClicked: "Contact Support Clicked",
  UpgradeToStarterPlanButtonClicked: "Upgrade To Starter Plan Button Clicked",
  DowngradeToStarterPlanButtonClicked:
    "Downgrade To Starter Plan Button Clicked",
  UpgradeToPremiumPlanButtonClicked: "Upgrade To Premium Plan Button Clicked",
  DowngradeToPremiumPlanButtonClicked:
    "Downgrade To Premium Plan Button Clicked",
  UpgradeToEnterpriseContactSalesButtonClicked:
    "Upgrade To Enterprise Contact Sales Button Clicked",
  BillingEmailInputFocused: "Billing Email Input Focused",
  BillingAddressInputFocused: "Billing Address Input Focused",
  ContinueToPaymentDetailsButtonClicked:
    "Continue To Payment Details Button Clicked",
  PaymentInputFocused: "Payment Input Focused",
  PromoCodeInputFocused: "Promo Code Input Focused",
  ConfirmUpgradeButtonClicked: "Confirm Upgrade Button Clicked",
  CustomerPlanChangeSuccessful: "Customer Plan Change Successful",
  CustomerPlanChangeFailed: "Customer Plan Change Failed",
  UsageBannerViewPlansButtonClicked: "Usage Banner View Plans Button Clicked",
  UsageBannerContactSalesButtonClicked:
    "Usage Banner Contact Sales Button Clicked",
  UsageBannerPersonalPlusPlanButtonClicked:
    "Usage Banner Personal Plus Plan Button Clicked",
  UsageBannerStarterPlanButtonClicked:
    "Usage Banner Starter Plan Button Clicked",
  AddonsPageViewed: "Addons Page Viewed",
  SelectMullvadAddonButtonClicked: "Select Mullvad Addon Button Clicked",
  RemoveMullvadAddonButtonClicked: "Remove Mullvad Addon Button Clicked",
  MullvadDeviceInputValueChanged: "Mullvad Device Input Value Changed",
  SubscriptionAddonChangeSuccessful: "Subscription Addon Change Successful",
  SubscriptionAddonChangeFailed: "Subscription Addon Change Failed",
  SelectStarterPlanButtonClicked: "Select Starter Plan Button Clicked",
  SelectPremiumPlanButtonClicked: "Select Premium Plan Button Clicked",
  ChooseAPlanButtonClicked: "Choose A Plan Button Clicked",
  VisualEditorSubtabClicked: "Visual Editor Subtab Clicked",
  VisualEditorAddClicked: "Visual Editor Add Clicked",
  VisualEditorEditClicked: "Visual Editor Edit Clicked",
  VisualEditorDeleteClicked: "Visual Editor Delete Clicked",
  VisualEditorSaveClicked: "Visual Editor Save Clicked",
} as const
export type AnalyticsEventType =
  typeof AnalyticsEvent[keyof typeof AnalyticsEvent]

export const AnalyticsProductArea = {
  Billing: "billing",
} as const
export type AnalyticsProductAreaType =
  typeof AnalyticsProductArea[keyof typeof AnalyticsProductArea]

export const AnalyticsProductSubArea = {
  Root: "root",
  Plans: "plans",
  Checkout: "checkout",
  TrialExpiredBanner: "trial_expired_banner",
  TrialBadge: "trial_badge",
}
export type AnalyticsProductSubAreaType =
  typeof AnalyticsProductSubArea[keyof typeof AnalyticsProductSubArea]

export const AnalyticsProductJourney = {
  SelfServeConversion: "self_serve_conversion",
} as const
export type AnalyticsProductJourneyType =
  typeof AnalyticsProductJourney[keyof typeof AnalyticsProductJourney]

export const AnalyticsProductJourneyMilestone = {
  Started: "started",
  PlansViewed: "plans_viewed",
  PlanSelected: "plan_selected",
  BillingInfoEntered: "billing_info_entered",
  ConversionComplete: "conversion_complete",
} as const
export type AnalyticsProductJourneyMilestoneType =
  typeof AnalyticsProductJourneyMilestone[keyof typeof AnalyticsProductJourneyMilestone]
