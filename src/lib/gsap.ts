import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Premium eases used across the site.
export const EASE = {
  expo: 'expo.out',
  power: 'power4.out',
  soft: 'power2.out',
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
}

export { gsap, ScrollTrigger }
