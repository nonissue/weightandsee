import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { PrismaClient } from "@prisma/client";
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

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await prisma.person.findMany({
    orderBy: { name: "asc" },
    // where: { name: params?.name as string },
    include: { weighIns: true },
  });

  console.log(result);

  return {
    props: { data: JSON.stringify(result) },
  };
};

export const PeoplePage: React.FunctionComponent<{ data: string }> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const peopleList: Person[] = JSON.parse(data);
  console.log(peopleList);
  const nameColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <VStack isInline mb="3">
            {/* <Heading size="xl" letterSpacing="-1px" fontWeight="700"> */}
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
                        <WeightTag weight={String(person.currentWeight)} />
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
