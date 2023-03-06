import {Capability, ICapability} from '@/lib/capability'

export interface IElement {
  element: string
  name: string
  capability: ICapability | null
  details: string
}

export class Element implements IElement {
  private _element: string = ''
  private _name: string = ''
  private _capability: ICapability | null = null
  private _details: string = ''

  /**
   * Initialize a new instance of Element class.
   * @param data
   * @param capability
   */
  constructor (data: IElement | null = null, capability: Capability | null = null) {
    if (capability) {
      this.capability = capability
    }

    if (data) {
      this.element = data.element
      this.name = data.element
      this.details = data.details
    }
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
