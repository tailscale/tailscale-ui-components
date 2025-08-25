/**
 * typography contains CSS classes for standard Tailscale type styles. Apply
 * these classes to any text element. For example:
 *
 *    import { typography } from "@tailscale/tailscale-ui-components"
 *
 *    <h2 className={typography.pageTitle}>My Page Title</h2>
 *
 * These classes contain _no_ margin or padding, since those values always
 * vary by context.
 */
const typography = {
  /**
   * pageTitle contains styles for the primary header on every page.
   */
  pageTitle: "text-3xl font-semibold tracking-tight leading-tight",

  /**
   * pageTitle contains styles for the primary header on every page.
   */
  pageSubTitle: "text-2xl font-semibold tracking-tight",
  /**
   * sectionTitle styles subheaders dividing sections.
   */
  sectionTitle: "text-xl font-semibold tracking-tight",

  fieldLabel: "font-medium",
  fieldHelpText: "text-sm text-text-muted",
  fieldErrorText: "text-sm text-text-danger",
}

export default typography
