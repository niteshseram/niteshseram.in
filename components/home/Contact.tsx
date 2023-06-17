import Link from 'next/link'
import { FiTwitter, FiMail, FiArrowRight } from 'react-icons/fi'

const Contact = () => {
  return (
		<section id='contact' className='py-40'>
			<h2 className='heading underline'>Get In Touch</h2>
			<p>
				Looking to collaborate, discuss an opportunity, or just want to say hi?
				I&apos;m all in! Just drop me an email, or hit me up on Twitter to get
				the conversation started. No matter how you choose to connect, I
				can&apos;t wait to hear from you!
			</p>
			<div className='flex gap-16 mt-6'>
				<Link
					href='mailto:contact@niteshseram.in?subject=Hi%20Nitesh!'
					className='flex items-center gap-2 hover:text-primary transition'
					title='Compose an email to Nitesh'
				>
					<FiMail />
					<span>Email Me&nbsp;</span>
					<span className='animate-bounce-right'>
						<FiArrowRight />
					</span>
				</Link>
				<Link
					href='https://twitter.com/niteshseram'
					target='_blank'
					className='flex items-center gap-2 hover:text-primary transition'
					title='Connect with Nitesh on twitter'
				>
					<FiTwitter />
					<span>Twitter&nbsp;</span>
					<span className='animate-bounce-right'>
						<FiArrowRight />
					</span>
				</Link>
			</div>
		</section>
	)
}

export default Contact