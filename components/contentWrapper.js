import { VStack } from '@chakra-ui/react'

const ContentWrapper = ({ children }) => (
	<VStack
		maxW='550px'
		textAlign='center'
		borderRadius='md'
		border='2px solid'
		borderColor='neutral.400'
		p={8}
		spacing={8}
	>
		{children}
	</VStack>
)

export default ContentWrapper
