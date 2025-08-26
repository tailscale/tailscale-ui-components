import * as DialogPrimitive from "@radix-ui/react-dialog"
import cx from "classnames"
import React, { Component, ComponentProps, FormEvent } from "react"
import { X } from "../../icons"
import { isObject } from "../../utils/util"
import { Button } from "../button/button"
import { PortalContainerContext } from "../portal-container-context"

export type DialogSize = "regular" | "large" | "xlarge" | "2xlarge"
export type DialogPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center-center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export const DIALOG_SIZES = [
  "regular",
  "large",
  "xlarge",
  "2xlarge",
] as const satisfies readonly DialogSize[]

export const DIALOG_POSITIONS = [
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center-center",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const satisfies readonly DialogPosition[]

type ButtonProp = boolean | string | Partial<ComponentProps<typeof Button>>

/**
 * ControlledDialogProps are common props required for dialog components with
 * controlled state. Since Dialog components frequently expose these props to
 * their callers, we've consolidated them here for easy access.
 */
export type ControlledDialogProps = {
  /**
   * open is a boolean that controls whether the dialog is open or not.
   */
  open: boolean
  /**
   * onOpenChange is a callback that is called when the open state of the dialog
   * changes.
   */
  onOpenChange: (open: boolean) => void
}

type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent
}>

/**
 * Dialog size style mappings
 */
const DIALOG_SIZE_STYLES: Record<DialogSize, string> = {
  regular: "max-w-lg", // TODO(amrfouad): change to "medium" to follow the rest of the design system size tokens.
  large: "max-w-xl",
  xlarge: "max-w-2xl",
  "2xlarge": "max-w-3xl",
}

/**
 * Dialog position style mappings
 */
const DIALOG_POSITION_STYLES: Record<DialogPosition, string> = {
  "top-left":
    "top-0 md:left-0 md:translate-x-0 sm:left-1/2 sm:-translate-x-1/2 mt-8 md:ml-8",
  "top-center": "top-0 left-1/2 -translate-x-1/2 mt-8",
  "top-right":
    "top-0 md:right-0 md:translate-x-0 sm:right-1/2 sm:translate-x-1/2 mt-8 md:mr-8",
  "center-left":
    "top-1/2 md:left-0 md:translate-x-0 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 md:ml-8",
  "center-center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "center-right":
    "top-1/2 md:right-0 md:translate-x-0 -translate-y-1/2 sm:right-1/2 sm:translate-x-1/2 md:mr-8",
  "bottom-left":
    "bottom-0 md:left-0 md:translate-x-0 sm:left-1/2 sm:-translate-x-1/2 mb-8 md:ml-8",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 mb-8",
  "bottom-right":
    "bottom-0 md:right-0 md:translate-x-0 sm:right-1/2 sm:translate-x-1/2 mb-8 md:mr-8",
}

type Props = {
  className?: string
  /**
   * title is the title of the dialog, shown at the top.
   */
  title: string
  /**
   * titleSuffixDecoration is added to the title, but is not part of the ARIA label for
   * the dialog. This is useful for adding a badge or other non-semantic
   * information to the title.
   */
  titleSuffixDecoration?: React.ReactNode
  /**
   * trigger is an element to use as a trigger for a dialog. Using trigger is
   * preferrable to using `open` for managing state, as it allows for better
   * focus management for screen readers.
   */
  trigger?: React.ReactNode
  /**
   * children is the content of the dialog.
   */
  children: React.ReactNode
  /**
   * defaultOpen is the default state of the dialog. This is meant to be used for
   * uncontrolled dialogs, and should not be combined with `open` or
   * `onOpenChange`.
   */
  defaultOpen?: boolean
  /**
   * restoreFocus determines whether the dialog returns focus to the trigger
   * element or not after closing.
   */
  restoreFocus?: boolean
  /**
   * onEscapeKeyDown is a callback that is called when the escape key is pressed while the dialog is open.
   */
  onEscapeKeyDown?: (e: KeyboardEvent) => void
  /**
   * onPointerDownOutside is a callback that is called when a pointer down event occurs outside the dialog.
   */
  onPointerDownOutside?: (e: PointerDownOutsideEvent) => void
  /**
   * size determines how wide the dialog box is.
   */
  size?: DialogSize
  /**
   * position determines where the dialog is positioned relative to the viewport.
   */
  position?: DialogPosition

  /**
   * hideCloseIcon determines whether the close icon is shown in the dialog.
   */
  hideCloseIcon?: boolean

  /**
   * onPadding determines whether the dialog has padding or not. This is useful for dialogs that are has images that stretch the full width of the dialog.
   * By default, the dialog has padding.
   */
  noPadding?: boolean
} & Partial<ControlledDialogProps>

