import {Capability, ICapability} from '@/lib/capability'

export interface IElement {
  id: string,
  element: string
  name: string
  capability: ICapability | null | string
  details: string
}

export class Element implements IElement {
  private _id: string = ''
  private _element: string = ''
  private _name: string = ''
  private _capability: ICapability | null = null
  private _details: string = ''

  /**
   * Initialize a new instance of Element class.
   * @param data
   * @param capability
   */
  constructor (data: IElement | null = null, capability: Capability | undefined = undefined) {
    if (capability) {
      this.capability = capability
    }

    if (data) {
      this.element = data.element
      this.name = data.name
      this.details = data.details
    }
  }

  get id(): string {
    return this._id
  }

  set id(value: string) {
    this._id = value
  }

  get element(): string {
    return this._element
  }

  set element(value: string) {
    this._element = value
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  get capability(): ICapability | null {
    return this._capability
  }

  set capability(value: ICapability | null) {
    this._capability = value
  }

  get details(): string {
    return this._details
  }

  set details(value: string) {
    this._details = value
  }
}
