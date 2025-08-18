import type { Meta, StoryObj } from "@storybook/react"
import { Avatar } from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "components/Avatar",
  component: Avatar,
  argTypes: {
    user: { control: "object" },
    group: { control: "text" },
    sizeClassName: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const UserWithProfilePic: Story = {
  args: {
    user: {
      loginName: "testuser",
      displayName: "Test User",
      profilePicURL: "https://avatars.githubusercontent.com/u/583231?v=4",
    },
    sizeClassName: "w-12 h-12 text-lg",
  },
}

export const UserWithoutProfilePic: Story = {
  args: {
    user: {
      loginName: "testuser",
      displayName: "Test User",
    },
    sizeClassName: "w-12 h-12 text-lg",
  },
}

export const GroupAvatar: Story = {
  args: {
    group: "design",
    sizeClassName: "w-12 h-12",
  },
}

export const EmptyAvatar: Story = {
  args: {
    sizeClassName: "w-12 h-12",
  },
}
