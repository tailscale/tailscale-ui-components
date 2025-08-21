import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { DurationInput } from "./input-duration"

const meta: Meta<typeof DurationInput> = {
  title: "Components/DurationInput",
  component: DurationInput,
}
export default meta

type Story = StoryObj<typeof DurationInput>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(93600)
    return (
      <div>
        <DurationInput
          {...args}
          value={value}
          onChange={setValue}
          id="duration"
        />
        <div style={{ marginTop: 8 }}>Value (seconds): {value}</div>
      </div>
    )
  },
  args: {
    // value and onChange are handled in render
    disabled: false,
  },
}
