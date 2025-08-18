import type { Meta, StoryObj } from "@storybook/react"
import { CountryFlag } from "./country-flags"
import { countryList } from "./country-flags"

const countryOptions = countryList.map(([name, code]) => ({
  label: `${name} (${code.toUpperCase()})`,
  value: code,
}))

const meta: Meta<typeof CountryFlag> = {
  title: "components/CountryFlag",
  component: CountryFlag,
  argTypes: {
    country: {
      control: { type: "select" },
      options: countryOptions.map(opt => opt.value),
    },
  },
}

export default meta
type Story = StoryObj<typeof CountryFlag>

export const Selectable: Story = {
  args: {
    country: countryOptions[0].value,
  },
}