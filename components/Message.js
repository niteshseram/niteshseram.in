const ErrorMessage = ({ children }) => (
	<div className='flex items-center text-red-800 dark:text-red-400'>
		<span className='sr-only'>Alert</span>
		<svg viewBox='0 0 512 512' className='w-4 h-4 fill-current'>
			<path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 319.91a20 20 0 1120-20 20 20 0 01-20 20zm21.72-201.15l-5.74 122a16 16 0 01-32 0l-5.74-121.94v-.05a21.74 21.74 0 1143.44 0z' />
		</svg>
		<p className='ml-2 text-sm font-bold text-red-800 dark:text-red-400'>
			{children}
		</p>
	</div>
)

const SuccessMessage = ({ children }) => (
	<div className='flex items-center text-green-700 dark:text-green-400'>
		<span className='sr-only'>Success</span>
		<svg viewBox='0 0 512 512' className='w-4 h-4 fill-current'>
			<path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z' />
		</svg>
		<p className='mr-2 text-sm font-bold text-green-700 dark:text-green-400'>
			{children}
		</p>
	</div>
)

export { ErrorMessage, SuccessMessage }
