import React from "react";
import { DropdownSelect } from "./dropdown-select";
import type { Meta, StoryObj } from "@storybook/react";
import type { SelectValue } from "./types";

const meta: Meta<typeof DropdownSelect> = {
  title: "Components/DropdownSelect",
  component: DropdownSelect,
};
export default meta;

type Story = StoryObj<typeof DropdownSelect>;

const values: SelectValue[] = [
  { label: "Text", value: "", type: "text-input", placeholder: "Enter text" },
  { label: "Date", value: "", type: "date-input" },
  { label: "Constant", value: "constant", type: "string-constant" },
];

export const Default: Story = {
  args: {
    values,
    selected: values[0],
    onUpdateSelected: () => {},
  },
};
