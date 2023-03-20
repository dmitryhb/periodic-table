import {gsap, Circ} from 'gsap'

export interface IUseAnimatePlatformLegend {
  animateIntro(): void
  animateOutro(): void
}

export const useAnimatePlatformLegend = (): IUseAnimatePlatformLegend => {
  const animateIntro = (): void => {
    const element: HTMLElement | null = document.querySelector('.platform-legend')
    if (!element) {
      return
    }

    const tl: gsap.core.Timeline = new gsap.core.Timeline()
    tl.fromTo(element, {
      y: '-200px',
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: Circ.easeInOut
    })
  }

  const animateOutro = (): void => {
    const element: HTMLElement | null = document.querySelector('.platform-legend')
    if (!element) {
      return
    }

    const tl: gsap.core.Timeline = new gsap.core.Timeline()
    tl.fromTo(element, {
      opacity: 1
    }, {
      opacity: 0
    })
  }

  return {
    animateIntro,
    animateOutro
  }
}
