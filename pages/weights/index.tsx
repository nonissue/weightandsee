// Oh man, Chakra isRequired is way better than relying on form errors
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { ensureAuthenticated } from "lib/guards/ensureAuthenticated";
// import { isAuth } from "lib/helpers/auth";
import { Grid, Heading, Divider, Text, Stack, Box } from "@chakra-ui/react";
import { Layout, NextChakraLink, WeightTag } from "../../components";
import { WeighInsWithUser, Session } from "../../interfaces";

import db from "prisma";
const prisma = db.getInstance().prisma;

export const getServerSideProps: GetServerSideProps = async (context) => {
  await ensureAuthenticated(context);
  const session = await getSession(context);

  // const session = await isAuth(context);

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
          // person: {
          //   select: { name: true },
          // },
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
      parsedData = await data?.map((item) => {
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

  return {
    props: { weighIns: parsedData, session },
  };
};

const WeightsPage: React.FunctionComponent<
  WeighInsWithUser & { session: Session }
> = ({ weighIns, session }) => {
  let lastDate: Date;

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

  console.log(session);

  if (weighIns.length === 0) {
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

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`} mt="4">
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <Heading mb="3" size="lg" letterSpacing="-1px" fontWeight="700">
            Weigh Ins
          </Heading>
          <Stack mt="1" spacing={1}>
            {weighIns.map((weighIn) => {
              const showDate = weighIn.weighDate === lastDate ? false : true;
              lastDate = weighIn.weighDate;

              return (
                <Stack spacing={0} key={weighIn.id}>
                  {showDate && (
                    <>
                      <Divider borderWidth="0px" mt={1} />
                      <Text
                        fontSize="md"
                        fontFamily="mono"
                        fontWeight="400"
                        textColor="gray.400"
                      >
                        {weighIn.weighDate}
                      </Text>
                      <Divider borderWidth="0.5px" mb="1" />
                    </>
                  )}
                  <Stack
                    isInline
                    spacing={0}
                    align="center"
                    justifyContent="space-between"
                  >
                    <NextChakraLink
                      href={`people/${weighIn.user.name}`}
                      mr="1"
                      fontWeight="400"
                      fontSize="xl"
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
