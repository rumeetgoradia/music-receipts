import { Box, Flex } from "@chakra-ui/react";

type ViewSelectorProps = {
	currentView: View;
	setCurrentView: (newView: View) => void;
};

export const VIEWS = ["tracks", "artists"] as const;
export type View = typeof VIEWS[number];

const ViewSelector: React.FC<ViewSelectorProps> = ({
	currentView,
	setCurrentView,
}) => {
	return (
		<Flex w="full">
			{VIEWS.map((view) => (
				<Box
					onClick={() => setCurrentView(view)}
					flexGrow={1}
					cursor="pointer"
					key={view}
					p={4}
					borderBottom="1px"
					borderBottomColor={currentView === view ? "brand.900" : "white"}
					color={currentView === view ? "brand.900" : "white"}
					textTransform="uppercase"
					textAlign="center"
					letterSpacing={2}
				>
					{view}
				</Box>
			))}
		</Flex>
	);
};

export default ViewSelector;