const dialogOverlay =
  "fixed overflow-y-auto inset-0 py-8 z-10 bg-gray-900 bg-opacity-[0.3] dark:bg-gray-1000 dark:bg-opacity-[0.7]"
const dialogWindow = cx(
  "bg-bg-base dark:border rounded-lg absolute min-w-[19rem] w-[97%] shadow-dialog overflow-hidden",
  // We use `transform-gpu` here to force the browser to put the dialog on its
  // own layer. This helps fix some weird artifacting bugs in Safari caused by
  // box-shadows. See: https://github.com/tailscale/corp/issues/12270
  "transform-gpu"
)

/**
 * Dialog provides a modal dialog for prompting a user for input or confirmation
 * before proceeding. Built on top of Radix UI Dialog primitives.
 *
 * @example
 * ```tsx
 * // Basic dialog with trigger
 * <Dialog
 *   title="Confirm Action"
 *   trigger={<Button>Open Dialog</Button>}
 * >
 *   <p>Are you sure you want to continue?</p>
 * </Dialog>
 *
 * // Dialog with form
 * <Dialog title="User Settings" trigger={<Button>Settings</Button>}>
 *   <Dialog.Form
 *     cancelButton="Cancel"
 *     submitButton="Save"
 *     onSubmit={handleSubmit}
 *   >
 *     <input type="text" placeholder="Enter name" />
 *   </Dialog.Form>
 * </Dialog>
 *
 * // Controlled dialog
 * <Dialog
 *   title="Custom Dialog"
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   size="large"
 *   position="center-center"
 * >
 *   <p>Dialog content here</p>
 * </Dialog>
 * ```
 */
export function Dialog(props: Props) {
  const {
    open,
    defaultOpen,
    onOpenChange,
    trigger,
    title,
    titleSuffixDecoration,
    children,
    restoreFocus = true,
    onPointerDownOutside,
    onEscapeKeyDown,
    size = "regular",
    position = "top-center",
    hideCloseIcon = false,
    noPadding = false,
  } = props

  return (
    <DialogPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {trigger && (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      )}
      <PortalContainerContext.Consumer>
        {(portalContainer) => (
          <DialogPrimitive.Portal container={portalContainer}>
            <DialogPrimitive.Overlay className={dialogOverlay}>
              <DialogPrimitive.Content
                aria-describedby={undefined}
                aria-label={title}
                className={cx(
                  DIALOG_POSITION_STYLES[position],
                  dialogWindow,
                  DIALOG_SIZE_STYLES[size],
                  {
                    "p-4 md:p-6": !noPadding,
                  }
                )}
                onCloseAutoFocus={
                  // Cancel the focus restore if `restoreFocus` is set to false
                  restoreFocus === false ? (e) => e.preventDefault() : undefined
                }
                onPointerDownOutside={onPointerDownOutside}
                onEscapeKeyDown={onEscapeKeyDown}
              >
                <DialogErrorBoundary>
                  <DialogPrimitive.Title>
                    {title && (
                      <header className="flex items-center justify-between space-x-4 mb-5 mr-8">
                        <div className="font-semibold text-lg truncate">
                          {title}
                          {titleSuffixDecoration}
                        </div>
                      </header>
                    )}
                  </DialogPrimitive.Title>
                  {children}
                  {!hideCloseIcon && (
                    <DialogPrimitive.Close asChild>
                      <Button
                        variant="minimal"
                        className="absolute top-5 right-5 px-2 py-2"
                      >
                        <X aria-hidden size="1.25em" />
                      </Button>
                    </DialogPrimitive.Close>
                  )}
                </DialogErrorBoundary>
              </DialogPrimitive.Content>
            </DialogPrimitive.Overlay>
          </DialogPrimitive.Portal>
        )}
      </PortalContainerContext.Consumer>
    </DialogPrimitive.Root>
  )
}

/**
 * Dialog.Form is a standard way of providing form-based interactions in a
 * Dialog component. Prefer it to custom form implementations. See each props
 * documentation for details.
 *
 *     <Dialog.Form cancelButton submitButton="Save" onSubmit={saveThing}>
 *       <input type="text" value={myValue} onChange={myChangeHandler} />
 *     </Dialog.Form>
 */
Dialog.Form = DialogForm

