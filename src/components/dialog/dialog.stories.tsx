import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Plus, Settings, Trash2, AlertTriangle } from "lucide-react"
import Dialog from "./dialog"
import { Button } from "../button/button"

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text" },
    size: {
      options: ["regular", "large", "xlarge", "2xlarge"],
      control: { type: "select" },
    },
    position: {
      options: [
        "top-left",
        "top-center",
        "top-right",
        "center-left",
        "center-center",
        "center-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      control: { type: "select" },
    },
    hideCloseIcon: { control: "boolean" },
    noPadding: { control: "boolean" },
    restoreFocus: { control: "boolean" },
    open: { control: "boolean" },
    defaultOpen: { control: "boolean" },
    // Exclude non-serializable props from controls
    trigger: { table: { disable: true } },
    children: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Dialog trigger={<Button>Open Dialog</Button>} {...args}>
      <div>
        <p className="mb-4">
          This is a basic dialog example. You can put any content here.
        </p>
        <p className="text-text-muted">
          Click the X button or press Escape to close.
        </p>
      </div>
    </Dialog>
  ),
  args: {
    title: "Default Dialog",
    size: "regular",
    position: "top-center",
    hideCloseIcon: false,
    noPadding: false,
    restoreFocus: true,
    children: <div>Content</div>,
  },
}

export const WithForm: Story = {
  render: (args) => (
    <Dialog
      trigger={
        <Button prefixIcon={<Settings size={16} />}>Open Settings</Button>
      }
      {...args}
    >
      <Dialog.Form
        cancelButton="Cancel"
        submitButton="Save Changes"
        onSubmit={(e) => {
          e.preventDefault()
          alert("Form submitted!")
        }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </Dialog.Form>
    </Dialog>
  ),
  args: {
    title: "User Settings",
    children: <div>Content</div>,
  },
}

export const DestructiveAction: Story = {
  render: (args) => (
    <Dialog
      trigger={
        <Button intent="danger" prefixIcon={<Trash2 size={16} />}>
          Delete
        </Button>
      }
      {...args}
    >
      <Dialog.Form
        destructive
        cancelButton="Cancel"
        submitButton="Delete"
        onSubmit={(e) => {
          e.preventDefault()
          alert("Item deleted!")
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="text-red-500" size={24} />
          <div>
            <p className="font-medium">
              Are you sure you want to delete this item?
            </p>
            <p className="text-sm text-text-muted">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </Dialog.Form>
    </Dialog>
  ),
  args: {
    title: "Delete Item",
    children: <div>Content</div>,
  },
}

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="space-y-4">
        <Button onClick={() => setIsOpen(true)}>Open Controlled Dialog</Button>
        <Dialog
          title="Controlled Dialog"
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className="space-y-4">
            <p>This dialog is controlled by React state.</p>
            <Button onClick={() => setIsOpen(false)} intent="primary">
              Close Dialog
            </Button>
          </div>
        </Dialog>
      </div>
    )
  },
  args: {
    title: "Controlled Dialog",
    children: <div>Content</div>,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Dialog
        title="Regular Size"
        size="regular"
        trigger={<Button>Regular</Button>}
      >
        <p>This is a regular-sized dialog (max-w-lg).</p>
      </Dialog>

      <Dialog title="Large Size" size="large" trigger={<Button>Large</Button>}>
        <p>This is a large-sized dialog (max-w-xl).</p>
      </Dialog>

      <Dialog
        title="Extra Large Size"
        size="xlarge"
        trigger={<Button>XLarge</Button>}
      >
        <p>This is an extra large-sized dialog (max-w-2xl).</p>
      </Dialog>

      <Dialog
        title="2X Large Size"
        size="2xlarge"
        trigger={<Button>2XLarge</Button>}
      >
        <p>This is a 2x large-sized dialog (max-w-3xl).</p>
      </Dialog>
    </div>
  ),
  args: {
    title: "Size Examples",
    children: <div>Content</div>,
  },
}

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Dialog
        title="Top Left"
        position="top-left"
        trigger={<Button variant="minimal">Top Left</Button>}
      >
        <p>Dialog positioned at top-left of viewport.</p>
      </Dialog>

      <Dialog
        title="Top Center"
        position="top-center"
        trigger={<Button variant="minimal">Top Center</Button>}
      >
        <p>Dialog positioned at top-center of viewport.</p>
      </Dialog>

      <Dialog
        title="Top Right"
        position="top-right"
        trigger={<Button variant="minimal">Top Right</Button>}
      >
        <p>Dialog positioned at top-right of viewport.</p>
      </Dialog>

      <Dialog
        title="Center Left"
        position="center-left"
        trigger={<Button variant="minimal">Center Left</Button>}
      >
        <p>Dialog positioned at center-left of viewport.</p>
      </Dialog>

      <Dialog
        title="Center Center"
        position="center-center"
        trigger={<Button variant="minimal">Center Center</Button>}
      >
        <p>Dialog positioned at center-center of viewport.</p>
      </Dialog>

      <Dialog
        title="Center Right"
        position="center-right"
        trigger={<Button variant="minimal">Center Right</Button>}
      >
        <p>Dialog positioned at center-right of viewport.</p>
      </Dialog>

      <Dialog
        title="Bottom Left"
        position="bottom-left"
        trigger={<Button variant="minimal">Bottom Left</Button>}
      >
        <p>Dialog positioned at bottom-left of viewport.</p>
      </Dialog>

      <Dialog
        title="Bottom Center"
        position="bottom-center"
        trigger={<Button variant="minimal">Bottom Center</Button>}
      >
        <p>Dialog positioned at bottom-center of viewport.</p>
      </Dialog>

      <Dialog
        title="Bottom Right"
        position="bottom-right"
        trigger={<Button variant="minimal">Bottom Right</Button>}
      >
        <p>Dialog positioned at bottom-right of viewport.</p>
      </Dialog>
    </div>
  ),
  args: {
    title: "Position Examples",
    children: <div>Content</div>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click any button to see dialogs positioned at different locations in the viewport.",
      },
    },
  },
}

