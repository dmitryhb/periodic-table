import {ElementsDomMap, IElementInDomMap, IElementsDomMap} from '@/lib/init-elements-map'

export interface IUseKeyboardNavigation {
  bindKeyboardNavigation (): void
  unbindKeyboardNavigation (): void
}

export const useKeyboardNavigation = (): IUseKeyboardNavigation => {
  const elements: ElementsDomMap = new ElementsDomMap()

  /**
   * Handle keyboard event.
   * @param e
   */
  const handleKeyboard = (e: KeyboardEvent): void => {
    const currentElement: HTMLElement | null = document.querySelector('.element-item.current')
    if (!currentElement || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
      return
    }

    let nextElement: IElementsDomMap | null | undefined = null
    switch (e.code) {
      case 'ArrowLeft':
        nextElement = elements.left()
        break
      case 'ArrowRight':
        nextElement = elements.right()
        break
      case 'ArrowUp':
        nextElement = elements.up()
        break
      case 'ArrowDown':
        nextElement = elements.down()
        break
    }

    if (nextElement) {
      nextElement.domElement.click()
    }
  }

  /**
   * Bind keyboard navigation.
   */
  const bindKeyboardNavigation = (): void => {
    elements.initialize()
    window.addEventListener('keydown', handleKeyboard)
  }

  /**
   * Unbind keyboard navigation.
   */
  const unbindKeyboardNavigation = (): void => {
    window.removeEventListener('keydown', handleKeyboard)
  }

  return {
    bindKeyboardNavigation,
    unbindKeyboardNavigation
  }
}
