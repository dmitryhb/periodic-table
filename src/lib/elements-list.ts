import {IItemsList} from '@/lib/items-list'
import {Element, IElement} from '@/lib/element'
import {CapabilitiesList} from '@/lib/capabilities-list'
import {Capability} from '@/lib/capability'

export class ElementsList implements IItemsList<Element, IElement> {
  private _items: Element[] = []
  private _capabilities: CapabilitiesList | null = null

  /**
   * Capabilities getter.
   */
  get capabilities(): CapabilitiesList | null {
    return this._capabilities
  }

  /**
   * Capabilities setter.
   * @param value
   */
  set capabilities(value: CapabilitiesList | null) {
    this._capabilities = value
  }

  /**
   * Items getter.
   */
  get items(): Element[] {
    return this._items
  }

  /**
   * Items setter.
   * @param value
   */
  set items(value: Element[]) {
    this._items = value
  }

  /**
   * Initialize elements from JSON data.
   * @param data
   */
  public fromArray(data: IElement[]): void {
    this._items = []
    data.forEach((item: IElement): void => {
      const capability: Capability | undefined = this.capabilities ? this.capabilities.findById(item.capability as string) : undefined
      const instance: Element = new Element(item, capability)
      this._items.push(instance)
    })
  }
}