export const NoPadding: Story = {
  render: (args) => (
    <Dialog trigger={<Button>Open Gallery</Button>} {...args}>
      <div className="bg-gray-100 dark:bg-gray-800 h-64 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">
          This dialog has no padding, perfect for images or full-width content.
        </p>
      </div>
    </Dialog>
  ),
  args: {
    title: "Image Gallery",
    noPadding: true,
    size: "large",
    children: <div>Content</div>,
  },
}

export const NoCloseIcon: Story = {
  render: (args) => (
    <Dialog trigger={<Button>Open Notice</Button>} {...args}>
      <Dialog.Form
        cancelButton={false}
        submitButton="I Understand"
        onSubmit={(e) => {
          e.preventDefault()
          alert("Acknowledged!")
        }}
      >
        <div className="space-y-4">
          <p>
            This dialog has no close icon, forcing users to interact with the
            form.
          </p>
          <p className="text-sm text-text-muted">
            This is useful for important notices or required acknowledgments.
          </p>
        </div>
      </Dialog.Form>
    </Dialog>
  ),
  args: {
    title: "Important Notice",
    hideCloseIcon: true,
    children: <div>Content</div>,
  },
}

export const ComplexForm: Story = {
  render: (args) => (
    <Dialog
      trigger={
        <Button intent="primary" prefixIcon={<Plus size={16} />}>
          New Project
        </Button>
      }
      {...args}
    >
      <Dialog.Form
        cancelButton="Cancel"
        submitButton="Create Project"
        onSubmit={(e) => {
          e.preventDefault()
          alert("Project created!")
        }}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Project Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
              rows={3}
              placeholder="Enter project description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Project Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800">
              <option>Web Application</option>
              <option>Mobile App</option>
              <option>Desktop Application</option>
              <option>API Service</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="private" />
            <label htmlFor="private" className="text-sm">
              Make this project private
            </label>
          </div>
        </div>
      </Dialog.Form>
    </Dialog>
  ),
  args: {
    title: "Create New Project",
    size: "large",
    children: <div>Content</div>,
  },
}
