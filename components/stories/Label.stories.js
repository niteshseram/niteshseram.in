import Label from '../label'
import { react } from '../../content/icons'

export default {
	title: 'Style Guide/Components/Label',
	component: Label,
}

const Template = (args) => <Label {...args} />

export const Default = Template.bind({})
Default.args = {
	label: react.name,
	icon: react.icon,
}
