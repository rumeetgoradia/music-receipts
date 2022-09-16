import { Receipt, ReceiptItem } from "@/components/Receipt";
import { View } from "@/components/ViewSelector";
import { TimeRange } from "@/lib/spotify";
import { getFormattedPopularity, getTotalPopularity } from "@/utils/artist";
import { getFormattedTime, getTotalTime } from "@/utils/track";
import { Box, Button, Flex, Heading, Spinner, VStack } from "@chakra-ui/react";
import download from "downloadjs";
import { toPng } from "html-to-image";
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

	const convertDivToImg = async (node: HTMLElement) => {
		const scale = 1;

		const style = {
			transform: "scale(" + scale + ")",
			"transform-origin": "top left",
			width: node.offsetWidth + "px",
			height: node.offsetHeight + "px",
		};

		const param = {
			cacheBust: true,
			height: node.offsetHeight * scale,
			width: node.offsetWidth * scale,
			style,
		};

		const data = await toPng(node, param);
		return data;
	};

	const downloadReceiptPng = async () => {
		try {
			const receiptRef = document.getElementById("receipt");
			if (!receiptRef) {
				return;
			}

			const data = await convertDivToImg(receiptRef);
			if (data) {
				download(
					data,
					`melodeipt-${new Date()
						.toLocaleDateString()
						.replaceAll("/", "-")}.png`,
					"image/png"
				);
			}
		} catch (e) {
			console.log(e);
		}
	};

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
		<Flex w="full" justify="center">
			<VStack w="full" spacing={4} maxW="360px">
				<Box
					px={6}
					w="full"
					position="relative"
					zIndex={99}
					id="receipt"
					bgImage={receiptBackground.src}
					bgSize="cover"
					bgPos="center center"
				>
					<Box position="relative" zIndex={100}>
						<Receipt
							timeRange={timeRange}
							items={receiptItems}
							totalAmount={totalAmount}
							itemType={currentView}
						/>
					</Box>
				</Box>
				<ReceiptBackgroundSelector
					receiptBackground={receiptBackground}
					setReceiptBackground={setReceiptBackground}
				/>
				<Button w="full" onClick={downloadReceiptPng} title="Download image">
					Download
				</Button>
			</VStack>
		</Flex>
	);
};

export default ViewContainer;
