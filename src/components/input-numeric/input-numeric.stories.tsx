import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { NumericInput } from "./input-numeric"

const meta: Meta<typeof NumericInput> = {
  title: "Components/NumericInput",
  component: NumericInput,
}
export default meta

type Story = StoryObj<typeof NumericInput>

export const Default: Story = {
  render: function NumericInputStory(args) {
    const [value, setValue] = useState(args.value)
    return (
      <NumericInput
        {...args}
        value={value}
        onChange={setValue}
        id="number-input"
      />
    )
  },
  args: {
    value: 42,
    onChange: (val: number) => {},
  },
}
