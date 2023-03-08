import {IElement} from '@/lib/element'

export interface ICapability {
  id: string
  color: string
  name: string
  elements: IElement[] | null
}

export class Capability implements ICapability {
  private _id: string = ''
  private _color: string = ''
  private _name: string = ''
  private _elements: IElement[] | null = null

  /**
   * Initialize a new instance of Capability class.
   * @param data
   */
  constructor (data: ICapability | null) {
    if (data) {
      this.id = data.id
      this.color = data.color
      this.name = data.name
    }
  }

  get elements(): IElement[] | null {
    return this._elements
  }

  set elements(value: IElement[] | null) {
    this._elements = value
  }

  get id(): string {
    return this._id
  }

  set id(value: string) {
    this._id = value
  }

  get color(): string {
    return this._color
  }

  set color(value: string) {
    this._color = value
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }
}
