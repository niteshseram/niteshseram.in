import {
	Box,
	Button,
	FormControl,
	Input as ChakraInput,
	Textarea,
	useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import useColorModeSwitcher from '@/hooks/useColorModeSwitcher'
import { ErrorMessage, SuccessMessage } from '@/components/styled/message'
import { event } from '@/lib/analytics'

const ContactForm = () => {
	const border = useColorModeValue('neutral.300', 'neutral.200')
	const { themed } = useColorModeSwitcher()
	const [form, setForm] = useState(false)
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		message: '',
	})
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		message: '',
	})

	const contactEvent = () => {
		event({
			action: 'contact',
			category: 'Contact',
			label: 'Contact',
			value: '',
		})
	}

	const handleChange = (e) => {
		setInputs((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}))
	}

	const onSubmitForm = async (e) => {
		e.preventDefault()
		setErrors(() => ({
			name: '',
			email: '',
			message: '',
		}))
		if (!inputs.name) {
			setErrors((prev) => ({
				...prev,
				name: 'Name is required',
			}))
		}
		if (!inputs.email) {
			setErrors((prev) => ({
				...prev,
				email: 'Email is required',
			}))
		}
		if (!inputs.message) {
			setErrors((prev) => ({
				...prev,
				message: 'Message is required',
			}))
		}

		if (inputs.name && inputs.email && inputs.message) {
			setForm({ state: 'loading' })
			try {
				const res = await fetch(`api/contact`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(inputs),
				})

				const { error } = await res.json()

				if (error) {
					setForm({
						state: 'error',
						message: error,
					})
					return
				}

				setForm({
					state: 'success',
					message: 'Your message was sent successfully.',
				})
				contactEvent()
				setInputs({
					name: '',
					email: '',
					message: '',
				})
			} catch (error) {
				setForm({
					state: 'error',
					message: 'Something went wrong',
				})
			}
		}
	}

	const iff = (condition, then, otherwise) => (condition ? then : otherwise)

	return (
		<Box
			as='form'
			onSubmit={(e) => onSubmitForm(e)}
			w={{ base: '100%', md: '50%' }}
		>
			<FormControl id='name'>
				<Box h='4rem'>
					<Input
						value={inputs.name}
						onChange={handleChange}
						placeholder='Name'
					/>
					{errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
				</Box>
			</FormControl>
			<FormControl id='email'>
				<Box h='4rem'>
					<Input
						value={inputs.email}
						onChange={handleChange}
						type='email'
						placeholder='Email'
					/>
					{errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
				</Box>
			</FormControl>
			<FormControl id='message'>
				<Box h='10rem'>
					<Textarea
						value={inputs.message}
						onChange={handleChange}
						_hover={{ borderColor: themed }}
						borderColor={border}
						borderRadius='sm'
						h='8rem'
						type='text'
						resize='none'
						placeholder='Message'
					/>
					{errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
				</Box>
			</FormControl>
			{form.state === 'success' ? (
				<SuccessMessage>{form.message}</SuccessMessage>
			) : (
				iff(
					form.state === 'error',
					<ErrorMessage>Error: {form.message}</ErrorMessage>,
					<Button
						isLoading={form.state === 'loading'}
						type='submit'
						w='50%'
						variant='primaryThemed'
					>
						Send
					</Button>
				)
			)}
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
			borderRadius='sm'
			{...props}
		/>
	)
}

export default ContactForm
