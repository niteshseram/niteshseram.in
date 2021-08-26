import {
	Button,
	Center,
	Heading,
	HStack,
	List,
	ListItem,
	Text,
	VStack,
} from '@chakra-ui/react'
import useColorModeSwitcher from '../../utils/hooks/useColorModeSwitcher'
import { Label } from '../styled'

const ProjectCard = ({
	title,
	description,
	tools,
	live,
	proto,
	repo,
	...props
}) => {
	const { colorGrey, colorDark, colorLight } = useColorModeSwitcher()
	return (
		<VStack
			border='2px solid'
			borderColor={colorGrey}
			w={{ base: '100%', md: '33rem' }}
			mb='3rem'
			mx={{ md: '1rem' }}
			bg={colorLight}
			spacing='2rem'
			{...props}
		>
			<Center
				borderRadius={0}
				fill={colorLight}
				w='100%'
				h='5rem'
				bg={colorDark}
			>
				<Heading color={colorLight} as='h3' variant='h3'>
					{title}
				</Heading>
			</Center>
			<List display='flex' flexWrap='wrap' justifyContent='center'>
				{tools.map((tool) => (
					<ListItem key={tool.name}>
						<Label icon={tool.icon} label={tool.name} />
					</ListItem>
				))}
			</List>
			<VStack
				flex='1'
				spacing='2rem'
				p={{ base: '0.5rem', md: '1rem' }}
				alignItems='start'
				justifyContent='space-between'
			>
				<Text>{description}</Text>
				<HStack pb='2rem'>
					{live && (
						<Button as='a' href={live} target='_blank' variant='primary'>
							Visit Site
						</Button>
					)}
					<Button as='a' href={repo} target='_blank' variant='secondary'>
						View Code
					</Button>
				</HStack>
			</VStack>
		</VStack>
	)
}

export default ProjectCard
