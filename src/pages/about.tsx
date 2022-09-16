import { Layout } from "@/components/Layout";
import { SITE_NAME } from "@/constants/seo";
import { Box, Link, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";

const AboutPage: NextPage = () => {
	return (
		<Layout title="About" unprotected>
			<VStack spacing={6} w="full" align="flex-start">
				<Box>
					<Text as="h1" fontSize="3xl" fontWeight={500} mb={2}>
						About{" "}
						<Box as="span" color="brand.900" fontWeight={700}>
							{SITE_NAME}
						</Box>
					</Text>
					<Box as="hr" m={0} border="2px" w="10%" borderColor="white" />
				</Box>
				<Text>
					Inspired by Michelle Liu&apos;s{" "}
					<Link
						isExternal
						href="https://receiptify.herokuapp.com/index.html"
						color="brand.900"
					>
						Receiptify
					</Link>
					, {SITE_NAME} is a tool that generates a downloadable receipt for your
					top tracks and artists from Spotify. You can pull your top items from
					the last month, the last 6 months, or all time. Spotify determines
					what your top items are, and {SITE_NAME} just displays this data in a
					nice receipt-like format.
				</Text>
				<Text>
					This is an open-source project &ndash; you can check out the{" "}
					<Link
						isExternal
						href="https://github.com/rumeetgoradia/music-receipts"
					>
						code repository
					</Link>{" "}
					if you&apos;re interested in how it was all works. I built {SITE_NAME}{" "}
					mostly with{" "}
					<Link isExternal href="https://nextjs.org/" color="brand.900">
						Next.js
					</Link>
					, using{" "}
					<Link isExternal href="https://chakra-ui.com/" color="brand.900">
						Chakra UI
					</Link>{" "}
					for the UI, as well as{" "}
					<Link isExternal href="https://next-auth.js.org/" color="brand.900">
						NextAuth.js
					</Link>{" "}
					and{" "}
					<Link isExternal href="https://trpc.io/" color="brand.900">
						tRPC
					</Link>{" "}
					for the backend.
				</Text>
				<Text>
					Check out{" "}
					<Link isExternal href="https://rumeetgoradia.com" color="brand.900">
						my portfolio
					</Link>{" "}
					to see more about me, my other projects, and my contact info. Thanks
					for visiting!
				</Text>
			</VStack>
		</Layout>
	);
};

export default AboutPage;
