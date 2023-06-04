import type { NextApiRequest, NextApiResponse } from 'next'
import { createHash } from 'crypto'

import prisma from '@/lib/prisma'
import { REACTION } from '@/constants'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const ipAddress =
			req.headers['x-forwarded-for'] || '0.0.0.0'

		const slug = req.query?.slug as string
		const currentUserId =
			createHash('md5')
				.update(ipAddress + process.env.IP_ADDRESS_SALT!, 'utf8')
				.digest('hex')
		// Identify a specific users interactions with a specific post
		const sessionId = slug + '___' + currentUserId

		if (!slug) {
			return res.status(400).json({ message: 'Slug is required.' })
		}
		const { method } = req

		if (method === 'POST') {
			const type = req.body

			const [newOrUpdatedReactions, user] = await Promise.all([
				prisma.reactions.upsert({
					where: { slug },
					create: {
						slug,
						likes: type === REACTION.like ? 1 : 0,
						loves: type === REACTION.love ? 1 : 0,
					},
					update: {
						likes: {
							increment: type === REACTION.like ? 1 : 0,
						},
						loves: {
							increment: type === REACTION.love ? 1 : 0,
						},
					},
				}),

				// increment the number of times this user has liked this post
				prisma.session.upsert({
					where: { id: sessionId },
					create: {
						id: sessionId,
						isLiked: type === REACTION.like,
						isLoved: type === REACTION.love,
					},
					update: {
						...(type === REACTION.like && { isLiked: true }),
						...(type === REACTION.love && { isLoved: true }),
					},
				}),
			])

			return res.status(200).json({
				likes: (newOrUpdatedReactions.likes || 0).toString(),
				loves: (newOrUpdatedReactions.loves || 0).toString(),
				isLiked: Boolean(user.isLiked),
				isLoved: Boolean(user.isLoved),
			})
		}

		if (method === 'GET') {
			const [reactions, user] = await Promise.all([
				prisma.reactions.findUnique({
				where: {
					slug,
				},
			}),
			prisma.session.findUnique({
            where: { id: sessionId },
          })
			])

			return res.status(200).json({
				likes: (reactions?.likes || 0).toString(),
				loves: (reactions?.loves || 0).toString(),
				isLiked: Boolean(user?.isLiked),
				isLoved: Boolean(user?.isLoved),
			})
		}
	} catch (e: any) {
		return res.status(500).json({ message: e.message })
	}
}
