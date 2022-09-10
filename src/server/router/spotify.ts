import { getTopArtists, getTopTracks, SpotifyTop } from "@/lib/spotify";
import { Artist, Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { createProtectedRouter } from "./context";

export const spotifyRouter = createProtectedRouter()
	.query("getTopTracks", {
		input: SpotifyTop.omit({ accessToken: true }),
		async resolve({ ctx, input }) {
			const {
				token: { accessToken },
			} = ctx.session;

			try {
				const response = await getTopTracks({ accessToken, ...input });
				const { items } = await response.json();

				return items as Track[];
			} catch (e) {
				console.log("error", e);
				return [];
			}
		},
	})
	.query("getTopArtists", {
		input: SpotifyTop.omit({ accessToken: true }),
		async resolve({ ctx, input }) {
			const {
				token: { accessToken },
			} = ctx.session;

			try {
				const response = await getTopArtists({ accessToken, ...input });
				const { items } = await response.json();

				return items as Artist[];
			} catch (e) {
				return [];
			}
		},
	});
