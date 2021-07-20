// Oh man, Chakra isRequired is way better than relying on form errors
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { ensureAuthenticated } from "lib/guards/ensureAuthenticated";
import {
  Grid,
  Heading,
  Divider,
  Text,
  Stack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { Layout, NextChakraLink, WeightTag } from "../../components";
import { WeighInsWithUser, Session } from "../../interfaces";

// import { Prisma as Prisma2 } from "@prisma/client";
import prisma from "lib/prisma";

type ModifiedWeighIn = {
  weight: number;
  userId: number;
  id: number;
  weighDate: Date;
  user: {
    name: string;
  };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await ensureAuthenticated(context);
  const session = await getSession(context);

  let data;
  let parsedData = null;

  if (session) {
    try {
      data = await prisma.weighIn.findMany({
        where: {
          user: {
            name: {
              not: undefined,
            },
          },
        },
        select: {
          id: true,
          weighDate: true,
          weight: true,
          user: {
            select: { name: true },
          },
        },
        orderBy: { weighDate: "desc" },
      });
    } catch (e) {
      console.log("Error fetching entries");
      console.log(e);
    }

    try {
      parsedData = await data?.map((item: ModifiedWeighIn) => {
        return {
          ...item,
          weighDate: item.weighDate.toLocaleDateString("en-CA", {
            timeZone: "America/Denver",
          }),
        };
      });
    } catch (e) {
      console.log("Error parsing date");
      console.log(e);
    }
  }

  console.log(parsedData);

  return {
    props: { weighIns: parsedData, session },
  };
};

const WeightsPage: React.FunctionComponent<
  WeighInsWithUser & { session: Session }
> = ({ weighIns, session }) => {
  let lastDate: Date;
  const dateBorderColor = useColorModeValue("gray.400", "gray.600");
  const rowBorderColor = useColorModeValue("gray.300", "gray.700");

  // console.log(typeof weighIns[0].weight);
  // const testdecimal = new Prisma2.Decimal(1.0000001).toString();

  if (!session) {
    return (
      <Layout>
        <Box maxW="min(65ch, 100%)" mx="auto" px={["4", "4", "2", "2"]}>
          <Heading size="md" mt="6" mb="4">
            Unauthorized
          </Heading>
          <Box>You need to be signed in to view this page</Box>
        </Box>
      </Layout>
    );
  }

  if (weighIns.length === 0 || !weighIns) {
    return (
      <Layout>
        <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
          <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
            <Heading mb="4">Weigh-Ins</Heading>
            <Text>No data yet! Click add to start using weightandsee.</Text>
          </Grid>
        </Grid>
      </Layout>
    );
  }

  console.log("rendering");

  // console.log(testdecimal);
  // console.log(typeof testdecimal);

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`} mt="4">
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <Heading
            textAlign="center"
            mb="3"
            size="md"
            letterSpacing="-1px"
            fontWeight="500"
          >
            Weigh Ins
          </Heading>
          <Stack mt="1" spacing={0}>
            {weighIns.map((weighIn) => {
              const showDate = weighIn.weighDate === lastDate ? false : true;
              lastDate = weighIn.weighDate;

              return (
                <Stack
                  spacing={0}
                  key={weighIn.id + weighIn.weighDate.toString()}
                  py="1px"
                  borderBottom="1px"
                  borderStyle="dotted"
                  borderBottomColor={rowBorderColor}
                >
                  {showDate && (
                    <Box marginBottom="0px" marginTop="0px" paddingTop="0px">
                      <Divider borderWidth="0px" marginBottom="0px" mt={0} />
                      <Text
                        fontSize="sm"
                        // background="gray.400"
                        borderBottom="1px"
                        borderStyle="dotted"
                        borderColor={dateBorderColor}
                        fontFamily="mono"
                        letterSpacing="0.1em"
                        p="2px"
                        pl="5px"
                        fontWeight="400"
                        textColor="gray.500"
                      >
                        {weighIn.weighDate}
                      </Text>
                      <Divider
                        borderWidth="0px"
                        variant="dashed"
                        marginBottom="2px"
                      />
                    </Box>
                  )}
                  <Stack
                    isInline
                    spacing={0}
                    align="center"
                    justifyContent="space-between"
                  >
                    <NextChakraLink
                      href={`/people/${weighIn.user.name}`}
                      mr="1"
                      opacity="0.7"
                      pl="5px"
                      fontFamily="body"
                      fontWeight="400"
                      fontSize="lg"
                      lineHeight="1.3"
                      // letterSpacing="-0.1em"
                    >
                      {weighIn.user.name}
                    </NextChakraLink>
                    <NextChakraLink
                      href={`/weights/${weighIn.id}`}
                      _hover={{ textDecoration: "none" }}
                    >
                      <WeightTag weight={weighIn.weight} isLink />
                    </NextChakraLink>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default WeightsPage;
