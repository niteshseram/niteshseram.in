import { REACTION } from '@/constants'
import React from 'react'
import { useDebounce } from 'react-use'
import useSWR, { SWRConfiguration } from 'swr'

const API_URL = `/api/reactions`

type MetricsPayload = {
	likes: string
	loves: string,
	isLiked: Boolean,
	isLoved: Boolean,
}

async function getPostReactions(slug: string): Promise<MetricsPayload> {
	const res = await fetch(API_URL + `/${slug}`)
	if (!res.ok) {
		throw new Error('An error occurred while fetching the data.')
	}
	return res.json()
}

async function updatePostReactions(
	slug: string,
	reactionType: string
): Promise<MetricsPayload> {
	const res = await fetch(API_URL + `/${slug}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(reactionType),
	})

	if (!res.ok) {
		throw new Error('An error occurred while posting the data.')
	}

	return res.json()
}

export const usePostReactions = (slug: string, config?: SWRConfiguration) => {
	const { data, error, mutate } = useSWR(
		[API_URL, slug],
		() => getPostReactions(slug),
		{
			dedupingInterval: 60000,
			...config,
		}
	)

	const [batchedReaction, setBatchedReaction] = React.useState('')

	const reaction = (type: string) => {
		// Prevent the user from reacting again
		if (!data || (type === REACTION.like && data.isLiked) || 
		(type === REACTION.love && data.isLoved)) {
			return
		}

		// update the local swr cache so reactions updates immediately for the user
    if(type === REACTION.love){
      mutate(
				{
					likes: data.likes,
					loves: (BigInt(data.loves) + BigInt(1)).toString(),
					isLoved: true,
					isLiked: data.isLiked,
				},
				false
			)
    }
    if(type === REACTION.like){
      mutate(
				{
					likes: (BigInt(data.likes) + BigInt(1)).toString(),
					loves: data.loves,
					isLiked: true,
					isLoved: data.isLoved,
				},
				false
			)
    }

		setBatchedReaction(type)
	}

	useDebounce(
		() => {
			if (!batchedReaction) return

			// update the database and use the data updatePostReactions returns to update
			// the local cache with database data
			mutate(updatePostReactions(slug, batchedReaction))
			setBatchedReaction('')
		},
		1000,
		[batchedReaction]
	)

	return {
		loves: data?.loves,
		likes: data?.likes,
		isLoved: data?.isLoved,
		isLiked: data?.isLiked,
		isLoading: !error && !data,
		isError: !!error,
		reaction,
	}
}
