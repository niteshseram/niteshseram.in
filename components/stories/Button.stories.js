import { CheckCircleIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'

export default {
	title: 'Style Guide/Components/Button',
	component: Button,
	argTypes: {
		size: {
			control: {
				type: 'radio',
				options: ['sm', 'md', 'lg'],
			},
		},
		variant: {
			control: {
				type: 'select',
				options: ['primary', 'secondary', 'primaryThemed', 'secondaryThemed'],
			},
		},
		isActive: {
			control: {
				type: 'boolean',
				options: ['true', 'false'],
			},
		},
		isDisabled: {
			control: {
				type: 'boolean',
				options: ['true', 'false'],
			},
		},
	},
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
	children: 'BUTTON',
	variant: 'primary',
	isActive: false,
	isDisabled: false,
}

export const Secondary = Template.bind({})
Secondary.args = {
	...Primary.args,
	variant: 'secondary',
}

export const PrimaryThemed = Template.bind({})
PrimaryThemed.args = {
	...Primary.args,
	variant: 'primaryThemed',
}

export const SecondaryThemed = Template.bind({})
SecondaryThemed.args = {
	...Primary.args,
	variant: 'secondaryThemed',
}

export const Icon = Template.bind({})
Icon.args = {
	...Primary.args,
	children: <CheckCircleIcon />,
	'aria-label': 'Toogle color mode',
	variant: 'icon',
}
