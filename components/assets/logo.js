import { createIcon, Icon } from '@chakra-ui/react'
import useColorModeSwitcher from '../../utils/hooks/useColorModeSwitcher'

const LogoBase = createIcon({
	displayName: 'Logo',
	viewBox: '0 0 188.000000 200.000000',
	path: (
		<g transform='translate(0.000000,200.000000) scale(0.100000,-0.100000)'>
			<path d='M90 1000 l0 -910 360 0 360 0 0 910 0 910 -360 0 -360 0 0 -910z' />
			<path
				d='M1060 1001 l0 -911 370 0 370 0 0 668 c-1 750 -3 774 -66 900 -84
165 -239 238 -526 249 l-148 6 0 -912z'
			/>
		</g>
	),
})
const Logo = ({ boxSize = '36px', ...props }) => {
	const { colorDark } = useColorModeSwitcher()
	return (
		<Icon
			{...props}
			strokeWidth='2px'
			stroke='currentcolor'
			fill={colorDark}
			boxSize={boxSize}
			as={LogoBase}
		/>
	)
}

export default Logo
