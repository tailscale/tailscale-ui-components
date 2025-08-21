import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Note } from "./note"

const meta: Meta<typeof Note> = {
  title: "Components/Note",
  component: Note,
  argTypes: {
    icon: { control: false },
    onDismiss: { action: "dismissed" },
  },
}
export default meta

type Story = StoryObj<typeof Note>

export const Default: Story = {
  args: {
    children: "This is a note.",
  },
}

export const Dismissible: Story = {
  render: function DismissableStory(args) {
    const [dismissed, setDismissed] = useState(false)
    return (
      <Note
        {...args}
        dismissed={dismissed}
        onDismiss={() => setDismissed(true)}
      />
    )
  },
  args: {
    children: "This is a dismissible note.",
    dismissLabel: "Dismiss note",
  },
}
