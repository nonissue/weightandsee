import {
  Heading,
  Box,
  Text,
  Grid,
  Stack,
  Divider,
  List,
  ListItem,
  Link,
  useColorModeValue
} from "@chakra-ui/core";

import { Layout } from "../components/Layout";
import { NextChakraLink } from "../components/NextChakraLink";

const AboutPage: React.FunctionComponent = () => {
  const linkColor = useColorModeValue("pink.400", "pink.300");
  const creditsText = useColorModeValue("gray.500", "gray.500");

  return (
    <Layout title="About | nonstarter">
      <Grid
        templateColumns={`1fr min(65ch, 100%) 1fr`}
        sx={{
          "& > *": {
            gridColumn: 2
          }
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
                  href="https://github.com/nonissue/catchweight"
                  color={linkColor}
                  fontWeight="700"
                  textTransform="uppercase"
                >
                  @github
                </Link>
              </Text>
            </Box>

            <Text fontSize="lg" pt="4" fontWeight="500" fontFamily="heading">
              Technologies
            </Text>
            <List mb="2">
              <ListItem>Next.js</ListItem>
              <ListItem>Prisma</ListItem>
              <ListItem>Chakra-UI</ListItem>
              <ListItem>React-Hook-Form</ListItem>
              <ListItem>Postgres</ListItem>
              <ListItem>TypeScript</ListItem>
            </List>
          </Stack>
        </Grid>

        <Grid px={["4", "4", "2", "2"]}>
          <Divider />
        </Grid>
        <Text px={["4", "4", "2", "2"]}>
          <NextChakraLink href="/" fontFamily="mono">
            Home
          </NextChakraLink>
        </Text>
      </Grid>
    </Layout>
  );
};

export default AboutPage;
