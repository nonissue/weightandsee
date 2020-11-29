import { GetServerSideProps } from "next";
import { ensureAuthenticated } from "lib/guards/ensureAuthenticated";
import { PersonPageProps } from "interfaces";

import db from "prisma";
const prisma = db.getInstance().prisma;

import {
  Heading,
  Grid,
  List,
  ListItem,
  Text,
  Stack,
  Link,
  Divider,
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { Layout, WeightTag, NextChakraLink } from "components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  await ensureAuthenticated(context);

  // findFirst instead of findOne so we can use case insensitive filtering
  const result = await prisma.user.findFirst({
    where: {
      name: {
        equals: context.params?.name as string,
        mode: "insensitive",
      },
    },
    include: { weighIns: { orderBy: { weighDate: "desc" } } },
  });

  return {
    props: { data: JSON.stringify(result) },
  };
};

export const PersonPage: React.FunctionComponent<{ data: string }> = ({
  data,
}) => {
  let personData: PersonPageProps;

  try {
    personData = JSON.parse(data);
  } catch (error) {
    return (
      <Layout>
        <Grid maxW="min(65ch, 100%)" mx="auto" mt="8" px={["4", "4", "2", "2"]}>
          <Heading mb="2">Error {error.name}</Heading>
          <Heading size="sm">{error.message}</Heading>
        </Grid>
      </Layout>
    );
  }

  const weightColor = useColorModeValue("gray.700", "gray.300");

  const weightShadow = useColorModeValue(
    `2px 2px 1px hsla(0,0%,70%,0)`,
    `2px 2px 1px hsla(0,0%,70%,0.2)`
  );
  const headerColor = useColorModeValue("pink.400", "pink.200");

  if (!personData) {
    return (
      <Layout>
        <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
          <Grid column="2" my="4" px={["4", "4", "2", "2"]} textAlign="center">
            <Heading>Error 404</Heading>
            <Heading fontSize="lg" fontWeight="500" mt="2">
              Person Not Found
            </Heading>
            <Text mt="6">
              <Link
                href="mailto:andy@nonissue.org"
                px="3"
                py="2"
                borderRadius="6px"
                textColor="gray.100"
                fontFamily="body"
                fontWeight="700"
                shadow="sm"
                borderBottomColor="red.400"
                borderBottomWidth="2px"
                background="red.500"
              >
                Report Error
              </Link>
            </Text>
          </Grid>
        </Grid>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`} mt="4">
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <Flex
            mb="2"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection={["column", "row"]}
              // alignItems="center"
            >
              <Heading
                // mb={["2", "0"]}
                size="xl"
                fontWeight="725"
                color={headerColor}
                style={{
                  fontVariationSettings: `'MONO' 0, 'CRSV' 0.5, 'CASL' 0, 'slnt' 0`,
                }}
              >
                {personData.name}
              </Heading>
              {personData.weighIns?.length !== 0 && (
                <Box
                  mt={["2", "0"]}
                  fontWeight="700"
                  textTransform="uppercase"
                  fontSize="xs"
                  letterSpacing="0.05em"
                  display={["flex", "flex"]}
                  alignItems="center"
                >
                  <NextChakraLink
                    href={`/graphs/${personData.name}`}
                    _hover={{
                      textDecoration: "none",
                      color: useColorModeValue("pink.600", "pink.300"),
                    }}
                    mr={["2", "2"]}
                    ml={["0", "2"]}
                  >
                    Graphs
                  </NextChakraLink>
                  <NextChakraLink
                    href={`/graphs/${personData.name}`}
                    _hover={{
                      textDecoration: "none",
                      color: useColorModeValue("gray.600", "red.200"),
                    }}
                    color={useColorModeValue("red.700", "red.400")}
                  >
                    Delete
                  </NextChakraLink>
                </Box>
              )}
            </Box>

            {personData.currentWeight && (
              <Box display="flex" alignItems="center">
                <Box
                  align="center"
                  mr="2"
                  fontWeight="500"
                  textColor="gray.500"
                  textTransform="uppercase"
                  fontSize="sm"
                  letterSpacing="0.05em"
                >
                  Current:
                </Box>
                <WeightTag weight={personData.currentWeight} />
              </Box>
            )}
          </Flex>

          <Divider />
          <List w={["100%", "100%", "100%", "100%"]} mx="auto">
            {personData.weighIns && personData.weighIns.length !== 0 ? (
              personData.weighIns?.map((weighIn, k) => {
                return (
                  <ListItem key={weighIn.id}>
                    <Stack
                      isInline
                      spacing={0}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Box
                        display="flex"
                        fontFamily="heading"
                        fontSize="md"
                        textTransform="none"
                        fontWeight="400"
                        color="gray.500"
                        alignItems="center"
                      >
                        <NextChakraLink href={`/weights/${weighIn.id}`}>
                          {weighIn.weighDate.split("T")[0]}
                        </NextChakraLink>
                      </Box>
                      <Box
                        fontSize="2xl"
                        fontFamily="heading"
                        style={{
                          fontVariationSettings: `'MONO' 1, 'CASL' 0, 'CRSV' 0`,
                        }}
                        fontWeight="500"
                        color={weightColor}
                        display="inline-flex"
                        textShadow={weightShadow}
                      >
                        <Box>{weighIn.weight.toFixed(1)}</Box>
                        <Box
                          textColor="gray.500"
                          fontWeight="400"
                          fontSize="lg"
                          my="auto"
                          ml="1"
                          fontFamily="heading"
                        >
                          lbs
                        </Box>
                      </Box>
                    </Stack>
                    {personData.weighIns &&
                      k !== personData.weighIns.length - 1 && <Divider />}
                  </ListItem>
                );
              })
            ) : (
              <Box my="4">This user has no weigh-ins yet!</Box>
            )}
          </List>
          <Divider />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PersonPage;
