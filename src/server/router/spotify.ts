import { getTopArtists, getTopTracks, SpotifyTop } from "@/lib/spotify";
import { TRPCError } from "@trpc/server";
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
				if (!response.ok) {
					throw new TRPCError({
						message: `Got ${response.status} response`,
						code: "INTERNAL_SERVER_ERROR",
					});
				}

				const { items } = await response.json();

				return items as Track[];
			} catch (e) {
				console.log(e);
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
				if (!response.ok) {
					throw new TRPCError({
						message: `Got ${response.status} response`,
						code: "INTERNAL_SERVER_ERROR",
					});
				}

				const { items } = await response.json();

				return items as Artist[];
			} catch (e) {
				console.log(e);
				return [];
			}
		},
	});
