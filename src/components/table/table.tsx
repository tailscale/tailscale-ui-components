import { NullValue } from "../null/null"

const cellHeaderBase =
  "pr-3 py-2 uppercase font-bold text-xs tracking-wider leading-4 text-text-muted align-middle"

const aclGUICellBodyBase = "pl-1 pr-3 py-4 h-[3.25rem]"
const cellActionBase = "flex justify-end ml-auto md:ml-0 relative"

/**
 * `table` is a collection of styles for building tabular displays.
 */
export const table = {
  /**
   * cellExpand grows a cell to fill all available space given to it.
   */
  cellExpand: "flex-auto",
  /**
   * cellAction styles a cell to hold an action button.
   */
  cellAction: cellActionBase,
  cellActionFixed: "min-w-[4%]",

  /**
   * NullValue is a faded em dash, representing an empty or missing value from a
   * table.
   */
  NullValue,

  /**
   * cellHeader adds standard bold uppercasing and leading for table heders.
   */
  cellHeader: `pl-1 ${cellHeaderBase}`,

  /**
   * cellHeaderCollapsibleFirstCol add standard bold upercasing and leading for
   * table headers, and adds appropriate padding to account for the chevron used
   * in the first column of a CollapsibleTableRow.
   */
  cellHeaderCollapsibleFirstCol: `pl-11 ${cellHeaderBase}`,

  /**
   * cellBody adds standard padding and top alignment of text for table body cells.
   */
  cellBody: "pl-1 pr-3 py-2 align-top",

  aclGUICellBody: `${aclGUICellBodyBase} align-middle`,

  aclGUICellBodyAlignTop: `${aclGUICellBodyBase} align-top`,

  aclGUICellAction: `${cellActionBase} !py-2`,

  cellSizeXs: "w-1/6",
  cellSizeSm: "w-1/5",
  cellSizeMd: "w-1/4",
  cellSizeLg: "w-5/12",
}