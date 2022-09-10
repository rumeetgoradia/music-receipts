import { SITE_NAME } from "@/constants/seo";
import { useColor } from "@/hooks/useColor";
import {
	Button,
	Container,
	Flex,
	HStack,
	Link as Anchor,
} from "@chakra-ui/react";
import fade from "color-alpha";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = ({}) => {
	const { status } = useSession();

	const backgroundColor = useColor("black");

	return (
		<Flex
			as="header"
			justify="center"
			w="full"
			borderBottom="1px"
			borderBottomColor={
				status === "authenticated" ? "gray.700" : "transparent"
			}
			position="fixed"
			zIndex="banner"
			top={0}
			left={0}
			bg={fade(backgroundColor, 0.9)}
			backdropFilter={
				status === "authenticated" ? "saturate(180%) blur(5px)" : "none"
			}
			sx={{
				"@supports not (backdrop-filter: none)": {
					backdropFilter: "none",
					bg: "black",
				},
			}}
		>
			<Container maxW="container.md" py={2}>
				<Flex
					justify={status === "authenticated" ? "space-between" : "center"}
					align="center"
					w="full"
				>
					<Link href="/" passHref>
						<Anchor
							fontWeight={300}
							title={SITE_NAME}
							fontSize={
								status === "authenticated" ? { base: "2xl", sm: "3xl" } : "4xl"
							}
							color="brand.900"
							textDecoration="none !important"
							_hover={{ transform: "scale(1.025)" }}
							_focusVisible={{ transform: "scale(1.025)" }}
							_active={{ transform: "scale(0.975)" }}
						>
							melodeipts
						</Anchor>
					</Link>
					{status === "authenticated" && (
						<HStack spacing={4}>
							<Link passHref href="/about">
								<Button as="a" variant="link" title="About">
									About
								</Button>
							</Link>
							<Button
								as="a"
								variant="link"
								cursor="pointer"
								title="Sign out"
								onClick={() => signOut()}
							>
								Sign Out
							</Button>
						</HStack>
					)}
				</Flex>
			</Container>
		</Flex>
	);
};

export default Navbar;
