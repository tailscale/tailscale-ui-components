import * as ToastPrimitive from "@radix-ui/react-toast"
import cx from "classnames"
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { X } from "../../icons"
import { Button } from "../button/button"

export type Toaster = {
  clear: () => void
  dismiss: (key: string) => void
  show: (props: Toast) => string
}

export type Toast = {
  key?: string // key is a unique string value that ensures only one toast with a given key is shown at a time.
  className?: string
  variant?: "danger" // styling for the toast, undefined is neutral, danger is for failed requests
  message: React.ReactNode
  timeout?: number
  added?: number // timestamp of when the toast was added
  additionalAction?: ToastAction // additional action for the toast. Rendered as a button to the left of "X".
}

export type ToastAction = {
  label: string // label for the resulting button
  onClick: () => void // onClick action for the button
  persistToastAfterClick?: boolean // whether the toast should be persisted after the click, defaults to dismissing the toast
}

type ToastWithKey = Toast & { key: string }

// Context for Toaster
type ToasterContextType = {
  show: (toast: Toast) => string
  dismiss: (key: string) => void
  clear: () => void
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined)

export function useToaster() {
  const ctx = useContext(ToasterContext)
  if (!ctx) throw new Error("useToaster must be used within a ToastProvider")
  return ctx
}

type ToastProviderProps = {
  children: React.ReactNode
  canEscapeKeyClear?: boolean
  maxToasts?: number
}

/**
 * Toasts show transient success or error notifications for asynchronous actions. The React component is not directly used, toasts are shown via the useToaster hook.
 */
export function ToastProvider({
  children,
  canEscapeKeyClear = true,
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastWithKey[]>([])

  // Show a toast
  const show = useCallback(
    (toast: Toast) => {
      const key =
        toast.key || Date.now().toString() + Math.random().toString(36).slice(2)
      setToasts((prev) => {
        // If key exists, update; else add
        const idx = prev.findIndex((t) => t.key === key)
        let next: ToastWithKey[]
        if (idx !== -1) {
          next = [...prev]
          next[idx] = { ...toast, key }
        } else {
          next = [...prev, { ...toast, key }]
        }
        // Only keep last maxToasts
        return next.slice(-maxToasts)
      })
      return key
    },
    [maxToasts]
  )

  const dismiss = useCallback((key: string) => {
    setToasts((prev) => prev.filter((t) => t.key !== key))
  }, [])

  const clear = useCallback(() => setToasts([]), [])

  // Escape key clears all toasts
  useEffect(() => {
    if (!canEscapeKeyClear) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" || e.key === "Esc") clear()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [canEscapeKeyClear, clear])

  return (
    <ToasterContext.Provider value={{ show, dismiss, clear }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        <ToastViewport toasts={toasts} dismiss={dismiss} />
      </ToastPrimitive.Provider>
    </ToasterContext.Provider>
  )
}

// Toast viewport and rendering of toasts
function ToastViewport({
  toasts,
  dismiss,
}: {
  toasts: ToastWithKey[]
  dismiss: (key: string) => void
}) {
  return (
    // <ToastPrimitive.Viewport className="fixed bottom-6 right-6 z-[99] flex flex-col gap-2 w-[85vw] sm:min-w-[400px] sm:max-w-[500px]">
    <ToastPrimitive.Viewport className="fixed bottom-6 right-6 z-[99] flex flex-col gap-2 w-[85vw] sm:min-w-[400px] sm:max-w-[500px]">
      {toasts.map((toast) => (
        <ToastPrimitive.Root
          key={toast.key}
          open={true}
          duration={toast.timeout ?? 5000}
          onOpenChange={(open) => {
            if (!open) dismiss(toast.key)
          }}
          className={cx(
            "shadow-sm rounded-md text-md flex items-center justify-between px-0 py-0",
            {
              "text-white bg-gray-700 dark:bg-gray-700 dark:border dark:border-gray-600":
                toast.variant === undefined,
              "text-white bg-red-400 dark:bg-red-500":
                toast.variant === "danger",
            },
            toast.className
          )}
          aria-live="polite"
        >
          <span className="pl-4 py-3 pr-2">{toast.message}</span>
          <div
            className={cx("mr-1.5", {
              "flex items-center gap-1": toast.additionalAction,
            })}
          >
            {toast.additionalAction && (
              <Button
                variant="minimal"
                className="!text-white hover:!bg-white hover:!bg-opacity-15"
                onClick={() => {
                  toast.additionalAction?.onClick()
                  if (!toast.additionalAction?.persistToastAfterClick) {
                    dismiss(toast.key)
                  }
                }}
              >
                {toast.additionalAction.label}
              </Button>
            )}
            <Button
              variant="minimal"
              iconOnly
              className="!text-white hover:!bg-white hover:!bg-opacity-15"
              onClick={() => dismiss(toast.key)}
            >
              <X size="1em" />
            </Button>
          </div>
        </ToastPrimitive.Root>
      ))}
    </ToastPrimitive.Viewport>
  )
}
