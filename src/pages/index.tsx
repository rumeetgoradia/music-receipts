import { Layout } from "@/components/Layout";
import { Options } from "@/components/Options";
import { ReceiptBackgroundSelector } from "@/components/ReceiptBackgroundSelector";
import { ViewContainer } from "@/components/ViewContainer";
import { View, ViewSelector } from "@/components/ViewSelector";
import { RECEIPT_BACKGROUNDS } from "@/constants/receipt-backgrounds";
import {
	DEFAULT_LIMIT,
	DEFAULT_TIME_RANGE,
	SpotifyTop,
	TimeRange,
} from "@/lib/spotify";
import { trpc } from "@/utils/trpc";
import { Box, Heading, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
	const [currentView, setCurrentView] = useState<View>("tracks");
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
	const [timeRange, setTimeRange] = useState<TimeRange>(DEFAULT_TIME_RANGE);

	const [receiptBackground, setReceiptBackground] =
		useState<StaticImageData | null>(RECEIPT_BACKGROUNDS[0] || null);

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
					<>
						<ViewContainer
							isError={isError}
							isLoading={isLoading}
							tracks={tracks || []}
							artists={artists || []}
							receiptBackground={receiptBackground}
							timeRange={timeRange}
							currentView={currentView}
						/>
						<ReceiptBackgroundSelector
							setReceiptBackground={setReceiptBackground}
						/>
					</>
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
