import { Artist } from "spotify-web-api-ts/types/types/SpotifyObjects";
export const getFormattedPopularity = (artist: Artist): string => {
	return calculatePopularity(artist.popularity, artist.genres.length).toFixed(
		2
	);
};

export const getTotalPopularity = (artists: Artist[]): string => {
	let popularity = 0;
	for (const artist of artists) {
		popularity += calculatePopularity(artist.popularity, artist.genres.length);
	}

	return popularity.toFixed(2);
};

const calculatePopularity = (popularity: number, genres: number): number => {
	return Math.max(1, (10 - popularity / 10.0) * 10) + genres / 10.0;
};
