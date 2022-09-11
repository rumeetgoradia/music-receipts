import { z } from "zod";

const TOP_ENDPOINT = "https://api.spotify.com/v1/me/top";
export const DEFAULT_LIMIT = 10;
export const DEFAULT_TIME_RANGE: TimeRange = "medium";

export const getTopTracks = async (props: SpotifyTopWithAccessToken) => {
	return getTopItems({ ...props, itemType: "tracks" });
};

export const getTopArtists = async (props: SpotifyTopWithAccessToken) => {
	return getTopItems({ ...props, itemType: "artists" });
};

const getTopItems = async ({
	accessToken,
	limit,
	timeRange,
	itemType,
}: SpotifyTopWithAccessToken & { itemType: "tracks" | "artists" }) => {
	const limitQuery = `?limit=${limit || DEFAULT_LIMIT}`;
	const timeRangeQuery = `&time_range=${timeRange || DEFAULT_TIME_RANGE}_term`;

	const url = `${TOP_ENDPOINT}/${itemType}${limitQuery}${timeRangeQuery}`;

	return await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const TimeRange = z.enum(["short", "medium", "long"]);
export type TimeRange = z.infer<typeof TimeRange>;

export const SpotifyTop = z.object({
	limit: z.number().min(1).max(50).default(DEFAULT_LIMIT).optional(),
	timeRange: TimeRange.default(DEFAULT_TIME_RANGE).optional(),
});
export const SpotifyTopWithAccessToken = z
	.object({ accessToken: z.string() })
	.merge(SpotifyTop);

export type SpotifyTop = z.infer<typeof SpotifyTop>;
export type SpotifyTopWithAccessToken = z.infer<
	typeof SpotifyTopWithAccessToken
>;
