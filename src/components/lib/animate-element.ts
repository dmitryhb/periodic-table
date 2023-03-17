import {gsap, Circ} from 'gsap'
import {isSmallScreen} from '@/lib/screen'
import {Element} from '@/lib/element'

export interface IUseAnimateElement {
  animateElementIntro(element: Element): void
  animateElementOutro(element: Element): void
}

const detailsPopupWidth: number = 350
export const useAnimateElement = (): IUseAnimateElement => {
  /**
   * Current active element.
   */
  let currentElement: Element | null = null

  /**
   * Apply bounds to element.
   * @param domElement
   * @param bounds
   */
  const applyBounds = (domElement: HTMLElement, bounds: DOMRect): void => {
    domElement.style.left = `${bounds.x}px`
    domElement.style.top = `${bounds.y}px`
    domElement.style.width = `${bounds.width}px`
    domElement.style.height = `${bounds.height}px`
  }

  /**
   * Get DOM element of an element from periodic table.
   * @param element
   * @param isClone
   */
  const getDomElement = (element: Element, isClone: boolean = false): HTMLElement => {
    return document.querySelector(`#${element.id}${isClone ? '-clone' : ''}`) as HTMLElement
  }

  /**
   * Get details HTML code.
   * @param element
   */
  const getDetailsHtml = (element: Element): string => {
    return `<h2 class="font-${element.capability?.color}">${element.element}</h2><h3>${element.name}</h3><p>${element.details}</p>`
  }

  /**
   * Get height of popup with details.
   * @param element
   * @param width
   */
  const getHeight = (element: Element, width: number): number => {
    const appDomElement: HTMLElement = document.querySelector('#app') as HTMLElement
    const el: HTMLElement = document.createElement('div')
    el.innerHTML = `<div class="details">${getDetailsHtml(element)}</div>`
    el.classList.add('cloned-element')
    el.style.width = `${width}px`
    el.style.left = '-10000px'
    el.style.top = '-10000px'
    appDomElement.appendChild(el)
    const height: number = el.getBoundingClientRect().height

    el.remove()
    return height
  }

  /**
   * Calculate position of element.
   * @param element
   * @param bounds
   */
  const calculatePosition = (element: Element, bounds: DOMRect): DOMRect => {
    const height: number = getHeight(element, detailsPopupWidth)
    const initialTop: number = bounds.top
    const initialRight: number = bounds.right

    bounds.x = bounds.right
    bounds.y -= height / 2 - bounds.height / 2 + (isSmallScreen() ? document.documentElement.scrollTop : 0)
    bounds.y += document.documentElement.scrollTop

    if (bounds.x + detailsPopupWidth > window.innerWidth) {
      bounds.x = bounds.left - bounds.width - detailsPopupWidth
    }

    if (bounds.y + height > window.innerHeight || isSmallScreen()) {
      bounds.x = initialRight - detailsPopupWidth / 2 - bounds.width / 2
      bounds.y = initialTop - height
      bounds.y += document.documentElement.scrollTop
    }

    bounds.width = detailsPopupWidth
    bounds.height = height

    if (isSmallScreen()) {
      bounds.x = 10
      bounds.width = window.innerWidth - 20
    }

    if (bounds.x < 10) {
      bounds.x = 10
    }

    if (bounds.y < 0) {
      bounds.y = 0
    }

    return bounds
  }

  /**
   * Recalculate position of details popup.
   */
  const recalculatePosition = (): void => {
    if (!currentElement) {
      return
    }

    const domElement: HTMLElement = getDomElement(currentElement)
    if (domElement) {
      const bounds: DOMRect = calculatePosition(currentElement, domElement.getBoundingClientRect())
      const clonedContainer: HTMLElement = getDomElement(currentElement, true)
      applyBounds(clonedContainer, bounds)
    }
  }

  /**
   * Animate element intro.
   * @param element
   */
  const animateElementIntro = (element: Element): void => {
    const domElement: HTMLElement = getDomElement(element)
    const bounds: DOMRect = calculatePosition(element, domElement.getBoundingClientRect())
    const appDomElement: HTMLElement = document.querySelector('#app') as HTMLElement
    const clonedContainer: HTMLElement = document.createElement('div')
    const details: HTMLElement = document.createElement('div')
    const closeButton: HTMLElement = document.createElement('a')

    currentElement = element
    clonedContainer.id = `${domElement.id}-clone`
    clonedContainer.classList.add('cloned-element')
    clonedContainer.classList.add(`border-${element.capability?.color}`)

    closeButton.setAttribute('href', 'javascript:;')
    closeButton.classList.add('close')
    closeButton.addEventListener('click', () => {
      window.dispatchEvent(new Event('closeActiveElement'))
    })

    details.classList.add('details')
    details.innerHTML = getDetailsHtml(element)

    clonedContainer.appendChild(closeButton)
    clonedContainer.appendChild(details)
    appDomElement.appendChild(clonedContainer)
    applyBounds(clonedContainer, bounds)

    const tl: gsap.core.Timeline = new gsap.core.Timeline()
    tl.set(closeButton, { opacity: 0 })
    tl.fromTo(clonedContainer, {
      x: 50,
      scale: 0.5,
      transformOrigin: '0% 50%'
    }, {
      x: 0,
      scale: 1,
      duration: 0.2,
      ease: Circ.easeOut
    })
    tl.to(closeButton, {
      opacity: 1,
      duration: 0.2
    })
    window.addEventListener('resize', recalculatePosition)
  }

  /**
   * Animate element outro.
   * @param element
   */
  const animateElementOutro = (element: Element): void => {
    const domElement: HTMLElement = getDomElement(element, true)
    domElement.remove()
    currentElement = null
    window.removeEventListener('resize', recalculatePosition)
  }

  return {
    animateElementIntro,
    animateElementOutro
  }
}
