import React from "react"
import { Button } from "../button/button"
import { ToastProvider, useToaster } from "./toaster"

const meta = {
  title: "Components/Toaster",
  component: ToastProvider,
}
export default meta

const DemoToasterButtons = () => {
  const toaster = useToaster()

  const showDefault = () => toaster.show({ message: "Hello World" })

  const showDanger = () =>
    toaster.show({ message: "Danger!!", variant: "danger" })

  const showWithAction = () =>
    toaster.show({
      message: "Additional action button!",
      additionalAction: {
        label: "Undo",
        onClick: () => alert("Undo clicked!"),
      },
    })

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Button onClick={showDefault}>Default</Button>
      <Button onClick={showDanger}>Danger</Button>
      <Button onClick={showWithAction}>Additional Action</Button>
      <Button onClick={toaster.clear}>Clear All</Button>
    </div>
  )
}

export const Basic = () => (
  <ToastProvider>
    <DemoToasterButtons />
  </ToastProvider>
)
