import { Flex, Icon, Text } from '@chakra-ui/react'
import useColorModeSwitcher from '../utils/hooks/useColorModeSwitcher'

const Label = ({ icon, label }) => {
	const { themed, colorLight } = useColorModeSwitcher()
	return (
		<Flex
			borderRadius='8px'
			px='6px'
			py='3px'
			bg={themed}
			align='center'
			justify='space-between'
			mr='6px'
			mt='10px'
		>
			<Icon
				as={icon}
				color={colorLight}
				mr='0.5rem'
				aria-labelledby={label}
				aria-hidden
			/>
			<Text color={colorLight} variant='small'>
				{label}
			</Text>
		</Flex>
	)
}

export default Label
