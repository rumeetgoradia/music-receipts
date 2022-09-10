import { Box, Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";

const SignInRequired: React.FC = () => {
	const { status } = useSession();

	if (status === "authenticated") {
		return null;
	}

	return (
		<Flex
			w="full"
			h="full"
			minH="full"
			pt="30vh"
			justify="center"
			align="center"
		>
			{status === "loading" ? (
				<Spinner size="xl" />
			) : (
				<Flex flexDir="column">
					<Heading
						as="h2"
						fontSize={{ base: "xl", sm: "3xl" }}
						fontWeight="thin"
						opacity={0.75}
						mb={{ base: 3, sm: 4 }}
					>
						Sign in to use{" "}
						<Box as="span" fontWeight="normal">
							melodeipts
						</Box>
						!
					</Heading>
					<Button
						onClick={() => signIn("spotify")}
						size={{ base: "md", sm: "lg" }}
					>
						Sign In
					</Button>
				</Flex>
			)}
		</Flex>
	);
};

export default SignInRequired;
