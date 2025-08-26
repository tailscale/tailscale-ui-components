import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Input } from "../input/input"
import { FormField } from "./form-field"

const meta: Meta<typeof FormField> = {
  title: "components/FormField",
  component: FormField,
  argTypes: {
    children: { control: false },
  },
}

export default meta

type Story = StoryObj<typeof FormField>

export const Default: Story = {
  args: {
    label: "Name",
    description: "Enter your full name.",
    children: <Input type="text" />,
  },
}

export const WithError: Story = {
  args: {
    label: "Email",
    description: "Enter your email address.",
    error: "Invalid email address.",
    children: <Input type="email" />,
  },
}
