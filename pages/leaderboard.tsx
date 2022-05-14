import { InferGetServerSidePropsType } from "next";

import {
  Heading,
  Grid,
  List,
  ListItem,
  Text,
  Stack,
  Link,
  Divider,
  useColorModeValue,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { Layout, NextChakraLink, WeightTag } from "../components";

import { prisma } from "prisma/db";

const getWeightChange = async (pid: number, months?: number) => {
  let startDate: Date;

  if (months) {
    const todaysDate = new Date();
    startDate = new Date(todaysDate.setMonth(todaysDate.getMonth() - months));
    console.log(startDate);
  } else {
    startDate = new Date(2000, 0, 1);
  }

  const startWeight = await prisma.weighIn.findFirst({
    where: {
      AND: [{ personId: pid }, { weighDate: { gte: startDate } }],
    },
    select: {
      weight: true,
      id: true,
      personId: true,
      weighDate: true,
    },
    orderBy: { weighDate: "asc" },
  });

  const endWeight = await prisma.weighIn.findFirst({
    where: { personId: pid },
    orderBy: { weighDate: "desc" },
    select: {
      weight: true,
      id: true,
      personId: true,
      weighDate: true,
    },
  });

  console.log(startWeight);
  console.log(endWeight);

  return {};
};

export const getServerSideProps = async () => {
  const allPeople = await prisma.person.findMany({
    select: { id: true, name: true },
  });

  await getWeightChange(1, 3);

  // this gets us latest weights?
  const personWithInitialWeighIn = await prisma.weighIn.findMany({
    select: {
      id: true,
      weight: true,
      weighDate: true,
      personId: true,
    },
    orderBy: {
      weighDate: "asc",
    },
  });

  const personWithCurrentWeighIn = await prisma.weighIn.findMany({
    select: {
      id: true,
      weight: true,
      weighDate: true,
      personId: true,
    },
    orderBy: {
      weighDate: "desc",
    },
  });

  const personWithInitialAndCurrentWeighIn = allPeople.map((person) => {
    const initialWeighIn = personWithInitialWeighIn.find(
      (weighIn) => weighIn.personId === person.id
    );

    const currentWeighIn = personWithCurrentWeighIn.find(
      (weighIn) => weighIn.personId === person.id
    );

    if (!initialWeighIn || !currentWeighIn) {
      throw new Error("error");
      //   return {
      //     props: {
      //       leaderboardData: undefined,
      //     },
      //   };
    }

    // These are necessary to get around the annoying prisma decimal type
    // It's unserializable!
    const startWeighIn = {
      ...initialWeighIn,
      weight: initialWeighIn?.weight.toNumber(),
    };

    const endWeighIn = {
      ...currentWeighIn,
      weight: currentWeighIn?.weight.toNumber() ?? 0,
    };

    return {
      name: person.name,
      personId: person.id,
      startWeighIn,
      endWeighIn,
      weightChange:
        startWeighIn.weight && endWeighIn.weight
          ? startWeighIn.weight - endWeighIn.weight
          : 0,
    };
  });

  return {
    props: {
      leaderboardData: personWithInitialAndCurrentWeighIn,
    },
  };
};

export const PersonPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { leaderboardData } = props;

  // const data = JSON.parse(leaderboardData);

  const nameColor = useColorModeValue("gray.700", "gray.300");
  const negativeWeightChange = useColorModeValue("red.200", "red.100");
  const positiveWeightChange = useColorModeValue("green.200", "green.100");

  const negativeWeightChangeBG = useColorModeValue("red.200", "red.400");
  const positiveWeightChangeBG = useColorModeValue("green.100", "green.600");

  if (!leaderboardData) {
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

  const sortedData = leaderboardData.sort((a, b) => {
    return a.weightChange > b.weightChange ? 1 : -1;
  });

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`} mt="4">
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <VStack isInline mb="3">
            <Heading size="lg" letterSpacing="-1px" fontWeight="700">
              Leaderboard (Weight Change)
            </Heading>
          </VStack>

          <List spacing={0} mt={0}>
            <Divider borderWidth="1.5px" mt={1} />
            {sortedData.map((person, k: number) => {
              return (
                <ListItem m="0" py="0" key={person.personId}>
                  <Stack
                    isInline
                    align="center"
                    spacing="0"
                    justifyContent="space-between"
                  >
                    <NextChakraLink
                      fontWeight="600"
                      fontSize="2xl"
                      mr="0"
                      paddingY="4px"
                      color={nameColor}
                      href={`/people/${person.name}`}
                    >
                      {person.name}
                    </NextChakraLink>
                    <Flex>
                      {person.weightChange && (
                        // person.weightChange
                        <WeightTag
                          position="relative"
                          weight={person.weightChange}
                          weighInId={person.personId}
                          // borderWidth="1px"
                          paddingX="6px"
                          border="0px"
                          letterSpacing={"-0.04em"}
                          background="transparent"
                          _before={{
                            background:
                              person.weightChange > 0
                                ? negativeWeightChangeBG
                                : positiveWeightChangeBG,
                            pos: "absolute",
                            zIndex: -1,
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                            borderColor:
                              person.weightChange > 0
                                ? negativeWeightChange
                                : positiveWeightChange,
                            opacity: 0.05,
                            content: '""',
                          }}
                          _after={{
                            pos: "absolute",
                            zIndex: -1,
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                            borderWidth: "1px",
                            borderRadius: "4px",
                            borderColor:
                              person.weightChange > 0
                                ? negativeWeightChange
                                : positiveWeightChange,
                            opacity: 0.6,
                            content: '""',
                          }}
                        />
                      )}
                    </Flex>
                  </Stack>
                  <Divider />

                  {k !== sortedData.length - 1 && <Divider />}
                </ListItem>
              );
            })}
          </List>
          <Divider borderWidth="1px" />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PersonPage;
