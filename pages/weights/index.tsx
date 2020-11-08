// Oh man, Chakra isRequired is way better than relying on form errors
import { GetServerSideProps } from "next";
// import { PrismaClient } from "@prisma/client";
import { Grid, Heading, Divider, Text, Stack } from "@chakra-ui/core";

import { WeighIns } from "../../interfaces";

import { Layout } from "../../components/Layout";
import { NextChakraLink } from "../../components/NextChakraLink";
import { WeightTag } from "../../components/WeightTag";

import db from "../../prisma/db";
const prisma = db.getInstance().prisma;
// When form submitted, verify that no entries duplicated

export const getServerSideProps: GetServerSideProps = async () => {
  let data;
  try {
    data = await prisma.weighIn.findMany({
      select: {
        id: true,
        weighDate: true,
        weight: true,
        person: {
          select: { name: true },
        },
      },
      orderBy: { weighDate: "desc" },
    });
  } catch (e) {
    console.log("Error fetching entries");
    console.log(e);
  }

  let parsedData = null;
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

  // if we return date, we have to stringify the data, and then type the props as string
  // which sucks
  //
  // we could verify the result from prisma is the right type
  // stringify it, parse it on the other end, and check the data parsing result is correct type
  // Or:
  // - We can change schema for db to use just string for the weighDate, and change form to submit a string
  // - We can parse the response from prisma and convert all date objects to strings
  return {
    props: { weighIns: parsedData },
  };
};

const WeightsPage: React.FunctionComponent<WeighIns> = ({ weighIns }) => {
  let lastDate: Date;

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
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
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
                      <Divider borderWidth="1.5px" mt={1} />
                      <Text
                        fontSize="xl"
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
                      href={`people/${weighIn.person.name}`}
                      mr="1"
                      fontWeight="500"
                      fontSize="xl"
                    >
                      {weighIn.person.name}
                    </NextChakraLink>
                    <WeightTag weight={weighIn.weight} />
                  </Stack>
                </Stack>
              );
            })}
            <Divider borderWidth="1px" />
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default WeightsPage;
