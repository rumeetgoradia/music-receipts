import { trpc } from "@/utils/trpc";
import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
	const { data: session, status } = useSession();

	const { data, isLoading } = trpc.useQuery(["spotify.getTopTracks"]);

	if (!session) {
		return <Button onClick={() => signIn("spotify")}>Sign In</Button>;
	}

	return (
		<>
			<Button onClick={() => signOut()}>Sign Out</Button>
		</>
	);
};

export default Home;
