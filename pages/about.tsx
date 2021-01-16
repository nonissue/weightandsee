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
  SimpleGrid,
} from "@chakra-ui/react";

import { Layout } from "../components";

import { MinusSolid as Minus } from "@graywolfai/react-heroicons";

const AboutPage: React.FunctionComponent = () => {
  // const linkColor = useColorModeValue("pink.400", "pink.300");
  const creditsText = useColorModeValue("gray.500", "gray.500");
  const listDecoration = useColorModeValue("gray.400", "gray.600");
  const headerColor = useColorModeValue("pink.400", "pink.200");

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
        mt="8"
      >
        <Grid px={["4", "4", "2", "2"]}>
          <Stack mb="4">
            <Heading
              size="xl"
              fontWeight="725"
              fontFamily="Recursive"
              color={headerColor}
              mb="2"
              style={{
                fontVariationSettings: `"MONO" 0, "CRSV" 1, "CASL" 0.15, "slnt" 0`,
              }}
            >
              About
            </Heading>
            <Text fontSize="lg">
              A simple way for a group of people to track their weight and hold
              each other accountable.
            </Text>
            <SimpleGrid columns={[1, null, 3, 3]} spacing={[2, 2, 10, 10]}>
              <Box>
                <Text
                  fontSize="xl"
                  pt="4"
                  fontWeight="500"
                  fontFamily="heading"
                >
                  Technologies
                </Text>
                <List mb="0" pt="2" fontFamily="body">
                  <ListItem ml="1">
                    <ListIcon
                      as={Minus}
                      color={listDecoration}
                      fontWeight="300"
                      mb="3px"
                      verticalAlign="middle"
                    />
                    <Link href="https://nextjs.org" variant="external">
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
                    <Link
                      // color={technologyLinkColor}
                      variant="external"
                      href="https://prisma.io"
                    >
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
                      // color={technologyLinkColor}
                      variant="external"
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
                    <Link href="" variant="external">
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
                      // color={technologyLinkColor}
                      variant="external"
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
                      // color={technologyLinkColor}
                      variant="external"
                    >
                      TypeScript
                    </Link>
                  </ListItem>
                </List>
              </Box>
              <Box>
                <Text
                  fontSize="xl"
                  pt="4"
                  fontWeight="500"
                  fontFamily="heading"
                >
                  Credits
                </Text>
                <Box textColor={creditsText}>
                  <Text my="0" fontFamily="heading" pt="2">
                    Made by:{" "}
                    <Link
                      href="https://nonissue.org"
                      // color={linkColor}
                      variant="external"
                      fontWeight="500"
                      fontFamily="heading"
                    >
                      @nonissue
                    </Link>
                  </Text>
                  <Text my="0" fontFamily="body">
                    View source:&nbsp;
                    <Link
                      href="https://github.com/nonissue/weightandsee"
                      variant="external"
                      fontWeight="500"
                      fontFamily="heading"
                    >
                      @github
                    </Link>
                  </Text>
                </Box>
                <Text
                  fontSize="xl"
                  fontWeight="500"
                  pt="4"
                  fontFamily="heading"
                >
                  Version
                </Text>
                <Text fontFamily="mono" fontSize="sm" color="gray.400" pt="2">
                  0.1.1 (beta)
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize="xl"
                  fontWeight="500"
                  pt="4"
                  fontFamily="heading"
                >
                  Changelog
                </Text>
                <Text fontFamily="mono" fontSize="sm" pt="2">
                  0.1.1 (beta)
                </Text>
              </Box>
            </SimpleGrid>
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AboutPage;
