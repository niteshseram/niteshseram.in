import { writeFileSync } from 'fs'
import { globby } from 'globby'
import { Readable } from 'stream'
import { SitemapStream, streamToPromise }  from 'sitemap'

async function generate() {
	const baseUrl = 'https://niteshseram.in'

	const pages = await globby([
		'pages/*.js',
		'data/**/*.mdx',
		'!data/*.mdx',
		'!pages/_*.js',
		'!pages/api',
		'!pages/404.js',
	])

	const links = pages.map((page) => {
		const path = page
			.replace('pages', '')
			.replace('data', '')
			.replace('.js', '')
			.replace('.mdx', '')
		return path === '/index'
			? { url: '/', changefreq: 'daily', priority: 0.7 }
			: { url: path, changefreq: 'daily', priority: 0.7 }
	})
	
	const stream = new SitemapStream({ hostname: baseUrl })

	const xml = await streamToPromise(
		Readable.from(links).pipe(stream)
	).then((data) => data.toString())

	writeFileSync('public/sitemap.xml', xml)
}

generate()
