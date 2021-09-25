const Divider = () => (
	<div className='border border-gray-200 dark:border-gray-800 w-full my-8' />
)

const Year = ({ children }) => (
	<h4 className='font-bold text-lg mb-4'>{children}</h4>
)

const Checkpoint = ({ title, children }) => (
	<>
		<div className='flex items-center mb-1'>
			<div className='text-green-700 dark:text-green-300'>
				<span className='sr-only'>Check</span>
				<svg viewBox='0 0 20 20' className='fill-current w-4 h-4'>
					<path d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' />
				</svg>
			</div>
			<h5 className='font-bold ml-2'>{title}</h5>
		</div>
		<li className='pb-4 ml-2 border-solid border-l-2 border-gray-200 dark:border-gray-800 last:border-0 last:pb-0'>
			<p className='ml-5 text-base'>{children}</p>
		</li>
	</>
)

const FullTimeline = () => (
	<>
		<Year>2021</Year>
		<ul>
			<Checkpoint title='Joining a Startup as a Software Engineer'>
				Will be joining a startup as a Software Engineer in October
			</Checkpoint>
			<Checkpoint title='Started Open Source contribution ❤️'>
				Started Open Source contribution mainly in{' '}
				<a
					className='link'
					href='https://github.com/kubernetes/website/pulls?q=author%3Aniteshseram+'
					aria-label='kubernetes contribution'
					target='_blank'
					rel='noopener noreferrer'
				>
					Kubernetes
				</a>{' '}
				docs and other projects here and there. Although there were not any big
				major contributions being made, I learnt a lot about how to contribute
				and collaborate in such a big project in general. I am still exploring
				Open Source and trying to be active as much as possible.
			</Checkpoint>
		</ul>
		<Divider />
		<Year>2020</Year>
		<ul>
			<Checkpoint title='Joined Cognizant'>
				At the end of 2020 after graduation, I joined Cognizant as a Programmer
				Analyst Trainee. I learnt about Java Full Stack development while
				working here.
			</Checkpoint>
			<Checkpoint title='Graduated 🧑‍🎓'>
				Sadly graduated with a virtual convocation
			</Checkpoint>
			<Checkpoint title='Hit by pandemic 😷'>
				The pandemic hit when we were just in the mid of our last semester and
				we all had to go home. Last semester is always special because that is
				the last time we could enjoy to the fullest with all our college friends
				before parting ways 😔.
			</Checkpoint>
		</ul>
		<Divider />
		<Year>2016</Year>
		<ul>
			<Checkpoint title='Started learning coding 💻'>
				I was so intimidated at first and had to struggle in my freshman year. I
				literally used to memorize the programs 😂.
			</Checkpoint>
			<Checkpoint title='Started at Assam Don Bosco University'>
				Took Computer Science and Engineering just because I like computer and I
				had no idea about other branches. And I am glad I chose this.
			</Checkpoint>
			<Checkpoint title='Moved out of hometown 🏠'>
				This was the first time I moved of hometown to do my graduation.
			</Checkpoint>
		</ul>
		<Divider />
		<Year>2015</Year>
		<ul>
			<Checkpoint title='Took a year gap'>
				Prepared for the medical entrance examination. Unfortunately,
				couldn&apos;t clear it. I couldn&apos;t think of any other option that I
				liked other than engineering.
			</Checkpoint>
			<Checkpoint title='Completed higher secondary 🧑‍🏫'>
				Completed my higher secondary and decided to try for medical entrance
				examination
			</Checkpoint>
		</ul>

		<Divider />
		<Year>2013</Year>
		<ul>
			<Checkpoint title='Started higher secondary'>
				Got into the best college in my hometown
			</Checkpoint>
		</ul>
		<Divider />
		<Year>1997</Year>
		<ul>
			<Checkpoint title='Born 👶' />
		</ul>
	</>
)

const Timeline = () => <FullTimeline />

export default Timeline
