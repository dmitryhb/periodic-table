import {IItemsList} from '@/lib/items-list'
import {Capability, ICapability} from '@/lib/capability'

export class CapabilitiesList implements IItemsList<Capability, ICapability> {
  private _items: Capability[] = []

  /**
   * Items getter.
   */
  get items(): Capability[] {
    return this._items
  }

  /**
   * Items setter.
   * @param value
   */
  set items(value: Capability[]) {
    this._items = value
  }

  /**
   * Initialize capabilities from JSON data.
   * @param data
   */
  public fromArray(data: ICapability[]): void {
    this._items = []
    data.forEach((item: ICapability): void => {
      const instance = new Capability(item)
      this._items.push(instance)
    })
  }

  /**
   * Find capability by ID.
   * @param id
   */
  public findById(id: string): Capability | undefined {
    return this._items.find((capability: Capability) => id === capability.id)
  }
}
