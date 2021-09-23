const ProjectEvent = async (action, value) => {
	const { event } = await import('@/lib/analytics')
	event({
		action: action,
		category: 'Project',
		label: value,
		value: '',
	})
}

const ProjectCard = ({ title, description, tools, live, repo, ...props }) => (
	<div
		className={`flex flex-col border-solid border-2 border-gray-200 dark:border-gray-600 w-full md:w-[33rem] mb-12 md:mx-4 bg-light dark:bg-dark space-y-4 md:space-y-6 ${props.className}`}
	>
		<div className='flex items-center justify-center bg-dark dark:bg-light h-20'>
			<h3 className='text-light font-bold text-lg md:text-2xl dark:text-dark'>
				{title}
			</h3>
		</div>
		<div className='flex flex-wrap justify-center'>
			{tools.map((tool) => (
				<div className='label' key={tool.name}>
					{tool.name}
				</div>
			))}
		</div>
		<div className='flex flex-col flex-1 p-2 md:p-4 items-start justify-between space-y-8'>
			<p>{description}</p>
			<div className='flex flex-row pb-8'>
				{live && (
					<a
						href={live}
						onClick={() => ProjectEvent('live-view', title)}
						target='_blank'
						rel='noopener noreferrer'
						className='btn btn-primary uppercase mr-4'
					>
						Visit Site
					</a>
				)}
				{repo && (
					<a
						href={repo}
						onClick={() => ProjectEvent('repo-view', title)}
						target='_blank'
						rel='noopener noreferrer'
						className='btn btn-secondary uppercase'
					>
						View Code
					</a>
				)}
			</div>
		</div>
	</div>
)

export default ProjectCard
