import React from 'react'
import type { Meta, StoryObj } from "@storybook/react"
import { Plus, Lock } from "lucide-react"
import { Button } from "./button"

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" },
    variant: {
      options: ["filled", "minimal"],
      control: { type: "radio" },
    },
    intent: {
      options: ["base", "primary", "warning", "danger", "black"],
      control: { type: "radio" },
    },
    sizeVariant: {
      options: ["xsmall", "small", "medium", "large", "input"],
      control: { type: "select" },
    },
    textAlign: {
      options: ["center", "left"],
      control: { type: "radio" },
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    active: { control: "boolean" },
    iconOnly: { control: "boolean" },
    prefixIcon: { control: false },
    suffixIcon: { control: false },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
    variant: "filled",
    intent: "base",
    sizeVariant: "medium",
    disabled: false,
    loading: false,
    active: false,
    iconOnly: false,
    textAlign: "center",
  },
}

export const Filled: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} intent="base">
        Base
      </Button>
      <Button {...args} intent="primary">
        Primary
      </Button>
      <Button {...args} intent="danger">
        Danger
      </Button>
      <Button {...args} intent="warning">
        Warning
      </Button>
      <Button {...args} intent="black">
        Black
      </Button>
    </div>
  ),
  args: {
    variant: "filled",
  },
}

export const Minimal: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} intent="base">
        Base
      </Button>
      <Button {...args} intent="primary">
        Primary
      </Button>
      <Button {...args} intent="danger">
        Danger
      </Button>
      <Button {...args} intent="warning">
        Warning
      </Button>
    </div>
  ),
  args: {
    variant: "minimal",
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} sizeVariant="large">
        Large
      </Button>
      <Button {...args} sizeVariant="medium">
        Medium
      </Button>
      <Button {...args} sizeVariant="small">
        Small
      </Button>
      <Button {...args} sizeVariant="xsmall">
        Extra Small
      </Button>
    </div>
  ),
  args: {
    variant: "filled",
    intent: "base",
  },
}

export const WithIcons: Story = {
  args: {
    ...Default.args,
    children: "Lock",
    prefixIcon: <Lock size={16} />,
  },
}

export const WithIconsAndTextLeft: Story = {
  args: {
    ...WithIcons.args,
    textAlign: "left",
    suffixIcon: <Plus size={16} />,
  },
}

export const IconOnly: Story = {
  args: {
    ...Default.args,
    children: <Plus size={16} />,
    iconOnly: true,
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
    children: "Submitting",
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    children: "Cannot click",
    disabled: true,
  },
}

export const Active: Story = {
  args: {
    ...Default.args,
    children: "Active State",
    active: true,
  },
}
