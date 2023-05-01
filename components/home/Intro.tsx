'use client'

import { useContext, useRef } from 'react'
import { ScrollContext } from '../ScrollObserver'

function opacityForBlock(sectionProgress: number, blockNumber: number) {
  const progress = sectionProgress - blockNumber

  if (progress >= 0 && progress < 1) {
    return 1
  }

  return 0.2
}

const Intro = () => {
  const { scrollY } = useContext(ScrollContext)
  const refSection = useRef<HTMLDivElement>(null)

  const numOfPages = 3
  let progress = 0
  const { current: elRef } = refSection

  if (elRef) {
    const { clientHeight, offsetTop } = elRef
    const screenH = window.innerHeight
    const halfH = screenH / 2

    const percentY =
      Math.min(clientHeight + halfH, Math.max(-screenH, scrollY - offsetTop) + halfH) / clientHeight

    progress = Math.min(numOfPages - 0.5, Math.max(0.5, percentY * numOfPages))
  }

  return (
    <section ref={refSection} id="intro" className="flex min-h-screen flex-col items-center justify-center py-24 text-2xl font-semibold tracking-tight md:py-28 md:text-3xl lg:py-3 lg:text-5xl">
      <div className="leading-[1.15]">
        <div className="introText" style={{ opacity: opacityForBlock(progress, 0) }}>
          I&apos;m a code magician, breathing life into digital products!
        </div>
        <span
          className="introText inline-block after:content-['_'] my-10"
          style={{ opacity: opacityForBlock(progress, 1) }}
        >
          I&apos;m passionate about crafting user-friendly and complex web applications.
        </span>
        <span
          className="introText inline-block"
          style={{ opacity: opacityForBlock(progress, 2) }}
        >
          I&apos;m also an avid open-source contributor.
        </span>
      </div>
    </section>
  )
}

export default Intro;