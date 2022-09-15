import { Receipt, ReceiptItem } from "@/components/Receipt";
import { View } from "@/components/ViewSelector";
import { TimeRange } from "@/lib/spotify";
import { getFormattedPopularity, getTotalPopularity } from "@/utils/artist";
import { getFormattedTime, getTotalTime } from "@/utils/tracks";
import { Box, Button, Flex, Heading, Spinner, Stack } from "@chakra-ui/react";
import Image from "next/future/image";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { Artist, Track } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { ReceiptBackgroundSelector } from "../ReceiptBackgroundSelector";

type ViewContainerProps = {
	currentView: View;
	isError: boolean;
	isLoading: boolean;
	tracks: Track[];
	artists: Artist[];
	receiptBackground: StaticImageData | null;
	setReceiptBackground: (receiptBackground: StaticImageData | null) => void;
	timeRange: TimeRange;
};
const ViewContainer: React.FC<ViewContainerProps> = ({
	currentView,
	isError,
	isLoading,
	tracks,
	artists,
	receiptBackground,
	setReceiptBackground,
	timeRange,
}) => {
	const [receiptItems, setReceiptItems] = useState<ReceiptItem[]>([]);
	const [totalAmount, setTotalAmount] = useState<string>("");

	useEffect(() => {
		const newReceiptItems: ReceiptItem[] = [];
		let newTotalAmount = "";
		if (currentView === "tracks") {
			for (const track of tracks) {
				newReceiptItems.push({
					title: track.name,
					subtitle: track.artists.map((artist) => artist.name).join(", "),
					amount: getFormattedTime(track),
				});
			}
			newTotalAmount = getTotalTime(tracks);
		}

		if (currentView === "artists") {
			for (const artist of artists) {
				newReceiptItems.push({
					title: artist.name,
					subtitle: artist.genres.join(", "),
					amount: getFormattedPopularity(artist),
				});
			}

			newTotalAmount = getTotalPopularity(artists);
		}

		setReceiptItems(newReceiptItems);
		setTotalAmount(newTotalAmount);
	}, [currentView, tracks, artists]);

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

	if (!receiptBackground) {
		return (
			<Box>
				<Heading fontWeight={300} lineHeight={1.25} fontSize="2xl" mb={4}>
					There was an issue generating your receipt :(
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
		<Flex
			w="full"
			justify="space-between"
			gap={4}
			flexDir={{ base: "column", md: "row" }}
			align={{ base: "center", md: "flex-start" }}
		>
			<Box px={4} maxW="360px" w="full" position="relative" zIndex={99}>
				<Image
					src={receiptBackground}
					placeholder="blur"
					fill
					alt="Receipt background"
				/>
				<Box position="relative" zIndex={100}>
					<Receipt
						timeRange={timeRange}
						items={receiptItems}
						totalAmount={totalAmount}
						itemType={currentView}
					/>
				</Box>
			</Box>
			<Stack
				spacing={4}
				align="stretch"
				justify="stretch"
				flexGrow={1}
				zIndex={101}
				w="full"
				direction={{ base: "column" }}
			>
				<ReceiptBackgroundSelector
					receiptBackground={receiptBackground}
					setReceiptBackground={setReceiptBackground}
				/>
				<Button w="full">Download Image</Button>
			</Stack>
		</Flex>
	);
};

export default ViewContainer;
