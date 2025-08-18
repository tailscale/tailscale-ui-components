import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Carousel } from "./carousel"
import { Card } from "../card/card"

const meta: Meta<typeof Carousel> = {
  title: "components/Carousel",
  component: Carousel,
  argTypes: {
    cardWidth: { control: "number" },
    gap: { control: "number" },
  },
}

export default meta
type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  args: {
    cardWidth: 200,
    gap: 16,
  },
  render: (args) => (
    <Carousel {...args}>
      <Card style={{ width: args.cardWidth }} className="h-24">Card 1</Card>
      <Card style={{ width: args.cardWidth }} className="h-24">Card 2</Card>
      <Card style={{ width: args.cardWidth }} className="h-24">Card 3</Card>
      <Card style={{ width: args.cardWidth }} className="h-24">Card 4</Card>
      <Card style={{ width: args.cardWidth }} className="h-24">Card 5</Card>
    </Carousel>
  ),
}
