import React, { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: { control: "text" },
    label: { control: "text" },
    description: { control: "text" },
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    truncateLabel: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled wrapper for stories
const CheckboxWrapper = ({
  checked: controlledChecked = false,
  ...args
}: any) => {
  const [checked, setChecked] = useState(controlledChecked);

  // Update internal state when the controlled prop changes (from Storybook controls)
  useEffect(() => {
    setChecked(controlledChecked);
  }, [controlledChecked]);

  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

// Default checkbox
export const Default: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    id: "default-checkbox",
    label: "Default checkbox",
    checked: false,
  },
};

// Checked state
export const Checked: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    id: "checked-checkbox",
    label: "Checked checkbox",
    checked: true,
  },
};

// With description
export const WithDescription: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    id: "description-checkbox",
    label: "Enable notifications",
    description: "Get notified when someone mentions you in a comment.",
    checked: false,
  },
};

// Disabled unchecked
export const DisabledUnchecked: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    id: "disabled-unchecked",
    label: "Disabled unchecked",
    disabled: true,
    checked: false,
  },
};

// Disabled checked
export const DisabledChecked: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    id: "disabled-checked",
    label: "Disabled checked",
    disabled: true,
    checked: true,
  },
};

// Long label
export const LongLabel: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    id: "long-label",
    label:
      "This is a very long label that demonstrates how the checkbox component handles lengthy text content",
    checked: false,
  },
};

// Truncated label
export const TruncatedLabel: Story = {
  render: (args) => (
    <div style={{ width: "200px" }}>
      <CheckboxWrapper {...args} />
    </div>
  ),
  args: {
    id: "truncated-label",
    label:
      "This is a very long label that will be truncated when the truncateLabel prop is enabled",
    truncateLabel: true,
    checked: false,
  },
};

// JSX Label
export const JSXLabel: Story = {
  render: (args) => <CheckboxWrapper {...args} />,
  args: {
    id: "jsx-label",
    label: (
      <span>
        I agree to the <strong>Terms of Service</strong> and{" "}
        <em>Privacy Policy</em>
      </span>
    ),
    checked: false,
  },
};

// All States Showcase
export const AllStates = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold mb-4">Checkbox States</h3>

      <div className="space-y-3">
        <CheckboxWrapper id="state-1" label="Unchecked" checked={false} />

        <CheckboxWrapper id="state-2" label="Checked" checked={true} />

        <CheckboxWrapper
          id="state-3"
          label="Disabled unchecked"
          disabled={true}
          checked={false}
        />

        <CheckboxWrapper
          id="state-4"
          label="Disabled checked"
          disabled={true}
          checked={true}
        />

        <CheckboxWrapper
          id="state-5"
          label="With description"
          description="Additional context about this option"
          checked={false}
        />

        <CheckboxWrapper
          id="state-6"
          label="Long label that demonstrates text wrapping behavior in the checkbox component"
          checked={false}
        />
      </div>
    </div>
  ),
};

// Form Example
export const FormExample = {
  render: () => {
    const [preferences, setPreferences] = useState({
      notifications: false,
      marketing: false,
      updates: true,
      analytics: false,
    });

    const handleChange =
      (key: keyof typeof preferences) => (checked: boolean) => {
        setPreferences((prev) => ({ ...prev, [key]: checked }));
      };

    return (
      <div className="max-w-md p-6 border rounded-lg bg-white">
        <h3 className="text-lg font-semibold mb-4">Preferences</h3>

        <div className="space-y-4">
          <Checkbox
            id="notifications"
            label="Email notifications"
            description="Receive email notifications for important updates"
            checked={preferences.notifications}
            onChange={handleChange("notifications")}
          />

          <Checkbox
            id="marketing"
            label="Marketing emails"
            description="Receive promotional emails and special offers"
            checked={preferences.marketing}
            onChange={handleChange("marketing")}
          />

          <Checkbox
            id="updates"
            label="Product updates"
            description="Get notified about new features and improvements"
            checked={preferences.updates}
            onChange={handleChange("updates")}
          />

          <Checkbox
            id="analytics"
            label="Analytics and usage data"
            description="Help us improve by sharing anonymous usage statistics"
            checked={preferences.analytics}
            onChange={handleChange("analytics")}
          />
        </div>

        <div className="mt-6 pt-4 border-t">
          <pre className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            {JSON.stringify(preferences, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};
