import { Heading, Text, Grid } from "@chakra-ui/core";

import { Layout } from "../components/Layout";
// import { NextChakraLink } from "../components/NextChakraLink";

const DemoPage: React.FunctionComponent = () => (
  <Layout title="About | nonstarter">
    <Grid
      templateColumns={`1fr min(65ch, 100%) 1fr`}
      sx={{
        "& > *": {
          gridColumn: 2,
        },
      }}
      rowGap={3}
      mt="4"
    >
      <Grid px={["4", "4", "2", "2"]}>
        <Heading mt="4" size="lg">
          Data Visualization
        </Heading>
      </Grid>
      <Text px={["4", "4", "2", "2"]}>Coming soon!</Text>
    </Grid>
  </Layout>
);

export default DemoPage;
