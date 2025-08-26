import React from "react"
import { ListPaginationData } from "../../hooks/list-pagination"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "../../icons"
import { Button } from "../button/button"
const simpleNavMax = 4 // maximum number of pages in a pagestepper before we append first/last buttons

export function PageStepper<T>(props: ListPaginationData<T>) {
  const showJumps = props.pageCount > simpleNavMax
  return (
    <div className="flex items-center">
      {showJumps && (
        <Button
          variant="minimal"
          sizeVariant="small"
          className="px-1.5"
          iconOnly
          aria-label="First page"
          disabled={props.isFirstPage}
          onClick={() => {
            props.jumpToFirst()
            window.scrollTo(0, 0)
          }}
        >
          <ChevronsLeft />
        </Button>
      )}
      <Button
        variant="minimal"
        sizeVariant="small"
        className="px-1.5"
        iconOnly
        aria-label="Previous page"
        disabled={props.isFirstPage}
        onClick={() => {
          props.previousPage()
          window.scrollTo(0, 0)
        }}
      >
        <ChevronLeft />
      </Button>
      <p className="font-medium mx-2">
        Page {props.currentPage + 1} of {props.pageCount}
      </p>
      <Button
        variant="minimal"
        sizeVariant="small"
        className="px-1.5"
        iconOnly
        aria-label="Next page"
        disabled={props.isLastPage}
        onClick={() => {
          props.nextPage()
          window.scrollTo(0, 0)
        }}
      >
        <ChevronRight />
      </Button>
      {showJumps && (
        <Button
          variant="minimal"
          sizeVariant="small"
          className="px-1.5"
          iconOnly
          aria-label="Last page"
          disabled={props.isLastPage}
          onClick={() => {
            props.jumpToLast()
            window.scrollTo(0, 0)
          }}
        >
          <ChevronsRight />
        </Button>
      )}
    </div>
  )
}
