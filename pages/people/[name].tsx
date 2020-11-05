import { GetServerSideProps } from "next";

import {
  Heading,
  Grid,
  List,
  ListItem,
  Text,
  VStack,
  Link,
  Divider,
  useColorModeValue,
} from "@chakra-ui/core";
import { Layout } from "../../components/Layout";
import { Person } from "../../interfaces";

import db from "../../prisma/db";
const prisma = db.getInstance().prisma;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await prisma.person.findOne({
    where: { name: params?.name as string },
    include: { weighIns: true },
  });

  return {
    props: { test: JSON.stringify(result) },
  };
};

export const PersonPage: React.FunctionComponent<{ test: string }> = ({
  test,
}) => {
  const data: Person = JSON.parse(test);

  const weightColor = useColorModeValue("gray.700", "gray.300");

  if (!data) {
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
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <VStack isInline mb="4">
            <Heading
              size="xl"
              fontFamily="DM Serif"
              fontWeight="800"
              letterSpacing="1px"
            >
              {data.name}
            </Heading>

            <Text fontFamily="DM Sans" fontSize="md" color={weightColor}>
              ({data.nickName})
            </Text>
          </VStack>

          <Divider />
          <List>
            {data.weighIns &&
              data.weighIns?.map((weighIn) => {
                return (
                  <ListItem key={weighIn.id}>
                    <VStack isInline spacing={0} align="center">
                      <Text
                        fontSize="3xl"
                        fontFamily="DM Mono"
                        fontWeight="600"
                        color={weightColor}
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
