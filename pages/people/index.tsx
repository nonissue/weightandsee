import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { Person } from "../../interfaces";
import {
  Heading,
  Grid,
  List,
  ListItem,
  Text,
  VStack,
  Divider,
  Stack,
  useColorModeValue
} from "@chakra-ui/core";
import { Layout } from "../../components/Layout";
import { NextChakraLink } from "../../components/NextChakraLink";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await prisma.person.findMany({
    // where: { name: params?.name as string },
    include: { weighIns: true }
  });

  console.log(result);

  return {
    props: { data: JSON.stringify(result) }
  };
};

export const PeoplePage: React.FunctionComponent<{ data: string }> = ({
  data
}) => {
  const peopleList: Person[] = JSON.parse(data);
  const weightColor = useColorModeValue("gray.700", "gray.300");
  const weightBGColor = useColorModeValue("gray.200", "gray.700");
  const weightBorderColor = useColorModeValue("gray.300", "gray.600");
  const lbsColor = useColorModeValue("gray.500", "gray.500");

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <VStack isInline mb="3">
            <Heading
              size="xl"
              // fontFamily=""
              // textTransform="uppercase"
              letterSpacing="-1px"
              fontWeight="700"
              // letterSpacing="1px"
            >
              People
            </Heading>
          </VStack>

          {/* <Heading size="md" mb={2} px={["4", "4", "2", "2"]}>
            Results
          </Heading> */}
          <Divider borderWidth="1px" />
          <List mt={0}>
            {peopleList.map(person => {
              return (
                <ListItem pl="0" fontFamily="" key={person.id}>
                  <Stack isInline align="center" spacing="0">
                    <NextChakraLink
                      fontWeight="500"
                      // letterSpacing="-0.5px"
                      fontSize="2xl"
                      mr="2"
                      // fontStyle="italic"
                      color={weightColor}
                      href={`/people/${person.name}`}
                    >
                      {person.name}
                    </NextChakraLink>
                    <Stack
                      isInline
                      spacing="0"
                      borderBottom="1px"
                      px="1"
                      align="center"
                      borderRadius="4px"
                      background={weightBGColor}
                      fontSize="xs"
                      borderBottomColor={weightBorderColor}
                    >
                      <Text
                        fontSize="xs"
                        // background={weightBorderColor}

                        fontWeight="400"
                        px={0}
                        fontFamily="mono"
                        color={weightColor}
                      >
                        180
                      </Text>
                      <Text fontWeight="400" color={lbsColor}>
                        &nbsp;lbs
                      </Text>
                    </Stack>
                  </Stack>
                  <Divider borderWidth="0.5px" />
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
