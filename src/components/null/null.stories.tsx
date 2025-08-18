import type { Meta, StoryObj } from "@storybook/react";
import { NullValue } from "./null";

const meta: Meta<typeof NullValue> = {
  title: "Components/NullValue",
  component: NullValue,
};
export default meta;

type Story = StoryObj<typeof NullValue>;

export const Default: Story = {};
