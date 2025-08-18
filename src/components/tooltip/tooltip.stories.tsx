import React from "react";
import { Tooltip } from "./tooltip";
import { Button } from "../button/button";
import type { Meta, StoryObj } from "@storybook/react";


const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  decorators: [
    (Story) => <Tooltip.Provider>{Story()}</Tooltip.Provider>,
  ],
  parameters: {
    controls: {
      exclude: ["children", "content"],
    },
  },
};
export default meta;

export const Default: StoryObj<typeof Tooltip> = {
  args: {
    content: "Tooltip content",
    children: <span>Hover me</span>,
  },
};

export const Placement: StoryObj = {
  render: (args) => (
    <div className="flex flex-wrap gap-8 justify-center items-center min-h-[200px]">
      <Tooltip {...args} side="top" content="Top tooltip">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip {...args} side="right" content="Right tooltip">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip {...args} side="bottom" content="Bottom tooltip">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip {...args} side="left" content="Left tooltip">
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};
