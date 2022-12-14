import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user?: {
			id: string;
		} & DefaultSession["user"];
		token: JWT;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string;
		accessTokenExpires: number;
		refreshToken: string;
		user?: {
			id: string;
		} & DefaultSession["user"];
	}
}
