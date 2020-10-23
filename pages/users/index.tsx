import { GetStaticProps } from "next";
import Link from "next/link";
import { Heading, Grid, Text, Stack, Divider } from "@chakra-ui/core";

import { User } from "../../interfaces";
import { sampleUserData } from "../../utils/sample-data";
import { Layout } from "../../components/Layout";
import List from "../../components/List";

type Props = {
  items: User[];
};

const WithStaticProps: React.FunctionComponent<Props> = ({ items }) => (
  <Layout title="Users">
    <Grid
      p={["4", "4", "6", "6"]}
      // px={0}
      pt={["4", "4", "5", "5"]}
      pb={["4", "4", "5", "5"]}
      // m="auto"
      // my="4"
      templateColumns={`1fr min(65ch, 100%) 1fr`}
      sx={{
        "& > *": {
          gridColumn: 2
        }
      }}
    >
      <Heading size="lg" mb={2}>
        Users List
      </Heading>

      <Grid
        sx={{ "&": { gridColumn: "-1 / 1", width: "100%" } }}
        m={["0", "0", "0", "auto"]}
        padding={0}
        maxW="1600px"
      >
        {/* Example fetching data from inside <code>getStaticProps()</code>. <br />
        THIS IS FULL BLEED. Fullbleed doesn&apos;t work if padding set on parent
        && {">"}0 */}
        <img
          alt="Users Hero"
          src="https://picsum.photos/seed/non/2000/600?grayscale"
        />
      </Grid>

      <Stack spacing={2} mt={4}>
        <Heading size="md">
          Route:&nbsp;
          <Text
            display="inline"
            fontWeight="300"
            fontSize="lg"
            borderBottom="2px"
            borderColor="yellow.400"
            fontStyle="normal"
            fontFamily="mono"
            verticalAlign="baseline"
          >
            /users
          </Text>
        </Heading>
        <List items={items} />
        <Divider />
        <Text fontFamily="mono">
          <Link href="/">
            <a>Home</a>
          </Link>
        </Text>
      </Stack>
    </Grid>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = sampleUserData;
  return { props: { items } };
};

export default WithStaticProps;
