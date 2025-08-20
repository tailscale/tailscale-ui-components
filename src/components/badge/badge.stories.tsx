import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Badge,
  AlphaBadge,
  BetaBadge,
  BADGE_COLORS,
  BADGE_VARIANTS,
} from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: "text" },
    variant: {
      options: BADGE_VARIANTS,
      control: { type: "radio" },
    },
    color: {
      options: BADGE_COLORS,
      control: { type: "select" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default badge
export const Default: Story = {
  args: {
    children: "Badge",
    variant: "status",
    color: "gray",
    
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/NQeNx57BnqsZnrBsCjDEdb/Design-System?node-id=856-677&t=5c2zwTSzHKaRtjau-1"
    }
  }
};

// Status variant with different colors
export const StatusVariant: Story = {
  args: {
    children: "Online",
    variant: "status",
    color: "green",
  },
};

export const StatusBlue: Story = {
  args: {
    children: "Active",
    variant: "status",
    color: "blue",
  },
};

export const StatusRed: Story = {
  args: {
    children: "Error",
    variant: "status",
    color: "red",
  },
};

export const StatusOrange: Story = {
  args: {
    children: "Warning",
    variant: "status",
    color: "orange",
  },
};

export const StatusYellow: Story = {
  args: {
    children: "Pending",
    variant: "status",
    color: "yellow",
  },
};

// Tag variant
export const TagVariant: Story = {
  args: {
    children: "Tag",
    variant: "tag",
    color: "blue",
  },
};

// Cell variant
export const CellVariant: Story = {
  args: {
    children: "Cell",
    variant: "cell",
    color: "gray",
  },
};

// Outline variant
export const OutlineVariant: Story = {
  args: {
    children: "Outline",
    variant: "status",
    color: "outline",
  },
};

// All Colors showcase
export const AllColors = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="status" color="blue">
        Blue
      </Badge>
      <Badge variant="status" color="green">
        Green
      </Badge>
      <Badge variant="status" color="red">
        Red
      </Badge>
      <Badge variant="status" color="orange">
        Orange
      </Badge>
      <Badge variant="status" color="yellow">
        Yellow
      </Badge>
      <Badge variant="status" color="gray">
        Gray
      </Badge>
      <Badge variant="status" color="outline">
        Outline
      </Badge>
    </div>
  ),
} satisfies Story;

// All Variants showcase
export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge variant="status" color="blue">
        Status
      </Badge>
      <Badge variant="tag" color="blue">
        Tag
      </Badge>
      <Badge variant="cell" color="blue">
        Cell
      </Badge>
    </div>
  ),
} satisfies Story;

// Special badges
export const Alpha = {
  render: () => <AlphaBadge />,
} satisfies Story;

export const Beta = {
  render: () => <BetaBadge />,
} satisfies Story;

export const BetaWithFeature = {
  render: () => <BetaBadge feature="New Feature" />,
} satisfies Story;

// Use cases
export const UseCases = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Status Indicators</h3>
        <div className="flex gap-2">
          <Badge variant="status" color="green">
            Connected
          </Badge>
          <Badge variant="status" color="red">
            Disconnected
          </Badge>
          <Badge variant="status" color="yellow">
            Connecting
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Tags</h3>
        <div className="flex gap-2">
          <Badge variant="tag" color="blue">
            Frontend
          </Badge>
          <Badge variant="tag" color="green">
            Backend
          </Badge>
          <Badge variant="tag" color="orange">
            API
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Table Cells</h3>
        <div className="flex gap-2">
          <Badge variant="cell" color="gray">
            Draft
          </Badge>
          <Badge variant="cell" color="blue">
            Published
          </Badge>
          <Badge variant="cell" color="red">
            Archived
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Feature Badges</h3>
        <div className="flex gap-2">
          <AlphaBadge />
          <BetaBadge />
          <BetaBadge feature="AI Assistant" />
        </div>
      </div>
    </div>
  ),
} satisfies Story;
