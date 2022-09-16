import { Container } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { SignInRequired } from "../SignInRequired";

type LayoutProps = {
	title?: string;
	unprotected?: boolean;
	children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children, unprotected, title }) => {
	const { status } = useSession();
	return (
		<>
			<NextSeo title={title} />
			<Container
				maxW="container.md"
				pt={{ base: 20, sm: 24 }}
				pb={10}
				minH="calc(100vh - 26px)"
				h="full"
				position="relative"
			>
				{status !== "authenticated" && !unprotected ? (
					<SignInRequired />
				) : (
					children
				)}
			</Container>
		</>
	);
};

export default Layout;
