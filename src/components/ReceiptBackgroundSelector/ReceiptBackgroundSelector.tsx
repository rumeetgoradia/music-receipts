import { RECEIPT_BACKGROUNDS } from "@/constants/receipt-backgrounds";
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

type ReceiptBackgroundSelectorProps = {
	receiptBackground: StaticImageData;
	setReceiptBackground: (receiptBackground: StaticImageData | null) => void;
};

const ReceiptBackgroundSelector: React.FC<ReceiptBackgroundSelectorProps> = ({
	setReceiptBackground,
}) => {
	const [receiptBackgroundIndex, setReceiptBackgroundIndex] =
		useState<number>(0);

	useEffect(() => {
		if (isNaN(receiptBackgroundIndex)) {
			setReceiptBackground(null);
			return;
		}

		setReceiptBackground(RECEIPT_BACKGROUNDS[receiptBackgroundIndex] || null);
	}, [receiptBackgroundIndex]);

	return (
		<FormControl w="full">
			<FormLabel>Background</FormLabel>
			<Select
				defaultValue={0}
				value={receiptBackgroundIndex}
				icon={
					<Box transform="scale(0.75)">
						<BsChevronDown />
					</Box>
				}
				onChange={(e) => {
					const { value } = e.target;
					const intValue = parseInt(value);

					setReceiptBackgroundIndex(intValue);
				}}
			>
				{RECEIPT_BACKGROUNDS.map((rb, index) => {
					return (
						<option value={index} key={rb.src}>
							Background #{index + 1}
						</option>
					);
				})}
			</Select>
		</FormControl>
	);
};

export default ReceiptBackgroundSelector;
