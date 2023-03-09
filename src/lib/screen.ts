/**
 * Check whether screen is tablet portrait or smaller.
 * @return {boolean}
 */
const isSmallScreen = () => {
  return window.innerWidth <= 450
}

export { isSmallScreen }