export type FormProps = {
  /**
   * destructive declares whether the submit button should be styled as a danger
   * button or not. Prefer `destructive` over passing a props object to
   * `submitButton`, since objects cause unnecessary re-renders unless they are
   * moved outside the render function.
   */
  destructive?: boolean
  /**
   * children is the content of the dialog form.
   */
  children?: React.ReactNode
  /**
   * disabled determines whether the submit button should be disabled. The
   * cancel button cannot be disabled via this prop.
   */
  disabled?: boolean
  /**
   * loading determines whether the submit button should display a loading state
   * and the cancel button should be disabled.
   */
  loading?: boolean
  /**
   * cancelButton determines how the cancel button looks. You can pass `true`,
   * which adds a default button, pass a string which changes the button label,
   * or pass an object, which is a set of props to pass to a `Button` component.
   * Any unspecified props will fall back to default values.
   *
   *     <Dialog.Form cancelButton />
   *     <Dialog.Form cancelButton="Done" />
   *     <Dialog.Form cancelButton={{ children: "Back", variant: "primary" }} />
   */
  cancelButton?: ButtonProp
  /**
   * submitButton determines how the submit button looks. You can pass `true`,
   * which adds a default button, pass a string which changes the button label,
   * or pass an object, which is a set of props to pass to a `Button` component.
   * Any unspecified props will fall back to default values.
   *
   *     <Dialog.Form submitButton />
   *     <Dialog.Form submitButton="Save" />
   *     <Dialog.Form submitButton="Delete" destructive  />
   *     <Dialog.Form submitButton={{ children: "Banana", className: "bg-yellow-500" }} />
   */
  submitButton?: ButtonProp

  /**
   * onSubmit is the callback to use when the form is submitted. Using `onSubmit`
   * is preferrable to a `onClick` handler on `submitButton`, which doesn't get
   * triggered on keyboard events.
   */
  onSubmit?: (e: FormEvent) => void

  /**
   * autoFocus makes it easy to focus a particular action button without
   * overriding the button props.
   */
  autoFocus?: "submit" | "cancel"

  /**
   * footerClassName provides optional control over form footer classes.
   */
  footerClassName?: string
}

function DialogForm(props: FormProps) {
  const {
    children,
    disabled = false,
    destructive = false,
    loading = false,
    autoFocus = "submit",
    cancelButton,
    submitButton,
    footerClassName,
    onSubmit,
  } = props

  const hasFooter = Boolean(cancelButton || submitButton)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  const cancelAutoFocus = Boolean(
    cancelButton && !loading && autoFocus === "cancel"
  )
  const submitAutoFocus = Boolean(
    submitButton && !loading && !disabled && autoFocus === "submit"
  )
  const submitIntent = destructive ? "danger" : "primary"

  let cancelButtonEl = null

  if (cancelButton) {
    cancelButtonEl =
      cancelButton === true ? (
        <Button
          {...cancelButtonDefaultProps}
          autoFocus={cancelAutoFocus}
          disabled={loading}
        />
      ) : typeof cancelButton === "string" ? (
        <Button
          {...cancelButtonDefaultProps}
          autoFocus={cancelAutoFocus}
          children={cancelButton}
          disabled={loading}
        />
      ) : (
        <Button
          {...cancelButtonDefaultProps}
          autoFocus={cancelAutoFocus}
          disabled={loading}
          {...cancelButton}
        />
      )

    const hasCustomCancelAction =
      isObject(cancelButton) && cancelButton.onClick !== undefined
    if (!hasCustomCancelAction) {
      cancelButtonEl = (
        <DialogPrimitive.Close asChild>{cancelButtonEl}</DialogPrimitive.Close>
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {children}
      {hasFooter && (
        <footer
          className={cx("flex mt-10 justify-end space-x-4", footerClassName)}
        >
          {cancelButtonEl}
          {submitButton && (
            <>
              {submitButton === true ? (
                <Button
                  {...submitButtonDefaultProps}
                  intent={submitIntent}
                  autoFocus={submitAutoFocus}
                  disabled={loading || disabled}
                  loading={loading}
                />
              ) : typeof submitButton === "string" ? (
                <Button
                  {...submitButtonDefaultProps}
                  intent={submitIntent}
                  children={submitButton}
                  autoFocus={submitAutoFocus}
                  disabled={loading || disabled}
                  loading={loading}
                />
              ) : (
                <Button
                  {...submitButtonDefaultProps}
                  intent={submitIntent}
                  autoFocus={submitAutoFocus}
                  disabled={loading || disabled}
                  {...submitButton}
                  loading={loading}
                />
              )}
            </>
          )}
        </footer>
      )}
    </form>
  )
}

const cancelButtonDefaultProps: Pick<
  ComponentProps<typeof Button>,
  "type" | "intent" | "sizeVariant" | "children"
> = {
  type: "button",
  intent: "base",
  sizeVariant: "medium",
  children: "Cancel",
}

const submitButtonDefaultProps: Pick<
  ComponentProps<typeof Button>,
  "type" | "sizeVariant" | "children" | "autoFocus"
> = {
  type: "submit",
  sizeVariant: "medium",
  children: "Submit",
}

type DialogErrorBoundaryProps = {
  children: React.ReactNode
}

class DialogErrorBoundary extends Component<
  DialogErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: DialogErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div className="font-semibold text-lg">Something went wrong.</div>
    }

    return this.props.children
  }
}
