import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import useListPagination from "src/hooks/list-pagination"
import { PageStepper } from "./page-stepper"

const meta: Meta<typeof PageStepper> = {
  title: "Components/PageStepper",
  component: PageStepper,
}
export default meta

type Story = StoryObj<typeof PageStepper>

export const Default: Story = {
  render: function PageStepperStory() {
    // rigged list data
    const data = Array.from({ length: 23 }, (_, i) => `Item ${i + 1}`)
    const pageSize = 5
    const pagination = useListPagination(data, pageSize)
    return (
      <div>
        <PageStepper {...pagination} />
        <ul style={{ marginTop: 16 }}>
          {pagination.pageData.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    )
  },
}
