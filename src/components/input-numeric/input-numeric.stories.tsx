import type { Meta, StoryObj } from "@storybook/react";
import { NumericInput } from "./input-numeric";
import { useState } from "react";
import React from "react";

const meta: Meta<typeof NumericInput> = {
  title: "Components/NumericInput",
  component: NumericInput,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof NumericInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <NumericInput {...args} value={value} onChange={setValue} id="number-input" />
    );
  },
  args: {
    value: 42,
    onChange: (val: number) => {},
  },
};
