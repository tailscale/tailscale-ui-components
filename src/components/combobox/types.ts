/**
 * ComboboxValue represents a selectable value in a Combobox.
 *
 * value - a string value (usually unique) for this ComboboxValue (required)
 * label - the label that will be shown in the combo box. If not specified, id will be shown instead
 * data - typed information to carry along with this value, not used directly by the combobox but available for use in renderItem (optional)
 */
export class ComboboxValue<T = any> {
  readonly value: string
  private readonly _label?: string
  readonly data?: T

  constructor({
    value,
    label,
    data,
  }: {
    value: string
    label?: string
    data?: T
  }) {
    this.value = value
    this._label = label
    this.data = data
  }

  displayLabel(): string {
    return this._label || this.value
  }

  /**
   * Case-insensitively checks whether either value or label includes the supplied text.
   *
   * @param text
   * @returns true if the either value or the label includes text.
   */
  includesIgnoreCase(text: string): boolean {
    const textLower = text.toLocaleLowerCase()
    return (
      this.value.toLocaleLowerCase().includes(textLower) ||
      (this._label !== undefined &&
        this._label.toLocaleLowerCase().includes(textLower))
    )
  }

  /**
   * Case-insensitively checks whether either value or label matches the supplied text.
   *
   * @param text
   * @returns true if the either value or the label matches the text.
   */
  equalsIgnoreCase(text: string): boolean {
    const textLower = text.toLocaleLowerCase()
    return (
      this.value.toLocaleLowerCase() === textLower ||
      (this._label !== undefined &&
        this._label.toLocaleLowerCase() === textLower)
    )
  }
}
