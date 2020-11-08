import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { Person } from "../../interfaces";
import {
  Heading,
  Grid,
  List,
  ListItem,
  VStack,
  Divider,
  Stack,
  useColorModeValue,
} from "@chakra-ui/core";
import { Layout } from "../../components/Layout";
import { WeightTag } from "../../components/WeightTag";
import { NextChakraLink } from "../../components/NextChakraLink";

export const getServerSideProps: GetServerSideProps = async () => {
  let baseURL = null;

  console.log(process.env);
  // let result;

  if (process.env.NODE_ENV === "development") {
    console.log(process.env.NODE_ENV);
    baseURL = "http://localhost:3000";
  } else if (
    process.env.NODE_ENV === "production" &&
    process.env.VERCEL_URL !== "https://weightandsee.xyz"
  ) {
    baseURL = `https://weightandsee.xyz`;
  } else if (process.env.VERCEL_URL !== "" && process.env.VERCEL_URL) {
    // actually in production
    baseURL = `https://${process.env.VERCEL_URL}`;
  } else {
    // in this case process.env.NODE_ENV == prod
    // but we arent actually deployed
    baseURL = "https://dev.weightandsee.xyz";

    console.log("ERROR");
  }

  console.log(`${baseURL}/api/people`);

  const result = await fetch(`${baseURL}/api/people`);

  const people = await result.json();

  return {
    props: { data: people },
  };
};

export const PeoplePage: React.FunctionComponent<{ data: string }> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const peopleList: Person[] = JSON.parse(data);
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
                      mr="2"
                      color={nameColor}
                      href={`/people/${person.name}`}
                    >
                      {person.name}
                    </NextChakraLink>

                    {person.currentWeight !== undefined &&
                      person.currentWeight && (
                        <WeightTag weight={person.currentWeight} />
                      )}
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
