import { Layout } from "@/components/Layout";
import { Options } from "@/components/Options";
import { View, ViewSelector } from "@/components/ViewSelector";
import {
	DEFAULT_LIMIT,
	DEFAULT_TIME_RANGE,
	SpotifyTop,
	TimeRange,
} from "@/lib/spotify";
import { trpc } from "@/utils/trpc";
import { Box, Flex, Heading, Spinner, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Artist, Track } from "spotify-web-api-ts/types/types/SpotifyObjects";

const Home: NextPage = () => {
	const [currentView, setCurrentView] = useState<View>("tracks");
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
	const [timeRange, setTimeRange] = useState<TimeRange>(DEFAULT_TIME_RANGE);

	const {
		data: tracks,
		isLoading: tracksAreLoading,
		isError: tracksAreError,
	} = trpc.useQuery(["spotify.getTopTracks", { limit, timeRange }]);

	const {
		data: artists,
		isLoading: artistsAreLoading,
		isError: artistsAreError,
	} = trpc.useQuery(["spotify.getTopArtists", { limit, timeRange }]);

	useEffect(() => {
		if (
			(currentView === "tracks" && tracksAreLoading) ||
			(currentView === "artists" && artistsAreLoading)
		) {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}

		if (
			(currentView === "tracks" && (tracksAreError || !tracks)) ||
			(currentView === "artists" && (artistsAreError || !artists))
		) {
			setIsError(true);
		} else {
			setIsError(false);
		}
	}, [
		artists,
		artistsAreError,
		artistsAreLoading,
		currentView,
		tracks,
		tracksAreError,
		tracksAreLoading,
	]);

	return (
		<Layout>
			<VStack spacing={8} align="flex-start">
				<ViewSelector
					currentView={currentView}
					setCurrentView={setCurrentView}
				/>
				<Options
					limit={limit}
					setLimit={setLimit}
					timeRange={timeRange}
					setTimeRange={setTimeRange}
				/>
				{SpotifyTop.safeParse({ limit, timeRange }).success ? (
					<ViewContainer
						isError={isError}
						isLoading={isLoading}
						tracks={tracks || []}
						artists={artists || []}
						currentView={currentView}
					/>
				) : (
					<Box>
						<Heading fontWeight={300} lineHeight={1.25} fontSize="2xl" mb={4}>
							Please check your options!
						</Heading>
						<Heading
							as="h2"
							opacity={0.75}
							fontWeight={300}
							lineHeight={1.25}
							fontSize="xl"
						>
							Enter a quantity between 1 and 50, and select one of the time
							ranges from the dropdown.
						</Heading>
					</Box>
				)}
			</VStack>
		</Layout>
	);
};

export default Home;

type ViewContainerProps = {
	currentView: View;
	isError: boolean;
	isLoading: boolean;
	tracks: Track[];
	artists: Artist[];
};
const ViewContainer: React.FC<ViewContainerProps> = ({
	currentView,
	isError,
	isLoading,
	tracks,
	artists,
}) => {
	if (isLoading) {
		return (
			<Flex w="full" pt="25vh" justify="center" align="center">
				<Box transform="scale(1.5)">
					<Spinner size="xl" />
				</Box>
			</Flex>
		);
	}

	if (isError) {
		return (
			<Box>
				<Heading fontWeight={300} lineHeight={1.25} fontSize="2xl" mb={4}>
					There was an issue retrieving your data from the server :(
				</Heading>
				<Heading
					as="h2"
					opacity={0.75}
					fontWeight={300}
					lineHeight={1.25}
					fontSize="xl"
				>
					Sorry about that. Please try again later!
				</Heading>
			</Box>
		);
	}

	return (
		<Box w="full">
			{currentView === "tracks" &&
				tracks.map((track) => <div key={track.name}>{track.name}</div>)}
			{currentView === "artists" &&
				artists.map((artist) => <div key={artist.name}>{artist.name}</div>)}
		</Box>
	);
};
