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
  Flex,
  Box,
  Spacer,
  MenuButton,
  Menu,
  Button,
  Icon,
  MenuOptionGroup,
  MenuItemOption,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";
import { Layout, NextChakraLink, WeightTag } from "../components";

import { prisma } from "prisma/db";
import { useState } from "react";

// const getWeightChange = async (pid: number, months?: number) => {
//   let startDate: Date;

//   if (months) {
//     const todaysDate = new Date();
//     startDate = new Date(todaysDate.setMonth(todaysDate.getMonth() - months));
//     console.log(startDate);
//   } else {
//     startDate = new Date(2000, 0, 1);
//   }

//   const startWeight = await prisma.weighIn.findFirst({
//     where: {
//       AND: [{ personId: pid }, { weighDate: { gte: startDate } }],
//     },
//     select: {
//       weight: true,
//       id: true,
//       personId: true,
//       weighDate: true,
//     },
//     orderBy: { weighDate: "asc" },
//   });

//   const endWeight = await prisma.weighIn.findFirst({
//     where: { personId: pid },
//     orderBy: { weighDate: "desc" },
//     select: {
//       weight: true,
//       id: true,
//       personId: true,
//       weighDate: true,
//     },
//   });

//   console.log(startWeight);
//   console.log(endWeight);

//   return {};
// };

