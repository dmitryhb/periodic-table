import {Element, IElement} from '@/lib/element'
import {useStore} from 'vuex'
import {elementsMap, IElementsMap} from '@/components/lib/elements-map'
import {Capability} from '@/lib/capability'
import get from 'lodash/get'

export interface IElementsDomMap {
  element: Element
  domElement: HTMLElement
}

export interface IElementInDomMap {
  x: number
  y: number
  z: number
  element: IElementsDomMap
}

export class ElementsDomMap {
  private _elements: IElementsDomMap[][][] = []

  /**
   * Elements list.
   */
  get elements(): IElementsDomMap[][][] {
    return this._elements
  }

  /**
   * Current element.
   */
  get currentElement (): IElementInDomMap | null {
    const domElement: HTMLElement | null = document.querySelector('.element-item.current')
    if (!domElement) {
      return null
    }

    let foundElement: IElementInDomMap | null = null
    this._elements.forEach((col: IElementsDomMap[][], x: number) => {
      col.forEach((row: IElementsDomMap[], y: number) => {
        row.forEach((element: IElementsDomMap, z: number) => {
          if (element.domElement.id === domElement.id) {
            foundElement = { x, y, z,  element }
          }
        })
      })
    })
    return foundElement
  }

  /**
   * Get left element to the current one.
   */
  public left (): IElementsDomMap | null | undefined {
    if (!this.currentElement || !this.currentElement.x) {
      return null
    }

    if (this.currentElement.z > 0) {
      return get(this._elements, `[${this.currentElement.x}][${this.currentElement.y}][${this.currentElement.z - 1}]`) as unknown as IElementsDomMap
    }

    const y: number = this._elements[this.currentElement.x - 1].length - 1 < this.currentElement.y ? this._elements[this.currentElement.x - 1].length - 1 : this.currentElement.y
    const z: number =  this._elements[this.currentElement.x - 1][y].length - 1
    const item: IElementsDomMap | null = get(this._elements, `[${this.currentElement.x - 1}][${y}][${z}]`) as unknown as IElementsDomMap
    if (item) {
      return item
    }

    if (this.currentElement.x > 0) {
      return get(this._elements, `[${this.currentElement.x - 1}][${this._elements[this.currentElement.x - 1].length - 1}][0]`) as unknown as IElementsDomMap
    }
  }

  /**
   * Get right element to the current one.
   */
  public right (): IElementsDomMap | null | undefined {
    if (!this.currentElement) {
      return null
    }

    if (this.currentElement.z >= this._elements[this.currentElement.x][this.currentElement.y].length - 1) {
      const item: IElementsDomMap | null = get(this._elements, `[${this.currentElement.x + 1}][${this.currentElement.y}][0]`) as unknown as IElementsDomMap
      if (item) {
        return item
      }

      if (this._elements.length - 1 >= this.currentElement.x + 1) {
        return get(this._elements, `[${this.currentElement.x + 1}][${this._elements[this.currentElement.x + 1].length - 1}][0]`) as unknown as IElementsDomMap
      }
    }

    return get(this._elements, `[${this.currentElement.x}][${this.currentElement.y}][${this.currentElement.z + 1}]`) as unknown as IElementsDomMap
  }

  /**
   * Get upper element to the current one.
   */
  public up (): IElementsDomMap | null | undefined {
    if (!this.currentElement || !this.currentElement.y) {
      return null
    }

    return get(this._elements, `[${this.currentElement.x}][${this.currentElement.y - 1}][${this.currentElement.z}]`) as unknown as IElementsDomMap
  }

  /**
   * Get bottom element to the current one.
   */
  public down (): IElementsDomMap | null | undefined {
    if (!this.currentElement) {
      return null
    }

    return get(this._elements, `[${this.currentElement.x}][${this.currentElement.y + 1}][${this.currentElement.z}]`) as unknown as IElementsDomMap
  }

  /**
   * Initialize elements list.
   */
  public initialize (): void {
    const store = useStore()
    const results: IElementsDomMap[][][] = []

    elementsMap.forEach((column: IElementsMap) => {
      let index = 0
      let row: IElementsDomMap[] = []
      let col: IElementsDomMap[][] = []

      column.capabilities.forEach((capabilityId: string) => {
        const capability: Capability | null = store.state.data.capabilities.items.find((capability: Capability) => capability.id === capabilityId)
        if (!capability || !capability.elements) {
          return
        }

        capability.elements.forEach((element: IElement) => {
          const domElement: HTMLElement = document.querySelector(`#${element.id}`) as HTMLElement
          index++

          row.push({
            element: element as Element,
            domElement
          })

          if (column.size === index) {
            col.push(row)
            row = []
            index = 0
          }
        })
      })

      if (row.length > 0) {
        col.push(row)
      }
      results.push(col)
    })

    this._elements = results
  }
}
