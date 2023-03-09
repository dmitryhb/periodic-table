import * as gsap from 'gsap'
import {Element} from '@/lib/element'
import {isSmallScreen} from '@/lib/screen'

export interface IUseAnimateElement {
  animateElementIntro(element: Element): void
  animateElementOutro(element: Element): void
}

export const useAnimateElement = (): IUseAnimateElement => {
  /**
   * Apply bounds to element.
   * @param domElement
   * @param bounds
   */
  const applyBounds = (domElement: HTMLElement, bounds: DOMRect): void => {
    domElement.style.left = `${bounds.left}px`
    domElement.style.top = `${bounds.top}px`
    domElement.style.width = `${bounds.width - 10}px`
    domElement.style.height = `${bounds.height}px`
  }

  /**
   * Get DOM element of an element from periodic table.
   * @param element
   * @param isClone
   */
  const getDomElement = (element: Element, isClone: boolean = false): HTMLElement => {
    const domElement: HTMLElement = document.querySelector(`#${element.id}${isClone ? '-clone' : ''}`) as HTMLElement
    return domElement
  }

  /**
   * Animate element intro.
   * @param element
   */
  const animateElementIntro = (element: Element): void => {
    const domElement: HTMLElement = getDomElement(element)
    const bounds: DOMRect = domElement.getBoundingClientRect()
    const clonedDomElement: HTMLElement = domElement.cloneNode(true) as HTMLElement
    const appDomElement: HTMLElement = document.querySelector('#app') as HTMLElement
    const clonedContainer: HTMLElement = document.createElement('div')
    const details: HTMLElement = document.createElement('div')
    const closeButton: HTMLElement = document.createElement('a')

    clonedContainer.classList.add('cloned-element')
    clonedContainer.id = `${clonedDomElement.id}-clone`
    clonedDomElement.id = `${clonedDomElement.id}-cloned-item`
    clonedDomElement.classList.add('clone')
    closeButton.setAttribute('href', 'javascript:;')
    closeButton.classList.add('close')

    details.classList.add('details')
    details.innerHTML = element.details

    clonedContainer.appendChild(clonedDomElement)
    clonedContainer.appendChild(details)
    clonedContainer.appendChild(closeButton)
    appDomElement.appendChild(clonedContainer)

    applyBounds(clonedContainer, bounds)

    const tl = new gsap.TimelineMax()
    const scrollLeft = document.documentElement.scrollLeft

    tl.set(clonedContainer, { width: isSmallScreen() ? 130 : 170 })
    tl.to(clonedContainer, {
      left: isSmallScreen() ? (scrollLeft + 21) : 80,
      top: isSmallScreen() ? 20 : 100,
      duration: 0.6,
      ease: gsap.Circ.easeInOut
    })
    tl.to(clonedContainer, {
      height: 400,
      duration: 0.3,
      ease: gsap.Circ.easeOut
    })
    tl.to(clonedContainer, {
      width: isSmallScreen() ? document.documentElement.offsetWidth - 42 : 500,
      duration: 0.4,
      ease: gsap.Circ.easeIn
    })
    const tlCloseButton = new gsap.TimelineMax()
    tlCloseButton.to(closeButton, {
      opacity: 1,
      delay: 1.2,
      duration: 0.5
    })
  }

  /**
   * Animate element outro.
   * @param element
   */
  const animateElementOutro = (element: Element): void => {
    const domElementCloned: HTMLElement = getDomElement(element, true)
    const domElement: HTMLElement = getDomElement(element)
    const bounds: DOMRect = domElement.getBoundingClientRect()
    const closeButton: HTMLElement = domElementCloned.querySelector('a.close') as HTMLElement
    const details: HTMLElement = domElementCloned.querySelector('.details') as HTMLElement

    closeButton.style.display = 'none'
    details.style.display = 'none'

    const tl = new gsap.TimelineMax()
    tl.set(domElementCloned, {
      width: 170,
    })
    tl.to(domElementCloned, {
      height: bounds.height,
      left: bounds.left,
      top: bounds.top,
      onComplete () {
        domElementCloned.remove()
      }
    })
  }

  return {
    animateElementIntro,
    animateElementOutro
  }
}
