import { ViewSelector } from "@/components/Home";
import { View } from "@/components/Home/ViewSelector/ViewSelector";
import { Layout } from "@/components/Layout";
import { trpc } from "@/utils/trpc";
import { Box, Flex, Heading, Spinner, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Artist, Track } from "spotify-web-api-ts/types/types/SpotifyObjects";

const Home: NextPage = () => {
	const [currentView, setCurrentView] = useState<View>("tracks");
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
				<ViewContainer
					isError={isError}
					isLoading={isLoading}
					tracks={tracks!}
					artists={artists!}
					currentView={currentView}
				/>
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
			<Flex w="full" pt="35vh" justify="center" align="center">
				<Box transform="scale(1.5)">
					<Spinner size="xl" />
				</Box>
			</Flex>
		);
	}

	if (isError) {
		return (
			<Box>
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
			</Box>
		);
	}

	return (
		<Box w="full">
			{currentView === "tracks" &&
				tracks.map((track) => <div>{track.name}</div>)}
			{currentView === "artists" &&
				artists.map((artist) => <div>{artist.name}</div>)}
		</Box>
	);
};
