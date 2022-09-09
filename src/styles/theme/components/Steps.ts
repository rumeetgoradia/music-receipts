import { StyleFunctionProps } from "@chakra-ui/theme-tools";
import { StepsStyleConfig } from "chakra-ui-steps";

export const Steps = {
	...StepsStyleConfig,
	baseStyle: (props: StyleFunctionProps) => {
		return {
			...StepsStyleConfig.baseStyle(props),
			label: {
				...StepsStyleConfig.baseStyle(props).label,
				color: "white",
				fontSize: { base: "2xl", sm: "3xl" },
			},
			iconLabel: {
				...StepsStyleConfig.baseStyle(props).iconLabel,
				color: "white",
			},
			icon: {
				...StepsStyleConfig.baseStyle(props).icon,
				bg: "transparent",
				strokeWidth: 10,
			},
			stepIconContainer: {
				...StepsStyleConfig.baseStyle(props).stepIconContainer,
				bg: "transparent",
				lineHeight: 1,
				borderColor: "white",
				_activeStep: {
					bg: "brand.900",
					borderColor: "white",
				},
			},
		};
	},
};
