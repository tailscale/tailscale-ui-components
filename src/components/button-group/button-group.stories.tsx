import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ButtonGroup } from "./button-group"
import { Button } from "../button/button"

const meta: Meta<typeof ButtonGroup> = {
  title: "components/ButtonGroup",
  component: ButtonGroup,
}

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const TwoButtons: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </ButtonGroup>
  ),
}

export const ThreeButtons: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonGroup>
  ),
}

export const FourButtons: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
    </ButtonGroup>
  ),
}

export const FiveButtons: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
      <Button>Button 4</Button>
      <Button>Button 5</Button>
    </ButtonGroup>
  ),
}
