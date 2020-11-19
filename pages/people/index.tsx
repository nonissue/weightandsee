import {
  Divider,
  Grid,
  Heading,
  List,
  ListItem,
  Stack,
  useColorModeValue,
} from "@chakra-ui/core";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ensureAuthenticated } from "lib/guards/ensureAuthenticated";
import { Layout, NextChakraLink, WeightTag } from "../../components";
import { Person } from "../../interfaces";

export const getServerSideProps: GetServerSideProps = async (context) => {
  await ensureAuthenticated(context);

  /*
  VERCEL_URL can be: 
  ""
  weightandsee.xyz
  deploy-url.weightandsee.xyz
  null?
  */
  let baseURL = null;

  // console.log(process.env);

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

  // console.log(`${baseURL}/api/people`);

  const result = await fetch(`${baseURL}/api/people`);
  const people = await result.json();

  return {
    props: { data: people },
  };
};

export const PeoplePage: React.FunctionComponent<{ data: string }> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const peopleList: Person[] = data;
  const nameColor = useColorModeValue("black", "gray.300");
  const headerColor = useColorModeValue("pink.400", "pink.200");

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`} mt="6">
        <Grid column="2" px={["4", "4", "2", "2"]}>
          <Stack>
            <Heading
              size="xl"
              fontWeight="725"
              color={headerColor}
              mb="2"
              style={{
                fontVariationSettings: `'MONO' 0, 'CRSV' 1, 'CASL' 0.15, 'slnt' 0`,
              }}
            >
              Participants
            </Heading>
          </Stack>

          <List spacing={1} mt={2}>
            {/* <Divider borderWidth="1.5px" mt={1} /> */}
            {peopleList.map((person, k) => {
              return (
                <ListItem m="0" pb="0" key={person.id}>
                  <Stack
                    isInline
                    align="center"
                    spacing="0"
                    mb="1"
                    justifyContent="space-between"
                  >
                    <NextChakraLink
                      fontWeight="400"
                      fontSize={["lg", "xl"]}
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

                    {!person.currentWeight && (
                      // eslint-disable-next-line no-octal
                      <WeightTag weight={0} />
                    )}
                  </Stack>
                  {k !== peopleList.length - 1 && <Divider pb="0" />}
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default PeoplePage;
