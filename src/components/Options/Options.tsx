import { TimeRange } from "@/lib/spotify";
import {
	Box,
	Flex,
	FormControl,
	FormLabel,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
} from "@chakra-ui/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

type OptionsProps = {
	limit: number;
	setLimit: (limit: number) => void;
	timeRange: TimeRange;
	setTimeRange: (timeRange: TimeRange) => void;
};

const Options: React.FC<OptionsProps> = ({
	limit,
	setLimit,
	timeRange,
	setTimeRange,
}) => {
	return (
		<Flex gap={4} w="full">
			<FormControl w="full">
				<FormLabel>Number of items</FormLabel>
				<NumberInput
					max={50}
					min={1}
					w="full"
					value={limit}
					onChange={(value) => {
						const intValue = parseInt(value);
						setLimit(intValue < 1 ? 1 : intValue > 50 ? 50 : intValue);
					}}
				>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper borderColor="whiteAlpha.100">
							<BsChevronUp />
						</NumberIncrementStepper>
						<NumberDecrementStepper borderColor="whiteAlpha.100">
							<BsChevronDown />
						</NumberDecrementStepper>
					</NumberInputStepper>
				</NumberInput>
			</FormControl>
			<FormControl w="full">
				<FormLabel>Time range</FormLabel>
				<Select
					defaultValue="medium"
					value={timeRange}
					icon={
						<Box transform="scale(0.75)">
							<BsChevronDown />
						</Box>
					}
					onChange={(e) => {
						const { value } = e.target;
						setTimeRange(value as TimeRange);
					}}
				>
					<option value="short">Last month</option>
					<option value="medium">Last 6 months</option>
					<option value="long">All time</option>
				</Select>
			</FormControl>
		</Flex>
	);
};

export default Options;
