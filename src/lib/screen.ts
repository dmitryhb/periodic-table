/**
 * Check whether screen is tablet portrait or smaller.
 * @return {boolean}
 */
const isSmallScreen = () => {
  return document.documentElement.offsetWidth <= 959
}

export { isSmallScreen }
