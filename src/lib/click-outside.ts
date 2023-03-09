interface IClickOutside {
  bind (): void
  unbind (): void
}

/**
 * Compare two DOM nodes.
 * @param a
 * @param b
 * @return {boolean}
 */
const compareNodes = (a: Node, b: Node): boolean => !a.isSameNode ? a === b : a.isSameNode(b)

/**
 * Check whether node is equal or is a children of the given possible parent.
 * @param node
 * @param possibleParent
 */
const hasParentLike = (node: Node, possibleParent: Node): boolean => {
  for (; node && node !== document; node = node.parentNode as Node) {
    if (compareNodes(node, possibleParent)) {
      return true
    }
  }
  return false
}

/**
 * Click outside factory.
 * @param ignoreSelector
 * @param callback
 */
const useClickOutside = (ignoreSelector: string[] = [], callback: CallableFunction | null = null): IClickOutside => {
  const makeCall = (): void => {
    if (callback) {
      callback()
    }
  }

  const clickedOutside = (ev: MouseEvent) => {
    if (!ignoreSelector.length) {
      makeCall()
      return
    }

    let ignore = false
    for (const selector of ignoreSelector) {
      const ignoreElement = document.querySelector(selector)
      if (ignoreElement && hasParentLike(ev.target as Node, ignoreElement)) {
        ignore = true
        break
      }
    }
    if (!ignore) {
      makeCall()
    }
  }

  return {
    bind(): void {
      window.addEventListener('click', clickedOutside)
    },
    unbind(): void {
      window.removeEventListener('click', clickedOutside)
    }
  }
}

export {useClickOutside}
