import type { Meta, StoryObj } from "@storybook/react";
import { LoadingBlock } from "./loading-block";
import React from "react";

type StoryArgs = React.ComponentProps<typeof LoadingBlock> & {
  errorMessage?: string;
};

const meta: Meta<typeof LoadingBlock> = {
  title: "Components/LoadingBlock",
  component: LoadingBlock,
  tags: ["autodocs"],
  argTypes: {
    loadingMessage: {
      control: "text",
      name: "Loading message",
      description: "Optionally set a loading message to display with the spinner.",
    },
    error: { control: false, description: "(edit `errorMessage` to change the error message)" },
  },
};
export default meta;

export const Default: StoryObj<StoryArgs> = {
  render: (args) => {
    const { errorMessage, loadingMessage, ...rest } = args;
    return (
      <LoadingBlock
        {...rest}
        error={errorMessage ? { message: errorMessage } : undefined}
        loadingMessage={loadingMessage}
      />
    );
  },
  args: {
    errorMessage: "",
    loadingMessage: "Loading data...",
  },
};