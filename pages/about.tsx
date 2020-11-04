import {
  Heading,
  Box,
  Text,
  Grid,
  Stack,
  List,
  ListItem,
  ListIcon,
  Link,
  useColorModeValue,
} from "@chakra-ui/core";

import { Layout } from "../components/Layout";
// import { NextChakraLink } from "../components/NextChakraLink";

import { Minus } from "heroicons-react";

const AboutPage: React.FunctionComponent = () => {
  const linkColor = useColorModeValue("pink.400", "pink.300");
  const creditsText = useColorModeValue("gray.500", "gray.500");
  const listDecoration = useColorModeValue("gray.400", "gray.600");
  const technologyLinkColor = useColorModeValue("pink.500", "pink.400");

  return (
    <Layout title="About | nonstarter">
      <Grid
        templateColumns={`1fr min(65ch, 100%) 1fr`}
        sx={{
          "& > *": {
            gridColumn: 2,
          },
        }}
        rowGap={3}
      >
        <Grid px={["4", "4", "2", "2"]}>
          <Stack>
            <Heading mt="4" mb="2" size="lg">
              About
            </Heading>
            <Text fontSize="lg">
              A simple way for a group of people to track their weight and hold
              each other accountable.
            </Text>

            <Text fontSize="lg" pt="4" fontWeight="500" fontFamily="heading">
              Credits
            </Text>
            <Box textColor={creditsText}>
              <Text my="0" fontFamily="heading">
                Made by:{" "}
                <Link
                  href="https://nonissue.org"
                  color={linkColor}
                  fontWeight="700"
                  textTransform="uppercase"
                >
                  @nonissue
                </Link>
              </Text>
              <Text my="0" fontFamily="heading">
                View source:&nbsp;
                <Link
                  href="https://github.com/nonissue/weightandsee"
                  color={linkColor}
                  fontWeight="700"
                  textTransform="uppercase"
                >
                  @github
                </Link>
              </Text>
            </Box>

            <Text fontSize="lg" pt="4" fontWeight="500" fontFamily="heading">
              Version
            </Text>
            <Text fontFamily="mono" fontSize="sm" color="gray.400">
              0.1.1 (beta)
            </Text>

            <Text fontSize="lg" pt="4" fontWeight="500" fontFamily="heading">
              Technologies
            </Text>
            <List mb="2" fontFamily="heading">
              <ListItem ml="1">
                <ListIcon
                  as={Minus}
                  color={listDecoration}
                  fontWeight="300"
                  mb="3px"
                  verticalAlign="middle"
                />
                <Link color={technologyLinkColor} href="https://nextjs.org">
                  Next.js
                </Link>
              </ListItem>
              <ListItem ml="1">
                <ListIcon
                  as={Minus}
                  color={listDecoration}
                  fontWeight="300"
                  mb="3px"
                  verticalAlign="middle"
                />
                <Link color={technologyLinkColor} href="https://prisma.io">
                  Prisma
                </Link>
              </ListItem>
              <ListItem ml="1">
                <ListIcon
                  as={Minus}
                  color={listDecoration}
                  fontWeight="300"
                  mb="3px"
                  verticalAlign="middle"
                />
                <Link
                  href="https://next.chakra-ui.com"
                  color={technologyLinkColor}
                >
                  Chakra-UI
                </Link>
              </ListItem>
              <ListItem ml="1">
                <ListIcon
                  as={Minus}
                  color={listDecoration}
                  fontWeight="300"
                  mb="3px"
                  verticalAlign="middle"
                />
                <Link href="" color={technologyLinkColor}>
                  React-Hook-Form
                </Link>
              </ListItem>
              <ListItem ml="1">
                <ListIcon
                  as={Minus}
                  color={listDecoration}
                  fontWeight="300"
                  mb="3px"
                  verticalAlign="middle"
                />
                <Link
                  href="https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-sql-typescript-postgres"
                  color={technologyLinkColor}
                >
                  Postgres
                </Link>
              </ListItem>
              <ListItem ml="1">
                <ListIcon
                  as={Minus}
                  color={listDecoration}
                  fontWeight="300"
                  mb="3px"
                  verticalAlign="middle"
                />
                <Link
                  href="http://typescriptlang.org"
                  color={technologyLinkColor}
                >
                  TypeScript
                </Link>
              </ListItem>
            </List>
          </Stack>
        </Grid>

        <Grid px={["4", "4", "2", "2"]}></Grid>
        {/* <Text px={["4", "4", "2", "2"]}>
          <NextChakraLink href="/" fontFamily="mono">
            Footer
          </NextChakraLink>
        </Text> */}
      </Grid>
    </Layout>
  );
};

export default AboutPage;
