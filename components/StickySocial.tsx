'use client'

import React from 'react'
import Link from 'next/link'

import FadeUp from './animations/FadeUp'

import { SOCIAL } from '@/constants'

const StickySocial = () => {
	return (
		<div className='hidden lg:flex fixed top-[50%] lg:right-[20px] xl:right-[40px] translate-y-[-104px] flex-col items-center gap-12'>
			{SOCIAL.map((social, idx) => (
				<FadeUp duration={0.6} delay={0.2 * idx} key={idx}>
					<Link
						aria-label={social.label}
						href={social.href}
						target='_blank'
						className='
              flex
              border-solid 
              border-2 
              dark:border-primary-light 
              dark:hover:border-primary 
              border-secondary-light 
              hover:secondary-primary 
              transition 
              rounded-full
              dark:hover:text-light
              dark:text-slate-500
              text-gray-500
              hover:text-gray-900
            '
					>
						{React.createElement(social.icon, {
							className: 'h-10 w-10 pointer-events-auto p-2',
						})}
					</Link>
				</FadeUp>
			))}
		</div>
	)
}

export default StickySocial
