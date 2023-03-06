/**
 * Delay in milliseconds.
 * @param delayMilliseconds
 */
export const delay = (delayMilliseconds: number): Promise<void> => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, delayMilliseconds)
  })
}
