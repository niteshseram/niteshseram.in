'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ReactElement, useContext, useEffect, useRef } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

import { ScrollContext } from '../ScrollObserver'
import FadeUp from '../animations/FadeUp'
import FadeRight from '../animations/FadeRight'

export default function Hero(): ReactElement {
	const refSection = useRef<HTMLHeadingElement>(null)
	const { scrollY } = useContext(ScrollContext)

	let progress = 0
	const { current: elRef } = refSection

	if (elRef) {
		progress = Math.min(1, scrollY / elRef.clientHeight)
	}

	return (
		<section>
			<h1 className='sr-only'>
				Hi I&apos;m Nitesh Seram, I&apos;m a software engineer and I craft
				things for the web.
			</h1>
			<motion.div
				className='relative z-10 flex h-[calc(100vh-80px)] items-center select-none'
				animate={{
					transform: `translateY(${progress * 40}vh)`,
				}}
				transition={{ type: 'spring', stiffness: 50, duration: 0.8 }}
			>
				<AnimatePresence>
					<div
						className='
            mx-auto
            -mt-36
            w-screen
            max-w-3xl
            px-4
            sm:px-9
            xl:max-w-5xl
            xl:px-0
          '
					>
						<div ref={refSection} className='flex cursor-default flex-col'>
							<FadeUp duration={0.6}>
								<h1 className='text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-8'>
									Hello
									<span role='img' aria-label='waving hand' className='wave'>
										👋
									</span>
								</h1>
							</FadeUp>
							<FadeUp duration={0.6} delay={0.2}>
								<h1 className='text-4xl font-extrabold sm:text-5xl md:text-6xl xl:text-7xl'>
									I&apos;m <span className='name-highlight'>Nitesh Seram</span>
								</h1>
							</FadeUp>
							<FadeRight duration={0.6} delay={1.4}>
								<h2 className='text-3xl font-bold opacity-80 sm:text-5xl md:text-5xl xl:text-7xl relative'>
									I craft things for the web
								</h2>
							</FadeRight>
							<FadeUp duration={0.6} delay={0.6}>
								<p className='text-md lg:text-xl mt-8 lg:mt-12'>
									Welcome to my little corner of the internet!
								</p>
							</FadeUp>
							<FadeRight duration={0.5} delay={1}>
								<Link href='/about'>
									<div className='flex items-center mt-2 md:mt-3'>
										<span className='link'>Read more about me&nbsp;</span>
										<span className='animate-bounce-right'>
											<AiOutlineArrowRight />
										</span>
									</div>
								</Link>
							</FadeRight>
						</div>
					</div>
				</AnimatePresence>
			</motion.div>
		</section>
	)
}
