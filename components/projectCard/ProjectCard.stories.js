import { react } from '../../content/tools'
import ProjectCard from '.'

export default {
	title: 'Style Guide/Components/Card/Project',
	component: ProjectCard,
}

const Template = (args) => <ProjectCard {...args} />

export const Default = Template.bind({})
Default.args = {
	title: 'Project Card',
	description: 'Some arbitruary description here.',
	tools: [react, react, react],
}
