import { Track } from "spotify-web-api-ts/types/types/SpotifyObjects";

export const getFormattedTime = (track: Track): string => {
	const millis = track.duration_ms;
	const minutes = Math.floor(millis / 60000);
	const seconds = Math.round((millis % 60000) / 1000);
	return minutes + ":" + (seconds < 10 ? "0" : "") + seconds.toFixed(0);
};

export const getTotalTime = (tracks: Track[]): string => {
	let millis = 0;
	for (const track of tracks) {
		millis += track.duration_ms;
	}

	const hours = Math.floor(millis / (60000 * 60));
	const minutes = Math.floor(millis / 60000) % 60;
	const seconds = Math.round((millis % 60000) / 1000);

	return `${hours > 0 ? hours + ":" : ""}${
		minutes < 10 && hours > 0 ? "0" : ""
	}${minutes}:${seconds < 10 ? "0" : ""}${seconds.toFixed(0)}`;
};
