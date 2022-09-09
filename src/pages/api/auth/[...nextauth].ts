import { env } from "@/env/server.mjs";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

const SPOTIFY_AUTHORIZATION_URL =
	"https://accounts.spotify.com/authorize?" +
	new URLSearchParams({
		scope: "user-read-email,user-read-private,user-top-read",
	});

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
	try {
		const url =
			"https://accounts.spotify.com/api/token?" +
			new URLSearchParams({
				client_id: env.SPOTIFY_CLIENT_ID,
				client_secret: env.SPOTIFY_CLIENT_SECRET,
				grant_type: "refresh_token",
				refresh_token: token.refreshToken,
			});

		const response = await fetch(url, {
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
				).toString("base64")}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: "POST",
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
		};
	} catch (error) {
		console.log(error);

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export const authOptions: NextAuthOptions = {
	// Include user.id on session
	callbacks: {
		async jwt({ token, user, account }) {
			// Initial sign in
			if (account && user) {
				const accountExpiresAt = account.expires_at
					? account.expires_at * 1000
					: 30 * 24 * 60 * 60 * 1000;
				return {
					accessToken: account.access_token,
					accessTokenExpires: Date.now() + accountExpiresAt,
					refreshToken: account.refresh_token,
					user,
				};
			}

			// Return previous token if the access token has not expired yet
			if (Date.now() < token.accessTokenExpires) {
				return token;
			}

			// Access token has expired, try to update it
			return refreshAccessToken(token);
		},
		async session({ session, user, token }) {
			session.token = token;
			return session;
		},
	},
	// Configure one or more authentication providers
	providers: [
		SpotifyProvider({
			clientId: env.SPOTIFY_CLIENT_ID,
			clientSecret: env.SPOTIFY_CLIENT_SECRET,
			authorization: SPOTIFY_AUTHORIZATION_URL,
		}),
	],
};

export default NextAuth(authOptions);
