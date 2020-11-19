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
} from "@chakra-ui/core";
import { Layout, WeightTag, NextChakraLink } from "components";
import { ensureAuthenticated } from "lib/guards/ensureAuthenticated";
import { PersonPageProps } from "interfaces";

import db from "prisma";
const prisma = db.getInstance().prisma;

export const getServerSideProps: GetServerSideProps = async (context) => {
  await ensureAuthenticated(context);

  const result = await prisma.person.findOne({
    where: { name: context.params?.name as string },
    include: { weighIns: { orderBy: { weighDate: "desc" } } },
  });

  return {
    props: { data: JSON.stringify(result) },
  };
};

export const PersonPage: React.FunctionComponent<{ data: string }> = ({
  data,
}) => {
  let personData: PersonPageProps;

  try {
    personData = JSON.parse(data);
    if (personData.weighIns && personData.weighIns.length === 0) {
      throw new DOMException(
        "Error retrieving person's weigh-ins!",
        "NotFoundError"
      );
    }
  } catch (error) {
    return (
      <Layout>
        <Grid maxW="min(65ch, 100%)" mx="auto" mt="8" px={["4", "4", "2", "2"]}>
          <Heading mb="2">Error {error.name}</Heading>
          <Heading size="sm">{error.message}</Heading>
        </Grid>
      </Layout>
    );
  }
  // if (!data || !data["weighIns" as string]) {
  //   r
  //   );
  // }

  // const personData: PersonPageProps = JSON.parse(data);

  const weightColor = useColorModeValue("gray.700", "gray.300");
  const weightShadow = useColorModeValue(
    `2px 2px 1px hsla(0,0%,50%,0)`,
    `2px 2px 0px hsla(0,0%,70%,0.2)`
  );
  const headerColor = useColorModeValue("pink.400", "pink.200");

  if (!personData) {
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
            mb="2"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Heading
                size="xl"
                fontWeight="725"
                color={headerColor}
                mb="0"
                style={{
                  fontVariationSettings: `'MONO' 0, 'CRSV' 0.5, 'CASL' 0, 'slnt' 0`,
                }}
              >
                {personData.name}
              </Heading>
            </Box>
            {personData.currentWeight && (
              <Box display="flex" alignItems="center">
                <Box
                  align="center"
                  mr="2"
                  fontWeight="500"
                  textColor="gray.500"
                  textTransform="uppercase"
                  fontSize="sm"
                  letterSpacing="0.05em"
                >
                  Current:
                </Box>
                <WeightTag weight={personData.currentWeight} />
              </Box>
            )}
          </Flex>

          <Divider />
          <List w={["100%", "100%", "100%", "100%"]} mx="auto">
            {personData.weighIns &&
              personData.weighIns?.map((weighIn, k) => {
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
                        <NextChakraLink href={`/weights/${weighIn.id}`}>
                          {weighIn.weighDate.split("T")[0]}
                        </NextChakraLink>
                      </Box>
                      <Box
                        fontSize="2xl"
                        fontFamily="mono"
                        fontWeight="500"
                        color={weightColor}
                        display="inline-flex"
                        textShadow={weightShadow}
                      >
                        <Box>{weighIn.weight.toFixed(1)}</Box>
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
                    </Stack>
                    {personData.weighIns &&
                      k !== personData.weighIns.length - 1 && <Divider />}
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
