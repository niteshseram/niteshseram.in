import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import { ErrorMessage, SuccessMessage } from './Message'

const ContactForm = () => {
	const [form, setForm] = useState(false)
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

	const onSubmitForm = async (e) => {
		e.preventDefault()
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
					message: 'Sent Successfully',
				})

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

	return (
		<form className='w-full md:w-2/4' onSubmit={(e) => onSubmitForm(e)}>
			<input
				id='name'
				aria-label='Name field for Contact form'
				value={inputs.name}
				onChange={handleChange}
				placeholder='Name'
				type='text'
				required
				className='input mb-4'
			/>
			<input
				id='email'
				aria-label='Email field for Contact form'
				value={inputs.email}
				onChange={handleChange}
				placeholder='Email'
				type='email'
				required
				className='input mb-4'
			/>
			<textarea
				id='message'
				aria-label='Message field for Contact form'
				value={inputs.message}
				onChange={(e) => handleChange(e)}
				placeholder='Your Message'
				type='text'
				rows='5'
				required
				className='input mb-4'
			/>
			<div className='flex flex-row items-center'>
				<button type='submit' className='btn btn-themed uppercase w-2/4'>
					Send
				</button>
				<span className='ml-2'>
					{form.state === 'loading' && <LoadingSpinner />}
					{form.state === 'error' ? (
						<ErrorMessage>{form.message}</ErrorMessage>
					) : form.state === 'success' ? (
						<SuccessMessage>{form.message}</SuccessMessage>
					) : (
						''
					)}
				</span>
			</div>
		</form>
	)
}

export default ContactForm
