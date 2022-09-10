import { Layout } from "@/components/Layout";
import { TimeRangeEnum } from "@/lib/spotify";
import { trpc } from "@/utils/trpc";
import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
	const [limit, setLimit] = useState<number>();
	const [timeRange, setTimeRange] = useState<TimeRangeEnum>();

	const {
		data: tracks,
		isLoading: tracksAreLoading,
		isError: tracksAreError,
	} = trpc.useQuery(["spotify.getTopTracks", {}]);

	const {
		data: artists,
		isLoading: artistsAreLoading,
		isError: artistsAreError,
	} = trpc.useQuery(["spotify.getTopArtists", {}]);

	if (tracksAreLoading) {
		return (
			<Layout>
				<Flex w="full" pt="35vh" justify="center" align="center">
					<Box transform="scale(1.5)">
						<Spinner size="xl" />
					</Box>
				</Flex>
			</Layout>
		);
	}

	if (tracksAreError || !tracks || !artists) {
		console.log("error", tracksAreError);
		console.log("received", tracks);

		return (
			<Layout>
				<Heading fontWeight={300} lineHeight={1.25} fontSize="3xl" mb={4}>
					There was an issue retrieving your data from the server :(
				</Heading>
				<Heading
					as="h2"
					opacity={0.75}
					fontWeight={300}
					lineHeight={1.25}
					fontSize="2xl"
				>
					Sorry about that. Please try again later!
				</Heading>
			</Layout>
		);
	}

	return (
		<Layout>
			{tracks.map((datum) => (
				<div key={datum.id}>{datum.name}</div>
			))}
			<br />
			{artists.map((datum) => (
				<div key={datum.id}>{datum.name}</div>
			))}
		</Layout>
	);
};

export default Home;
