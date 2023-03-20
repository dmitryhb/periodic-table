import {IItemsList} from '@/lib/items-list'
import {IPlatform} from '@/lib/platform'

export class PlatformsList implements IItemsList<IPlatform, IPlatform> {
  private _items: IPlatform[] = []

  /**
   * Items getter.
   */
  get items(): IPlatform[] {
    return this._items
  }

  /**
   * Items setter.
   * @param value
   */
  set items(value: IPlatform[]) {
    this._items = value
  }

  /**
   * Initialize capabilities from JSON data.
   * @param data
   */
  public fromArray(data: IPlatform[]): void {
    this._items = []
    data.forEach((item: IPlatform): void => {
      this._items.push(item)
    })
  }
}
