import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";

import {
  Heading,
  Grid,
  List,
  ListItem,
  Text,
  VStack,
  Divider
} from "@chakra-ui/core";
import { Layout } from "../../components/Layout";

// import { Heading, Divider, Box, List} from

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();

  const result = await prisma.person.findOne({
    where: { name: params?.name as string },
    include: { weighIns: true }
  });

  console.log(result);

  return {
    props: { test: JSON.stringify(result) }
  };
};

export const PersonPage: React.FunctionComponent = ({ test }: any) => {
  const data = JSON.parse(test);

  console.log(data);

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <Heading size="lg" mb="4" px={["4", "4", "2", "2"]}>
            {data.name} ({data.nickName})
          </Heading>

          <Heading size="md" mb={2} px={["4", "4", "2", "2"]}>
            Results
          </Heading>
          <Divider />
          <List px={["4", "4", "2", "2"]}>
            {data.weighIns.map((weighIn: any) => {
              return (
                <ListItem key={weighIn.id}>
                  <VStack isInline spacing={0}>
                    {/* <Text fontSize="4xl" fontWeight="400" color="gray.500">
                      —
                    </Text> */}
                    <Text
                      fontSize="4xl"
                      // textShadow="lg"

                      fontFamily="DM Mono"
                      fontWeight="600"
                    >
                      {weighIn.weight}
                    </Text>
                    <Text
                      fontFamily="DM Sans"
                      fontSize="lg"
                      pl="0"
                      textTransform="none"
                      fontWeight="400"
                      fontStyle="italic"
                      color="gray.500"
                    >
                      &nbsp;lbs
                    </Text>
                  </VStack>
                  <Divider />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PersonPage;
