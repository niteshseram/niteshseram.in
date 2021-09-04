import { Box, Heading, Stack, Text } from '@chakra-ui/layout'
import Link from 'next/link'
import { parseISO, format } from 'date-fns'
import useColorModeSwitcher from '@/utils/hooks/useColorModeSwitcher'

const BlogCard = ({ post }) => {
	return (
		<BlogWrapper>
			<Link href={`/blog/${post.slug}`} passHref>
				<Box cursor='pointer' p={{ base: 2, md: '4' }}>
					<Stack>
						<Heading as='h4' variant='h4'>
							{post.title}
						</Heading>
						<Text>{post.summary}</Text>
					</Stack>
					<Stack direction='row' spacing={4} align='center'>
						<Text variant='small' mt={2}>
							{format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
							{` • `}
							{post.frontMatter.readingTime.text}
						</Text>
					</Stack>
				</Box>
			</Link>
		</BlogWrapper>
	)
}

const BlogWrapper = ({ children }) => {
	const { colorGrey } = useColorModeSwitcher()
	return (
		<Box border='1px solid' borderColor={colorGrey} mb={4}>
			{children}
		</Box>
	)
}
export default BlogCard
