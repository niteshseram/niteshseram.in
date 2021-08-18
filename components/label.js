import { Flex, Icon, Text } from '@chakra-ui/react'
import useColorModeSwitcher from '../utils/hooks/useColorModeSwitcher'

const Label = ({ icon, label }) => {
	const { themed, colorLight } = useColorModeSwitcher()
	return (
		<Flex
			borderRadius='0.6rem'
			px='0.6rem'
			py='0.1rem'
			bg={themed}
			align='center'
			justify='space-between'
		>
			<Icon
				as={icon}
				color={colorLight}
				mr='0.5rem'
				aria-labelledby={label}
				aria-hidden
			/>
			<Text color={colorLight}>{label}</Text>
		</Flex>
	)
}

export default Label
