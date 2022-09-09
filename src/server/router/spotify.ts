import { getTopArtists, getTopTracks } from "@/lib/spotify";
import { Artist, Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { createProtectedRouter } from "./context";

export const spotifyRouter = createProtectedRouter()
	.query("getTopTracks", {
		async resolve({ ctx }) {
			const {
				token: { accessToken },
			} = ctx.session;

			try {
				const response = await getTopTracks(accessToken);
				const { items } = await response.json();

				return items as Track[];
			} catch (e) {
				return [];
			}
		},
	})
	.query("getTopArtists", {
		async resolve({ ctx }) {
			const {
				token: { accessToken },
			} = ctx.session;

			try {
				const response = await getTopArtists(accessToken);
				const { items } = await response.json();

				return items as Artist[];
			} catch (e) {
				return [];
			}
		},
	});
