import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "md",
  },
};
