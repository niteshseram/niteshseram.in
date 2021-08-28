import {
	chakra,
	hsql,
	monogdb,
	next,
	node,
	react,
	springboot,
	styledcomponents,
} from './tools'

export default [
	{
		id: 1,
		title: 'Portfolio V2',
		description:
			'This site where you are right now is the 2nd iteration of my personal portfolio.',
		tools: [next, chakra],
		repo: 'https://niteshseram.in',
		feature: false,
	},
	{
		id: 2,
		title: 'Booksify',
		description:
			'Booksify is a online book store where you can buy your favorite books. It is built using MERN stack and Redux with payment gateway integrated. It has all the major features like Admin Dashboard, Shopping Cart, Order etc.',
		tools: [react, node, monogdb],
		live: 'https://booksify.herokuapp.com/',
		repo: 'https://github.com/niteshseram/Booksify',
		feature: true,
	},
	{
		id: 3,
		title: 'IPL Dashboard',
		description:
			'IPL Dashboard project allows you to browse your favorite IPL teams and access their past games details, wins and losses ratios accessible by team and tournament year.',
		tools: [react, springboot, hsql],
		live: 'https://ipl-dashboard-97.netlify.app/',
		repo: 'https://github.com/niteshseram/IPLDashboard',
		feature: true,
	},
	{
		id: 4,
		title: 'Portfolio V1',
		description:
			'The first iteration of my portfolio built using NextJs and Styled Components',
		tools: [next, styledcomponents],
		live: 'https://niteshseram-q42jyvlvl-niteshseram.vercel.app/',
		repo: 'https://github.com/niteshseram/Portfolio',
		feature: false,
	},
]
