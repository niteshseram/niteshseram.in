const client_id = process.env.SPOTIFY_CLIENT_ID || ''
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || ''
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN || ''

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const getAccessToken = async () => {
	console.log({client_id, client_secret, refresh_token})
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token,
		}),
	})
	console.log(response)
	return response.json()
}

export const getNowPlaying = async () => {
	const { access_token } = await getAccessToken()

	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
}