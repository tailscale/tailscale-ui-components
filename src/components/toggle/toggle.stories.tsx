import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Toggle } from "./toggle"

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  argTypes: {
    checked: {
      description: "The checked state of the toggle (note: this won’t have any effect in the example above - see the Controlled story below for a demo of this in action).",
    },
  },
}
export default meta

export const Interactive: StoryObj<{
  checked: boolean
  sizeVariant?: "small" | "medium" | "large"
}> = {
  render: function InteractiveStory(args) {
    const [checked, setChecked] = useState(false)
    return <Toggle {...args} checked={checked} onChange={setChecked} />
  },
  args: {
    checked: false,
    sizeVariant: "medium",
  },
}


export const Controlled: StoryObj<{
  checked: boolean
  sizeVariant?: "small" | "medium" | "large"
}> = {
  render: function ControlledStory(args) {
    const [checked, setChecked] = useState(false)
    return (
      <>
        <Toggle {...args} checked={checked} onChange={setChecked} />
        <div>
          <p>Use the radio buttons to set the toggle’s “checked” state to off/on:</p>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="controlled-toggle"
              checked={checked === false}
              onChange={() => setChecked(false)}
            />
            Off
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="controlled-toggle"
              checked={checked === true}
              onChange={() => setChecked(true)}
            />
            On
          </label>
        </div>
      </>
    )
  },
  args: {
    checked: false,
    sizeVariant: "medium",
  },
}

export const Sizes: StoryObj = {
  render: function SizesStory() {
    const [small, setSmall] = useState(false)
    const [medium, setMedium] = useState(false)
    const [large, setLarge] = useState(false)
    return (
      <div className="flex gap-8">
        <div className="flex flex-col items-center">
          <span className="mb-2">Small</span>
          <Toggle sizeVariant="small" checked={small} onChange={setSmall} />
        </div>
        <div className="flex flex-col items-center">
          <span className="mb-2">Medium</span>
          <Toggle sizeVariant="medium" checked={medium} onChange={setMedium} />
        </div>
        <div className="flex flex-col items-center">
          <span className="mb-2">Large</span>
          <Toggle sizeVariant="large" checked={large} onChange={setLarge} />
        </div>
      </div>
    )
  },
}

export const Disabled: StoryObj = {
  args: {
    checked: false,
    disabled: true,
  },
}
