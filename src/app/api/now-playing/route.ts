import { getNowPlaying } from '@/lib/spotify';
import type { Artist, NowPlayingSong } from '@/types/Spotify';

export async function GET() {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return Response.json({
      album: '',
      albumImageUrl: '',
      artist: '',
      isPlaying: false,
      songUrl: '',
      title: '',
    });
  }

  const song = await response.json();
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists
    .map((artist: Artist) => artist.name)
    .join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return Response.json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  } as NowPlayingSong);
}