export const getServerSideProps = async () => {
  const allPeople = await prisma.person.findMany({
    select: { id: true, name: true },
  });

  let startDate: Date;
  const months = 5;

  if (months) {
    const todaysDate = new Date();
    startDate = new Date(todaysDate.setMonth(todaysDate.getMonth() - months));
    console.log(startDate);
  } else {
    startDate = new Date(2000, 0, 1);
  }

  //   await getWeightChange(1, 3);

  // this gets us latest weights?
  const personWithInitialWeighIn = await prisma.weighIn.findMany({
    where: { weighDate: { gte: startDate } },
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

  console.log(personWithInitialWeighIn);

  const personWithCurrentWeighIn = await prisma.weighIn.findMany({
    where: { weighDate: { gte: startDate } },
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

    // console.log(initialWeighIn);

    const currentWeighIn = personWithCurrentWeighIn.find(
      (weighIn) => weighIn.personId === person.id
    );

    if (!initialWeighIn || !currentWeighIn) {
      //   //   throw new Error("Fuck");
      // return { personId: person.id, ...EMPTY_WEIGH_IN };
      return {
        name: person.name,
        personId: person.id,
        weightChange: undefined,
      };
    }

    // These are necessary to get around the annoying prisma decimal type
    // It's unserializable!
    const startWeighIn = {
      ...initialWeighIn,
      weight: initialWeighIn?.weight.toNumber(),
    };

    const endWeighIn = {
      ...currentWeighIn,
      weight: currentWeighIn?.weight.toNumber(),
    };

    console.log(person.name);
    console.log("Start Weight: " + startWeighIn.weight);
    console.log("End Weight: " + endWeighIn.weight);

    return {
      name: person.name,
      personId: person.id,
      startWeighIn,
      endWeighIn,
      weightChange:
        startWeighIn.weight && endWeighIn.weight
          ? endWeighIn.weight - startWeighIn.weight
          : 0,
    };
  });

  return {
    props: {
      leaderboardData: personWithInitialAndCurrentWeighIn,
    },
  };
};

export const HighScoresPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { leaderboardData } = props;

  const headerColor = useColorModeValue("black", "gray.300");
  const nameColor = useColorModeValue("gray.900", "white");
  const negativeWeightChange = useColorModeValue("pink.500", "pink.300");
  const positiveWeightChange = useColorModeValue("cyan.700", "cyan.200");

  const dividerColor = useColorModeValue("gray.300", "gray.700");
  const topAndBottomDivider = useColorModeValue("gray.400", "gray.400");

  const highScoreBorder = useColorModeValue("cyan.200", "gray.700");

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
    if (a.weightChange === undefined) return 1;
    if (b.weightChange === undefined) return 1;
    if (a.weightChange === b.weightChange) return 0;

    return a.weightChange > b.weightChange ? 1 : -1;
  });

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`} mt="4">
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <Flex
            my={["4", "8"]}
            direction={["row", "row"]}
            textAlign={["center", "left"]}
          >
            <Heading
              size="lg"
              fontFamily="DM Sans"
              fontWeight="700"
              letterSpacing={"-0.02em"}
              // letterSpacing={"0.15em"}
              //   w="full"
              textTransform={"capitalize"}
              color={headerColor}
            >
              Leaderboard
            </Heading>
            <Spacer />
            <DateRangeSelector />
            {/* <Heading
              size="md"
              fontFamily="Inter"
              fontWeight="400"
              color={"gray.400"}
              letterSpacing={"-0.02em"}
              // letterSpacing={"0.15em"}
              //   w="full"
              textTransform={"capitalize"}
              //   color={headerColor}
            >
              90 days
            </Heading> */}
          </Flex>

          <List spacing={1} mt={0} borderWidth="0px" paddingX="0" paddingY="1">
            {/* people with results in time period */}
            {sortedData.map((person, k: number) => {
              if (person.weightChange) {
                return (
                  <ListItem
                    key={person.personId}
                    borderWidth={["0", k === 0 ? "1px" : "0"]}
                    shadow={[k === 0 ? "sm" : 0]}
                    // background={k === 0 ? "gray.50" : "transparent"}
                    borderColor={k === 0 ? highScoreBorder : "transparent"}
                    rounded={k === 0 ? "sm" : "none"}
                    py={k === 0 ? "1" : 0}
                    px={[
                      k === 0 ? "0" : "0",
                      k === 0 ? "6" : k === 1 ? "0" : k === 2 ? "0" : "0",
                    ]}
                    mx={[k === 0 ? "0" : "0", k === 0 ? "-10" : 0]}
                    mb={[k === 0 ? "3" : "4", k === 0 ? "2" : 0]}
                    fontSize={[
                      k === 0 ? "4xl" : k === 1 ? "2xl" : k === 2 ? "xl" : "lg",
                    ]}
                  >
                    <Stack
                      isInline
                      align="center"
                      spacing="0"
                      pt="2"
                      pb="2"
                      justifyContent="space-between"
                    >
                      <NextChakraLink
                        fontWeight={k === 0 ? "800" : "600"}
                        mr="0"
                        fontFamily={"inter"}
                        paddingY="4px"
                        color={nameColor}
                        href={`/people/${person.name}`}
                      >
                        {person.name}
                      </NextChakraLink>
                      <Flex>
                        {person.weightChange && (
                          <WeightTag
                            weight={person.weightChange}
                            position="relative"
                            paddingY="2.5px"
                            width="5.5em"
                            paddingX="3"
                            justifyContent={"center"}
                            letterSpacing={"-0.05em"}
                            background="unset"
                            borderBottom="unset"
                            marginTop={"-0px"}
                            fontSize={
                              k === 0
                                ? "lg"
                                : k === 1
                                ? "md"
                                : k === 2
                                ? "sm"
                                : "sm"
                            }
                            borderBottomColor={
                              person.weightChange > 0
                                ? negativeWeightChange
                                : positiveWeightChange
                            }
                            fontWeight="700"
                            fontFamily="Red Hat Mono"
                            color={
                              person.weightChange > 0
                                ? negativeWeightChange
                                : positiveWeightChange
                            }
                            _before={{
                              pos: "absolute",
                              zIndex: -1,
                              top: 0,
                              right: 0,
                              left: 0,
                              bottom: 0,
                              borderWidth: "0px",
                              borderRadius: "6px",
                              borderColor:
                                person.weightChange > 0
                                  ? negativeWeightChange
                                  : positiveWeightChange,
                              opacity: 0.9,
                              content: '""',
                            }}
                            _after={{
                              pos: "absolute",
                              zIndex: 0,
                              top: 0,
                              right: 0,
                              left: 0,
                              bottom: 0,
                              borderWidth: "2px",
                              borderRadius: "6px",
                              borderStyle: "solid",
                              borderColor:
                                person.weightChange > 0
                                  ? negativeWeightChange
                                  : positiveWeightChange,
                              opacity: 0.5,
                              content: '""',
                            }}
                          />
                        )}
                      </Flex>
                    </Stack>

                    {k !== sortedData.length - 1 && k !== 0 && (
                      <Divider
                        borderStyle={"solid"}
                        borderColor={dividerColor}
                        opacity="0.7"
                      />
                    )}
                    {k === sortedData.length - 1 && (
                      <Divider
                        borderStyle={"solid"}
                        // borderWidth="1px"
                        opacity="0.7"
                        // borderBottomWidth="2px"
                        marginTop="4px"
                        borderColor={dividerColor}
                      />
                    )}
                  </ListItem>
                );
              }
            })}
            {sortedData.map((person, k) => {
              if (!person.weightChange) {
                return (
                  <ListItem
                    m="0"
                    py="0"
                    key={person.personId}
                    mx={["0", 0]}
                    opacity={0.5}
                    px="0"
                  >
                    <Stack
                      isInline
                      align="center"
                      spacing="0"
                      pt="2"
                      pb="2"
                      justifyContent="space-between"
                    >
                      <NextChakraLink
                        fontWeight="600"
                        fontSize="md"
                        mr="0"
                        fontFamily={"inter"}
                        paddingY="4px"
                        color={nameColor}
                        href={`/people/${person.name}`}
                      >
                        {person.name}
                      </NextChakraLink>
                      <Flex>
                        <Box
                          fontSize="sm"
                          textTransform="uppercase"
                          fontFamily="mono"
                          //   opacity="0.5"
                          width="5.5em"
                          textAlign={"center"}
                          paddingX="3"
                          py="2px"
                          position={"relative"}
                          _after={{
                            pos: "absolute",
                            zIndex: -1,
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                            borderWidth: "2px",
                            borderRadius: "6px",
                            borderStyle: "solid",
                            borderColor: "gray.300",
                            opacity: 1,
                            content: '""',
                          }}
                        >
                          N/A
                        </Box>
                      </Flex>
                    </Stack>

                    {k !== sortedData.length - 1 && (
                      <Divider
                        borderStyle={"solid"}
                        opacity={1}
                        borderColor={dividerColor}
                      />
                    )}
                  </ListItem>
                );
              }
            })}
            <Divider
              borderStyle={"solid"}
              // borderWidth="1px"
              opacity="0"
              borderBottomWidth="2px"
              marginTop="4px"
              borderColor={topAndBottomDivider}
            />
          </List>
          {/* <Divider borderWidth="1px" /> */}
        </Grid>
      </Grid>
    </Layout>
  );
};

const DateRangeSelector = () => {
  const dateRanges = [
    { label: "3 Months", value: "90" },
    { label: "6 Months", value: "180" },
    { label: "18 Months", value: "365" },
    { label: "All", value: "0" },
  ];

  const [currentSelection, setCurrentSelection] = useState(dateRanges[0]);

  console.log(currentSelection);

  return (
    <Menu placement="bottom-end" matchWidth gutter={2}>
      <MenuButton
        size="sm"
        as={Button}
        rightIcon={
          <Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Icon>
        }
      >
        Range
        {/* {currentSelection.label} */}
      </MenuButton>
      <MenuList pt="0.5" pb="0" minWidth="100px" fontFamily="DM Sans">
        <MenuOptionGroup
          type="radio"
          title="Select Range"
          defaultValue={dateRanges[0].label}
        >
          <MenuDivider />
          {dateRanges.map((dateRange, k) => {
            return (
              <MenuItemOption
                key={dateRange.value}
                value={dateRange.value}
                onClick={() => setCurrentSelection(dateRanges[k])}
              >
                {dateRange.label}
              </MenuItemOption>
            );
          })}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default HighScoresPage;
