import { z } from "zod";

const TOP_ENDPOINT = "https://api.spotify.com/v1/me/top";
const DEFAULT_LIMIT = 10;
const DEFAULT_TIME_RANGE: TimeRangeEnum = "medium";

export const getTopTracks = async (props: SpotifyTop) => {
	return getTopItems({ ...props, itemType: "tracks" });
};

export const getTopArtists = async (props: SpotifyTop) => {
	return getTopItems({ ...props, itemType: "artists" });
};

const getTopItems = async ({
	accessToken,
	limit,
	timeRange,
	itemType,
}: SpotifyTop & { itemType: "tracks" | "artists" }) => {
	const limitQuery = `?limit=${limit || DEFAULT_LIMIT}`;
	const timeRangeQuery = `&time_range=${timeRange || DEFAULT_TIME_RANGE}_term`;

	const url = `${TOP_ENDPOINT}/${itemType}${limitQuery}${timeRangeQuery}`;

	return await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const TimeRangeEnum = z.enum(["short", "medium", "long"]);
export type TimeRangeEnum = z.infer<typeof TimeRangeEnum>;

export const SpotifyTop = z.object({
	accessToken: z.string(),
	limit: z.number().min(1).max(50).default(DEFAULT_LIMIT).optional(),
	timeRange: TimeRangeEnum.default(DEFAULT_TIME_RANGE).optional(),
});

export type SpotifyTop = z.infer<typeof SpotifyTop>;
