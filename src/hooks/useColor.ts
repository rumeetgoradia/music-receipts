import { useTheme } from "@chakra-ui/react";

export const useColor = (color: string) => {
	const theme = useTheme();

	const splitColor = color.split(".");

	if (!(splitColor && splitColor.length && splitColor[0])) {
		return "";
	}

	let returnColor = theme.colors[splitColor[0]];

	for (const split of splitColor.slice(1)) {
		returnColor = returnColor[split];
	}

	return returnColor;
};
