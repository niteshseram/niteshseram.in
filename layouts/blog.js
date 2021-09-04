import Image from 'next/image'
import { useColorModeValue } from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'
import { Box, Heading, Flex, Text } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icon'
import { Global } from '@emotion/react'
import Container from './container'
import { MdTimelapse } from 'react-icons/md'
import { prismDarkTheme, prismLightTheme } from '@/styles/prism'

const BlogLayout = ({ children, frontMatter }) => {
	const prismColor = useColorModeValue(prismLightTheme, prismDarkTheme)
	return (
		<Container
			title={`${frontMatter.title} | Nitesh Seram`}
			description={frontMatter.summary}
			image={`https://niteshseram.in${frontMatter.image}`}
			date={new Date(frontMatter.publishedAt).toISOString()}
			type='article'
		>
			<Box
				as='article'
				mx='auto'
				my='2rem'
				maxW={{ base: '100%', sm: '30rem', md: '42rem' }}
				display='flex'
				flexDirection='column'
				className='mdx'
			>
				<Global styles={prismColor} />
				<Heading as='h2' variant='h2'>
					{frontMatter.title}
				</Heading>
				<Flex
					alignItems={{ base: 'start', md: 'center' }}
					flexDirection={{ base: 'column', md: 'row' }}
					mt={4}
					mb={2}
					justifyContent='space-between'
				>
					<Flex alignItems='center'>
						<Image
							alt='Nitesh Seram'
							height={24}
							width={24}
							src='/static/images/dp.png'
						/>
						<Text ml={2} variant='small'>
							{frontMatter.by}
							{'Nitesh Seram / '}
							{format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
						</Text>
					</Flex>
					<Text variant='small' mt={{ base: 2, md: 0 }}>
						<Icon as={MdTimelapse} boxSize={5} mr={1} />
						{frontMatter.readingTime.text}
					</Text>
				</Flex>
				{children}
			</Box>
		</Container>
	)
}

export default BlogLayout
