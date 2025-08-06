import cx from "classnames"
import React from "react"
import { AlertTriangle } from "src/ui/icons"
import Spinner from "src/ui/spinner"

type Props = {
  error?: { message: string }
  loadingMessage?: string
  className?: string
}

/**
 * `LoadingBlock` is a standard component for displaying state about data that's
 * loading within a card. It displays a spinner or an error depending on the
 * loading state.
 *
 *     if (error) {
 *       return <LoadingBlock error={error} />
 *     } else if (!data) {
 *       return <LoadingBlock loadingMessage="Loading data..." />
 *     }
 */
export default function LoadingBlock(props: Props) {
  const { error, loadingMessage, className } = props
  return (
    <div
      className={cx(
        "w-full p-3 flex items-center justify-center text-sm",
        className
      )}
    >
      {error ? (
        <div className="flex items-center justify-center">
          <AlertTriangle className="mr-3 text-red-400" size="1.25rem" />
          <div>
            <strong>Error:</strong> {error.message}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-text-muted">
          <Spinner className="text-gray-400" size="sm" />
          {loadingMessage && <span className="ml-3">{loadingMessage}</span>}
        </div>
      )}
    </div>
  )
}
