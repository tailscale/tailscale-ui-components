import { useEffect, useMemo, useState } from "react"

export type ListPaginationData<T> = {
  pageData: T[]
  currentPage: number // zero-indexed
  pageCount: number // total number of pages
  isFirstPage: boolean
  isLastPage: boolean
  nextPage: () => void
  previousPage: () => void
  jumpToFirst: () => void
  jumpToLast: () => void
}

/**
 * useListPagination returns pageSize chunks of data,
 * along with functions to use to get the next or previous page.
 * currentPage is the zero-indexed page number for pageData.
 */
export default function useListPagination<T = any>(
  data: readonly T[],
  pageSize: number
): ListPaginationData<T> {
  const [currentPage, setCurrentPage] = useState(0)
  const pageCount = Math.ceil(data.length / pageSize)

  useEffect(() => {
    // When the data or page size changes, ensure we're within the bounds of
    // the data.
    const count = Math.ceil(data.length / pageSize)
    setCurrentPage((current) => constrain(current, 0, count - 1))
  }, [data.length, pageSize])

  const nextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1)
    }
  }
  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const jumpToFirst = () => {
    if (currentPage > 0) {
      setCurrentPage(0)
    }
  }

  const jumpToLast = () => {
    if (currentPage < pageCount) {
      setCurrentPage(pageCount - 1)
    }
  }

  const pageData = useMemo(() => {
    const pageStart = currentPage * pageSize
    const pageEnd = (currentPage + 1) * pageSize
    return data.slice(pageStart, pageEnd)
  }, [currentPage, data, pageSize])

  return {
    pageData,
    currentPage,
    pageCount,
    nextPage,
    previousPage,
    isFirstPage: currentPage === 0,
    isLastPage: currentPage === pageCount - 1,
    jumpToFirst,
    jumpToLast,
  }
}

function constrain(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max)
}
