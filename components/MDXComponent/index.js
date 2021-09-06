import NextLink from 'next/link'
import { Heading, Link } from '@chakra-ui/react'
import { Box } from '@chakra-ui/layout'
import Image from 'next/image'
import useColorModeSwitcher from '@/utils/hooks/useColorModeSwitcher'

const CustomLink = (props) => {
	const href = props.href
	const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))
	const { themed } = useColorModeSwitcher()
	if (isInternalLink) {
		return (
			<NextLink href={href} color={themed}>
				<Link
					{...props}
					fontWeight='bold'
					className='mdx'
					color={themed}
					_focus={{ outline: 'none' }}
				>
					{props.children}
				</Link>
			</NextLink>
		)
	}

	return (
		<Link
			target='_blank'
			rel='noopener noreferrer'
			color='link'
			className='mdx'
			fontWeight='bold'
			{...props}
		>
			{props.children}
		</Link>
	)
}

const h1 = (props) => <Heading as='h1' variant='h1' mt={8} mb={4} {...props} />
const h2 = (props) => <Heading as='h2' variant='h2' mt={8} mb={4} {...props} />
const h3 = (props) => <Heading as='h3' variant='h3' mt={8} mb={4} {...props} />
const h4 = (props) => <Heading as='h4' variant='h4' mt={8} mb={4} {...props} />
const CImage = (props) => (
	<Box mb={4}>
		<Image alt={props.alt} {...props} />
	</Box>
)

const MDXComponent = {
	a: CustomLink,
	h1,
	h2,
	h3,
	h4,
	CImage,
}

export default MDXComponent
