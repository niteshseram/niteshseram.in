import { IoAlertCircle, IoCheckmarkCircle } from 'react-icons/io5'

const ErrorMessage = ({ children }) => (
	<div className='flex items-center text-red-800 dark:text-red-400'>
		<IoAlertCircle />
		<p className='ml-2 text-sm font-bold text-red-800 dark:text-red-400'>
			{children}
		</p>
	</div>
)

const SuccessMessage = ({ children }) => (
	<div className='flex items-center text-green-700 dark:text-green-400'>
		<IoCheckmarkCircle />
		<p className='mr-2 text-sm font-bold text-green-700 dark:text-green-400'>
			{children}
		</p>
	</div>
)

export { ErrorMessage, SuccessMessage }
