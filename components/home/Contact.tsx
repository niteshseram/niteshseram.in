import Link from 'next/link'
import React from 'react'

const Contact = () => {
  return (
		<section id='contact' className='mb-10 mt-20'>
			<h2 className='heading underline'>Get In Touch</h2>
			<p>
				Looking to collaborate, discuss an opportunity, or just want to say hi?
				I&apos;m all in!
			</p>
			<p className='mt-5'>
				Just drop me an{' '}
				<Link href='mailto:contact@niteshseram.in' className='link'>
					email
				</Link>
				, or hit me up on{' '}
				<Link
					href='https://twitter.com/niteshseram'
					className='link'
					target='_blank'
				>
					Twitter
				</Link>{' '}
				to get the conversation started. No matter how you choose to connect, I
				can&apos;t wait to hear from you and start working on something amazing!
			</p>
		</section>
	)
}

export default Contact