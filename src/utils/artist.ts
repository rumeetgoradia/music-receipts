import { Artist } from "spotify-web-api-ts/types/types/SpotifyObjects";
export const getFormattedPopularity = (artist: Artist): string => {
	return (artist.popularity / 10.0).toFixed(2);
};

export const getTotalPopularity = (artists: Artist[]): string => {
	let popularity = 0;
	for (const artist of artists) {
		popularity += artist.popularity;
	}

	return popularity.toFixed(2);
};
