import { SITE_NAME, SITE_URL } from "@/constants/seo";
import { TIME_RANGE_DESCRIPTORS } from "@/constants/timerange";
import { TimeRange } from "@/lib/spotify";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Barcode from "react-barcode";
import { View } from "../ViewSelector";

export type ReceiptProps = {
	timeRange: TimeRange;
	items: ReceiptItem[];
	totalAmount: string;
	itemType: View;
};

export type ReceiptItem = {
	title: string;
	subtitle?: string;
	amount: string;
};

const Receipt: React.FC<ReceiptProps> = ({
	items,
	totalAmount,
	timeRange,
	itemType,
}) => {
	const { data: session } = useSession();

	const checkNumber = (Math.random() * 90000 + 10000).toFixed(0);
	const cardNumber = (Math.random() * 9999 + 1).toFixed(0).padStart(4, "0");

	const currentDate = new Date();

	return (
		<VStack
			spacing={2}
			w="full"
			py={8}
			px={2}
			color="black !important"
			fontFamily="Kissinger JP"
			lineHeight={1}
			fontWeight={600}
			minH="683px"
		>
			<Text
				as="h1"
				fontFamily="Kissinger JP"
				fontWeight="bold"
				fontSize="4xl"
				letterSpacing="1px"
			>
				{SITE_NAME}
			</Text>
			<Text
				as="h3"
				fontFamily="Kissinger JP"
				textTransform="uppercase"
				fontSize="lg"
				letterSpacing="1px"
			>
				Top {itemType} &mdash; {TIME_RANGE_DESCRIPTORS[timeRange]}
			</Text>
			<Box
				w="full"
				h="6px"
				borderBottom="2px"
				borderTop="2px"
				borderStyle="dashed"
			/>
			<Flex justify="space-between" w="full" fontFamily="Kissinger JP" pt={1}>
				<Text>Order #{checkNumber}</Text>
				<Text>
					{currentDate.toLocaleDateString([], {
						month: "2-digit",
						day: "2-digit",
						year: "numeric",
					})}
				</Text>
				<Text>
					{currentDate.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</Text>
			</Flex>
			<Flex
				justify="space-between"
				w="full"
				fontFamily="Kissinger JP"
				textTransform="uppercase"
				borderBottom="2px"
				borderTop="2px"
				py={1}
				borderStyle="dashed"
			>
				<Text flexBasis="20%">Qty</Text>
				<Text flexBasis="60%">Item</Text>
				<Text flexBasis="20%" textAlign="right">
					Amt
				</Text>
			</Flex>
			<VStack spacing="6px" w="full">
				{items.map((item, index) => {
					const formattedIndex = index + 1;

					return (
						<Flex
							justify="space-between"
							w="full"
							textTransform="uppercase"
							key={item.title}
						>
							<Text flexBasis="20%">{`${
								formattedIndex < 10 ? "0" : ""
							}${formattedIndex}`}</Text>
							<Box flexBasis="60%">
								<Text>{item.title}</Text>
								<Text fontSize="xs">{item.subtitle}</Text>
							</Box>

							<Text flexBasis="20%" textAlign="right">
								{item.amount}
							</Text>
						</Flex>
					);
				})}
			</VStack>
			<Flex
				justify="space-between"
				fontSize="xl"
				fontFamily="Kissinger JP"
				w="full"
				fontWeight={700}
				borderTop="2px"
				borderStyle="dashed"
				pt={2}
			>
				<Text textTransform="uppercase">Total</Text>
				<Text>{totalAmount}</Text>
			</Flex>
			<Flex
				justify="space-between"
				fontFamily="Kissinger JP"
				w="full"
				fontWeight={700}
			>
				<Text textTransform="uppercase">Item Count</Text>
				<Text>{items.length}</Text>
			</Flex>
			<Text
				textTransform="uppercase"
				fontFamily="Kissinger JP"
				w="full"
				fontSize="sm"
				borderTop="2px"
				borderStyle="dashed"
				pt={2}
			>
				Card #: **** **** **** {cardNumber}
			</Text>
			<Text
				textTransform="uppercase"
				fontFamily="Kissinger JP"
				w="full"
				fontSize="sm"
			>
				Cardholder: {session?.user?.name}
			</Text>

			<Flex
				w="full"
				justify="flex-end"
				align="center"
				flexDir="column"
				fontFamily="Kissinger JP"
				pt={3}
				flexGrow={1}
			>
				<Text mb={-1} textTransform="uppercase">
					Thanks for visiting!
				</Text>
				<Barcode
					value={SITE_URL.slice(8)}
					background="transparent"
					displayValue={false}
					width={0.75}
					height={50}
					marginBottom={0}
				/>
				<Text fontSize="sm" mt={-2}>
					{SITE_URL.slice(8)}
				</Text>
			</Flex>
		</VStack>
	);
};

export default Receipt;
