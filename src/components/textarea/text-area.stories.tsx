// TextArea.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Collapsible } from "../collapsible/collapsible"
import { TextArea } from "./textarea"

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  args: {
    autoResize: true,
    visible: true,
    minHeight: 32,
    maxHeight: undefined,
    placeholder: "Type here…",
    defaultValue:
      "This TextArea auto-resizes as you type.\nKeep adding more lines to see its height grow.",
  },
  argTypes: {
    autoResize: { control: "boolean" },
    visible: { control: "boolean" },
    minHeight: { control: { type: "number", min: 16, step: 4 } },
    maxHeight: { control: { type: "number", min: 32, step: 4 } },
    disabled: { control: "boolean" },
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A textarea that optionally auto-resizes to fit content. " +
          "`visible` should reflect whether the element is currently visible (e.g., inside a collapsible) " +
          "so its height can be recalculated correctly.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  render: (args) => <TextArea {...args} />,
}

export const AutoResizeOff: Story = {
  name: "Auto-resize disabled",
  args: {
    autoResize: false,
    defaultValue:
      "Auto-resize is off for this example, so the height will not change automatically as you add more lines.",
  },
  render: (args) => <TextArea {...args} className="w-full max-w-xl" />,
}

export const WithMinMaxHeight: Story = {
  name: "Min/Max height clamp",
  args: {
    minHeight: 48,
    maxHeight: 160,
    defaultValue:
      "This example clamps growth between 48px and 160px.\n" +
      "Add more lines to see it stop growing and become scrollable once it hits the max.",
  },
  render: (args) => <TextArea {...args} />,
}

/**
 * Demonstrates how the `visible` prop helps recalculation when showing/hiding
 * a collapsible container. Toggle the section to force a re-measure.
 */
export const VisibilityRecalculation: Story = {
  name: "Visibility recalculation (use with Collapsible)",
  args: {
    defaultValue:
      "Toggle the section to hide/show this TextArea.\n" +
      "When shown, `visible=true` triggers a re-measure for correct height.",
  },
  render: function ToggleStory(args) {
    const [open, setOpen] = useState(true)
    return (
      <div className="w-full max-w-xl space-y-3">
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          trigger={open ? "Hide section" : "Show section"}
        >
          <div className="space-y-2 rounded-xl border p-3">
            <label className="text-sm font-medium">Collapsible notes</label>
            <TextArea {...args} visible={open} />
          </div>
        </Collapsible>
      </div>
    )
  },
}
