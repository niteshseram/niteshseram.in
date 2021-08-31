import { VStack } from '@chakra-ui/react'

const ContentWrapper = ({ children }) => (
	<VStack spacing={{ base: '5rem', lg: '10rem' }} mb='5rem'>
		{children}
	</VStack>
)

export default ContentWrapper
