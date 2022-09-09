const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const TOP_ENDPOINT = "https://api.spotify.com/v1/me/top";

// export const getAccessToken = async (
// 	refreshToken: string
// ): Promise<{ access_token: string }> => {
// 	const refresh_token = refreshToken;

// 	const response = await fetch(TOKEN_ENDPOINT, {
// 		method: "POST",
// 		headers: {
// 			Authorization: `Basic ${Buffer.from(
// 				`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
// 			).toString("base64")}`,
// 			"Content-Type": "application/x-www-form-urlencoded",
// 		},
// 		body: new URLSearchParams({
// 			grant_type: "refresh_token",
// 			refresh_token,
// 		}),
// 	});

// 	return response.json();
// };

export const getTopTracks = async (accessToken: string, limit?: number) => {
	return getTopItems(accessToken, "tracks", limit);
};

export const getTopArtists = async (accessToken: string, limit?: number) => {
	return getTopItems(accessToken, "artists", limit);
};

const getTopItems = async (
	accessToken: string,
	itemType: "tracks" | "artists",
	limit?: number
) => {
	const access_token = accessToken;
	const limitQuery = `?limit=${limit || 10}`;

	return fetch(`${TOP_ENDPOINT}/${itemType}${limitQuery}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
};
