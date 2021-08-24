import { hsql, monogdb, node, react, springboot } from './tools'

export default [
	{
		id: 1,
		title: 'Booksify',
		description:
			'Booksify is a online book store where you can buy your favorite books. It is built using MERN stack and Redux with payment gateway integrated. It has all the major features like Admin Dashboard, Shopping Cart, Order etc.',
		tools: [react, node, monogdb],
		live: 'https://booksify.herokuapp.com/',
		repo: 'https://github.com/niteshseram/Booksify',
		feature: true,
	},
	{
		id: 2,
		title: 'IPL Dashboard',
		description:
			'IPL Dashboard project allows you to browse your favorite IPL teams and access their past games details, wins and losses ratios accessible by team and tournament year.',
		tools: [react, springboot, hsql],
		live: 'https://ipl-dashboard-97.netlify.app/',
		repo: 'https://github.com/niteshseram/IPLDashboard',
		feature: true,
	},
]
