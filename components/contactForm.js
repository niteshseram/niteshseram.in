import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input as ChakraInput,
	Textarea,
	useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import useColorModeSwitcher from '../utils/hooks/useColorModeSwitcher'

const ContactForm = () => {
	const border = useColorModeValue('neutral.300', 'neutral.200')
	const { themed } = useColorModeSwitcher()
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		message: '',
	})

	const handleChange = (e) => {
		setInputs((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}))
	}

	return (
		<Box as='form' w={{ base: '100%', md: '50%' }}>
			<FormControl id='name'>
				<FormLabel>Name</FormLabel>
				<Input
					value={inputs.name}
					onChange={handleChange}
					placeholder='niteshseram'
				/>
			</FormControl>
			<FormControl id='email'>
				<FormLabel>Email</FormLabel>
				<Input
					value={inputs.email}
					onChange={handleChange}
					type='email'
					placeholder='niteshseram@gmail.com'
				/>
			</FormControl>
			<FormControl id='message'>
				<FormLabel>Message</FormLabel>
				<Textarea
					isRequired
					value={inputs.message}
					onChange={handleChange}
					_hover={{ borderColor: themed }}
					mb='1rem'
					borderColor={border}
					borderRadius='sm'
					h='8rem'
					type='text'
					placeholder='message...'
				/>
			</FormControl>
			<Button type='submit' w='50%' variant='primaryThemed'>
				Send
			</Button>
		</Box>
	)
}

const Input = ({ ...props }) => {
	const border = useColorModeValue('neutral.300', 'neutral.200')
	const { themed } = useColorModeSwitcher()
	return (
		<ChakraInput
			_hover={{ borderColor: themed }}
			borderColor={border}
			mb='1rem'
			borderRadius='sm'
			isRequired
			{...props}
		/>
	)
}

export default ContactForm
