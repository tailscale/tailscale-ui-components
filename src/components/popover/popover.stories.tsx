import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Button } from "../button/button"
import { Popover, PopoverProps } from "./popover"

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    controls: { exclude: ["children", "content"] },
  },
  argTypes: {
    children: { table: { disable: true }, control: false },
    content: { table: { disable: true }, control: false },

    side: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    align: { control: { type: "select" }, options: ["start", "center", "end"] },
    asChild: { control: "boolean" },
    sideOffset: { control: "number" },
    alignOffset: { control: "number" },
    modal: { control: "boolean" },
    open: { control: "boolean" },
    onOpenChange: { table: { disable: true } },
    onOpenAutoFocus: { table: { disable: true } },
  },
}
export default meta

type Story = StoryObj<typeof Popover>

export const Default: Story = {
  args: {
    side: "bottom",
    sideOffset: 10,
    align: "center",
  },
  render: (args: PopoverProps) => (
    <div style={{ padding: 40 }}>
      <Popover
        {...args}
        content={
          <div style={{ padding: "1rem", maxWidth: 240 }}>
            This is a popover! You can put any content here.
          </div>
        }
      >
        <Button>Open Popover</Button>
      </Popover>
    </div>
  ),
}

export const Controlled: Story = {
  args: {
    side: "right",
    align: "center",
  },
  render: (args: PopoverProps) => {
    const [open, setOpen] = useState(false)
    return (
      <div
        style={{ display: "flex", gap: 12, alignItems: "center", padding: 40 }}
      >
        <Popover
          {...args}
          open={open}
          onOpenChange={setOpen}
          content={
            <div style={{ padding: "1rem" }}>Controlled popover content</div>
          }
        >
          <Button>Toggle Popover</Button>
        </Popover>
        <Button onClick={() => setOpen((p) => !p)}>
          {open ? "Close" : "Open"} externally
        </Button>
      </div>
    )
  },
}
