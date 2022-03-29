import { GetServerSideProps } from "next";

import {
  Heading,
  Grid,
  List,
  ListItem,
  Text,
  Stack,
  Link,
  Divider,
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { Layout, NextChakraLink, WeightTag } from "../../components";
import { PersonPageProps } from "../../interfaces";

import db from "../../prisma/db";
const prisma = db.getInstance().prisma;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await prisma.person.findFirst({
    where: { name: params?.name as string },
    include: { weighIns: { orderBy: { weighDate: "desc" } } },
  });

  return {
    props: { personPageData: JSON.stringify(result) },
  };
};

export const PersonPage: React.FunctionComponent<{
  personPageData: string;
}> = ({ personPageData }) => {
  const data: PersonPageProps = JSON.parse(personPageData);

  const weightColor = useColorModeValue("gray.700", "gray.300");
  const weightShadow = useColorModeValue(
    `2px 2px 1px hsla(0,0%,50%,0)`,
    `2px 2px 0px hsla(0,0%,70%,0.2)`
  );
  const graphsLink = useColorModeValue("pink.600", "pink.300");
  const graphsLinkBg = useColorModeValue("gray.200", "gray.600");

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
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`} mt="4">
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <Flex
            mb="4"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading
                size="lg"
                fontFamily="heading"
                fontWeight="800"
                display="block"
                pr="2"
                letterSpacing="1px"
              >
                {data.name}
              </Heading>
              {data.weighIns?.length !== 0 && (
                <Box
                  mt={["0", "0"]}
                  py="1"
                  px="2"
                  flexShrink={1}
                  borderRadius="md"
                  fontWeight="700"
                  textTransform="uppercase"
                  fontSize="xs"
                  letterSpacing="0.05em"
                  display={["flex", "flex"]}
                  alignItems="center"
                  background={graphsLinkBg}
                >
                  <NextChakraLink
                    href={`/graphs/${data.name}`}
                    _hover={{
                      textDecoration: "none",
                      color: graphsLink,
                    }}
                    mr={["0", "0"]}
                    ml={["0", "0"]}
                  >
                    Graphs
                  </NextChakraLink>
                </Box>
              )}
            </Box>
            {data.currentWeight && data.weighIns?.length !== 0 && (
              <Box display="flex" alignItems="center">
                <Box
                  textAlign="center"
                  mr="2"
                  fontWeight="500"
                  textColor="gray.500"
                  textTransform="uppercase"
                  fontSize="sm"
                  letterSpacing="0.05em"
                >
                  Current:
                </Box>

                {data.weighIns && (
                  <WeightTag
                    weight={parseFloat(data.currentWeight)}
                    weighInId={data.weighIns[0].id}
                  />
                )}
              </Box>
            )}
          </Flex>

          <Divider />
          <List w={["100%", "100%", "100%", "100%"]} mx="auto">
            {data.weighIns &&
              data.weighIns?.map((weighIn, k) => {
                return (
                  <ListItem key={weighIn.id}>
                    <Stack
                      isInline
                      spacing={0}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Box
                        display="flex"
                        fontFamily="heading"
                        fontSize="md"
                        textTransform="none"
                        fontWeight="400"
                        color="gray.500"
                        alignItems="center"
                      >
                        {weighIn.weighDate.split("T")[0]}
                      </Box>
                      <NextChakraLink href={`/weights/${weighIn.id}`}>
                        <Box
                          fontSize="2xl"
                          fontFamily="mono"
                          fontWeight="500"
                          color={weightColor}
                          display="inline-flex"
                          textShadow={weightShadow}
                        >
                          <Box>
                            {parseFloat(
                              weighIn.weight as unknown as string
                            ).toFixed(1)}
                          </Box>
                          <Box
                            textColor="gray.500"
                            fontWeight="400"
                            fontSize="lg"
                            my="auto"
                            ml="1"
                            fontFamily="heading"
                          >
                            lbs
                          </Box>
                        </Box>
                      </NextChakraLink>
                    </Stack>
                    {data.weighIns && k !== data.weighIns.length - 1 && (
                      <Divider />
                    )}
                  </ListItem>
                );
              })}
          </List>
          <Divider />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PersonPage;
