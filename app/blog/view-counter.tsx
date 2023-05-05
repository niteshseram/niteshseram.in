'use client'

import { useEffect } from 'react'
import useSWR from 'swr';

type PostView = {
	slug: string
	total: string
}

async function fetcher<JSON = any>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const res = await fetch(input, init)
	return res.json()
}

export default function ViewCounter({
	slug,
	trackView,
}: {
	slug: string
	trackView: boolean
}) {
	const { data } = useSWR<PostView>(`/api/views/${slug}`, fetcher)
	const views = new Number(data?.total)

	useEffect(() => {
		const registerView = () =>
			fetch(`/api/views/${slug}`, {
				method: 'POST',
			})

		if (trackView) {
			registerView()
		}
	}, [slug, trackView])

	return (
		<span>
			{data ? `${views.toLocaleString()} views` : '- views​'}
		</span>
	)
}
