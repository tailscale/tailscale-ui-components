import type { Meta, StoryObj } from "@storybook/react";
import { Note } from "./note";

const meta: Meta<typeof Note> = {
  title: "Components/Note",
  component: Note,
  argTypes: {
    icon: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof Note>;

export const Default: Story = {
  args: {
    children: "This is a note.",
  },
};
