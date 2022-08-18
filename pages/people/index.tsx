import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Person } from "../../interfaces";
import {
  Heading,
  Flex,
  Grid,
  List,
  ListItem,
  VStack,
  Divider,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Layout } from "../../components/Layout";
import { GraphLink, WeightTag } from "components";
import { NextChakraLink } from "../../components/NextChakraLink";

export const getServerSideProps: GetServerSideProps = async () => {
  let baseURL = null;

  // GOD, this sucked
  // Below is tested in every case EXCEPT for actual deploying to production...
  if (process.env.NODE_ENV === "development") {
    // local dev
    baseURL = "http://localhost:3000";
  } else if (process.env.VERCEL_URL === "weightandsee.xyz") {
    // deployed to production
    baseURL = "https://weightandsee.xyz";
  } else if (
    process.env.VERCEL_URL === "" &&
    process.env.NODE_ENV === "production"
  ) {
    // locally running in production mode
    baseURL = "http://localhost:4000";
  } else {
    // deployed to preview branch
    baseURL = `https://${process.env.VERCEL_URL}`;
  }

  // just in case we fall through
  if (baseURL === "") {
    baseURL = "https://dev.weightandsee.xyz";
  }

  console.log(`${baseURL}/api/people`);

  const result = await fetch(`${baseURL}/api/people`);
  const people = await result.json();
  console.log(people.filter((person: Person) => person.id === 9));
  return {
    props: { data: people },
  };
};

export const PeoplePage: React.FunctionComponent<{ data: string }> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const peopleList: Person[] = data;
  const nameColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`} mt="4">
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <VStack isInline mb="3">
            <Heading size="lg" letterSpacing="-1px" fontWeight="700">
              People
            </Heading>
          </VStack>

          <List spacing={0} mt={0}>
            <Divider borderWidth="1.5px" mt={1} />
            {peopleList.map((person, k) => {
              return (
                <ListItem m="0" p="0" key={person.id}>
                  <Stack
                    isInline
                    align="center"
                    spacing="0"
                    justifyContent="space-between"
                  >
                    <NextChakraLink
                      fontWeight="600"
                      fontSize="2xl"
                      mr="0 "
                      color={nameColor}
                      href={`/people/${person.name}`}
                    >
                      {person.name}
                    </NextChakraLink>
                    <Flex>
                      <GraphLink linkURL={`/graphs/${person.name}`} />
                      {person.currentWeight !== undefined &&
                        person.currentWeight &&
                        person.weighIns && (
                          <WeightTag
                            weight={parseFloat(person.currentWeight)}
                            weighInId={person.weighIns[0].id}
                          />
                        )}
                    </Flex>
                  </Stack>
                  {k !== peopleList.length - 1 && <Divider />}
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

export default PeoplePage;
