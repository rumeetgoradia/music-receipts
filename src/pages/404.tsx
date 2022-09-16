import { Layout } from "@/components/Layout";
import { Heading, Link as ChakraLink } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";

const _404Page: NextPage = () => {
	return (
		<Layout title="404" unprotected>
			<Heading fontWeight={300} lineHeight={1.25} fontSize="2xl" mb={4}>
				There&apos;s nothing here.
			</Heading>
			<Heading
				as="h2"
				opacity={0.75}
				fontWeight={300}
				lineHeight={1.25}
				fontSize="xl"
			>
				Wanna head back to the{" "}
				<Link href="/" passHref>
					<ChakraLink color="brand.900">home page</ChakraLink>
				</Link>
				?
			</Heading>
		</Layout>
	);
};

export default _404Page;
