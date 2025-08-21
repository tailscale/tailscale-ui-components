import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Toggle } from "./toggle"

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
}
export default meta

export const Interactive: StoryObj<{
  checked: boolean
  sizeVariant?: "small" | "medium" | "large"
}> = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false)
    return <Toggle {...args} checked={checked} onChange={setChecked} />
  },
  args: {
    checked: false,
    sizeVariant: "medium",
  },
}

export const Sizes: StoryObj = {
  render: () => {
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
