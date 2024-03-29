import Hero from '@/components/home/Hero'
import Blog from '@/components/home/Blog'
import Contact from '@/components/home/Contact'
import FadeDown from '@/components/animations/FadeDown'
import FadeUp from '@/components/animations/FadeUp'

export default function Home() {
	return (
		<main className='flex flex-col gap-20 my-10'>
			<FadeDown duration={0.4} delay={0}>
				<Hero />
			</FadeDown>
			<FadeUp duration={0.4} delay={0}>
				<Blog />
			</FadeUp>
			<Contact />
		</main>
	)
}
