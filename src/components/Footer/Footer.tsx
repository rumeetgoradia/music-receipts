import { Box, Link } from "@chakra-ui/react";

const Footer: React.FC = ({}) => {
	return (
		<Box
			as="footer"
			w="full"
			textAlign="center"
			fontSize="xs"
			fontWeight={300}
			opacity={0.8}
			py={1}
		>
			Created by{" "}
			<Link
				href="https://rumeetgoradia.com"
				isExternal
				_hover={{ color: "brand.900" }}
				_focusVisible={{ color: "brand.900" }}
			>
				Rumeet Goradia
			</Link>
		</Box>
	);
};

export default Footer;
