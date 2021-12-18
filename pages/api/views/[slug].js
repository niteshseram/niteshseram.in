import prisma from 'lib/prisma'

export default async function handler(req, res) {
	try {
		const slug = req.query.slug.toString()
		const { method } = req

		if (method === 'POST') {
			const newOrUpdatedViews = await prisma.views.upsert({
				where: { slug },
				create: {
					slug,
				},
				update: {
					count: {
						increment: 1,
					},
				},
			})

			return res.status(200).json({
				total: newOrUpdatedViews.count.toString(),
			})
		}

		if (method === 'GET') {
			const views = await prisma.views.findUnique({
				where: {
					slug,
				},
			})

			return res.status(200).json({ total: views.count.toString() })
		}
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
}
