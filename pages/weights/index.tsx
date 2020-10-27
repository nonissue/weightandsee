// https://spectrum.chat/react-hook-form/help/usefieldarray-append-remove-clearing-form-data~37c65e57-411e-489b-a4dd-2f0df7277954
// https://codesandbox.io/s/react-hook-form-usefieldarray-vy8fv?from-embed
// https://github.com/react-hook-form/react-hook-form/issues/398

// Error handling: https://github.com/react-hook-form/react-hook-form/blob/master/examples/FieldArray.tsx
// https://github.com/react-hook-form/react-hook-form/issues/1617

// https://github.com/react-hook-form/react-hook-form/issues/978 -> Original solution

// (PRETTY CLEAN TBH) simple form with add / remove https://codesandbox.io/s/6j1760jkjk
// Proper json stringify: https://codesandbox.io/s/react-hook-form-v6-controller-append-prepepend-insert-7clz7?file=/src/index.js

// Datepicker: https://codesandbox.io/s/react-hook-form-controller-079xx?file=/src/index.js

// Oh man, Chakra isRequired is way better than relying on form errors
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { Grid, Heading, Box } from "@chakra-ui/core";

import { Layout } from "../../components/Layout";
import { WeighIns } from "../../interfaces";

const prisma = new PrismaClient();
// When form submitted, verify that no entries duplicated

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.weighIn.findMany({
    // select: { name: true, nickName: true },
    select: {
      id: true,
      // weighDate: true,
      weight: true,
      person: {
        select: { name: true }
      }
    },
    // include: { person: { select: { name: true } } },
    // sort by weightdate
    orderBy: { createdAt: "desc" }
  });

  // const parsedData = data.map((entry) => {
  //   return {
  //     weighDate:
  //   }
  // }

  // if we return date, we have to stringify the data, and then type the props as string
  // which sucks
  //
  // we could verify the result from prisma is the right type
  // stringify it, parse it on the other end, and check the data parsing result is correct type
  // Or:
  // - We can change schema for db to use just string for the weighDate, and change form to submit a string
  // - We can parse the response from prisma and convert all date objects to strings
  return {
    props: { weighIns: data }
  };
};

const WeightsPage: React.FunctionComponent<WeighIns> = ({ weighIns }) => {
  console.log(weighIns);

  // const parsedData: WeighIns = JSON.parse(weighIns);

  return (
    <Layout>
      <Grid templateColumns={`1fr min(65ch, 100%) 1fr`}>
        <Grid column="2" my="4" px={["4", "4", "2", "2"]}>
          <Heading>Entries</Heading>
          <Box mt="2">
            {weighIns.map(weighIn => {
              return (
                <div key={weighIn.id}>
                  {weighIn.person.name} - {weighIn.weight}lbs - Date Goes Here
                </div>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default WeightsPage;
