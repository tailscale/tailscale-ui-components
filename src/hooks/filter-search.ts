export type FilterToken = string // eg: is:internal, port:3000, owner:user@example.com
export type FilterPrefix = string // eg: is, port, owner

// FilterFunction is a simple filter that takes a record and returns a boolean
// representing whether the record should be shown (true) or hidden (false).
//
// eg. is:internal, is:external
export type FilterFunction<R, T = undefined> = (record: R, args: T) => boolean

export type FilterProps<R> = {
  data: R[]
  query: string
  simpleFilters: Record<FilterToken, FilterFunction<R>>
  paramFilters: Record<FilterPrefix, FilterFunction<R, string[]>>
}

/**
 * useFilterSearch provides a hook that takes a given dataset, and filters it
 * based on a query language defined by `simpleFilters` and `paramFitlers`.
 * Simple filters are string tags, like "is:external" and
 * param filters are string tags with arguments, like "os:<query>".
 */
export default function useFilterSearch<R>({
  data,
  query = "",
  simpleFilters,
  paramFilters,
}: FilterProps<R>) {
  const [queryWithoutFilters, filterFn] = parseQuery(
    query,
    simpleFilters,
    paramFilters
  )
  const results = data.filter(filterFn)

  return { results, queryWithoutFilters }
}

/**
 * parseQuery takes a query string and a set of filters to match it against,
 * and returns a query string without filter tokens, and a `filter` function
 * that filters an array of records.
 */
function parseQuery<R>(
  query: string,
  simpleFilters: Record<FilterToken, FilterFunction<R>>,
  paramFilters: Record<FilterPrefix, FilterFunction<R, string[]>>
): [string, (record: R, index: number, arr: R[]) => boolean] {
  const tokens = query.split(" ")
  const plainTokens = []
  const filterFns: Function[] = []

  for (let token of tokens) {
    const tok = token.toLowerCase()

    // All filter functions have a `:` character. If this token doesn't have
    // that, it can't be a filter, so we fast-track.
    if (!tok.includes(":")) {
      plainTokens.push(token)
      continue
    }
    const prefix = tok.split(":")[0]

    // If the token is a simple filter, add that to the filter list.
    const simpleFilter = simpleFilters[tok]
    if (typeof simpleFilter === "function") {
      filterFns.push(simpleFilter)
      continue
    }

    // If the token is a parameterized filter, try parsing it.
    const paramFilter = paramFilters[prefix]
    if (typeof paramFilter === "function") {
      const matches = deserializeParamFilterToken(tok, prefix)
      if (!matches.result) {
        continue
      }
      filterFns.push((record: R) => paramFilter(record, matches.args))
      continue
    }

    // If it doesn't match any filter, treat it as a search term.
    plainTokens.push(token)
  }

  // filterFn combines all the possible filters into subset that applies to
  // this query. Every filter must match for the device to be included in the
  // results.
  const filterFn = (record: R) => filterFns.every((fn) => fn(record))

  return [plainTokens.join(" "), filterFn]
}

/**
 * deserializeParamFilterToken parses a string filter token into the list
 * of its parameter arguments. If the token cannot be successfully parsed,
 * `{ result: false }` is returned.
 *
 * Examples:
 *
 * 1. Inputs: `token = "type:SSH,VNC,RDP"` and `filterPrefix = "type"`
 *    Output: `{ result: true, args: ["SSH", "VNC", "RDP"] }`
 *
 * 2. Inputs: `query = "owner:"` and `filterPrefix = "owner"`
 *    Output: `{ result: false }`
 */
function deserializeParamFilterToken(
  token: FilterToken,
  prefix: FilterPrefix
): { result: false } | { result: true; args: string[] } {
  const parts = token.split(":")
  if (parts.length < 2) {
    return { result: false } // invalid token
  }
  const [tag, ...arg] = parts
  if (tag !== prefix) {
    return { result: false } // wrong prefix
  }
  const args = arg.join(":").split(",")
  if (args.length === 0) {
    return { result: false } // no args provided in token
  }

  return { result: true, args }
}

/**
 * deserializeFilterInQuery parses all appearances of `filterPrefix` tokens
 * in `query` and returns the combined list of their parameter arguments.
 *
 * Examples:
 *
 * 1. Inputs: `query = "is:shared type:SSH,VNC,RDP"` and `filterPrefix = "type"`
 *    Output: `["SSH", "VNC" "RDP"]`
 *
 * 2. Inputs: `query = "is:shared type:SSH,VNC,RDP"` and `filterPrefix = "owner"`
 *    Output: `[]`
 */
export function deserializeFilterInQuery(
  query: string,
  filterPrefix: FilterPrefix
): string[] {
  return (
    query
      .split(" ")
      // TODO: This implementation will fall short for some callers because
      // it treats "or" and "and" filters as if they were the same (eg. the
      // same result will be produced whether the query was "type:SSH type:VNC"
      // or "type:SSH,VNC"). Depending on the caller, this may not be the
      // desired implementation.
      .filter((term) => term.startsWith(`${filterPrefix}:`))
      .flatMap((term) => {
        const items = deserializeParamFilterToken(term, filterPrefix)
        return items.result ? items.args : []
      })
  )
}

/**
 * serializeFilterInQuery does the opposite of deserializeFilterInQuery. It takes
 * an array of the desired `args` for a `filterPrefix` and returns the modified
 * `query` that includes that filter.
 *
 * Examples:
 *
 * 1. Inputs: `query = "is:shared type:SSH,VNC,RDP"`, `filterPrefix = "type"`, `args = ["VNC","HTTP"]`
 *    Output: `"is:shared type:VNC,HTTP"`
 *
 * 2. Inputs: `query = "is:shared type:SSH,VNC,RDP"`, `filterPrefix = "owner"`, `args = ["sonia"]`
 *    Output: `"is:shared type:SSH,VNC,RDP owner:sonia"`
 */
export function serializeFilterInQuery(
  query: string,
  filterPrefix: FilterPrefix,
  args: string[]
): string {
  let terms =
    query !== ""
      ? query
          .split(" ")
          // Remove any current `filterPrefix` terms.
          .filter((term) => !term.startsWith(`${filterPrefix}:`))
      : []

  if (args.length > 0) {
    const newTerm = `${filterPrefix}:${args.join(",")}`
    terms.push(newTerm)
  }
  return terms.join(" ")
}
