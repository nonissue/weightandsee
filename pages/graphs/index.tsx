// import { GetServerSideProps } from "next";
// import db from "../../prisma/db";

import { Heading, Grid } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Layout } from "../../components/Layout";

// const prisma = db.getInstance().prisma;

const data = [
  {
    name: "Nov 6",
    uv: 400,
    pv: 240,
    amt: 240,
  },
  {
    name: "Nov 13",
    uv: 300,
    pv: 138,
    amt: 220,
  },
  {
    name: "Nov 20",
    uv: 200,
    pv: 500,
    amt: 229,
  },
  {
    name: "Nov 27",
    uv: 278,
    pv: 390,
    amt: 200,
  },
  {
    name: "Dec 4",
    uv: 189,
    pv: 480,
    amt: 218,
  },
  {
    name: "Dec 11",
    uv: 239,
    pv: 380,
    amt: 250,
  },
  {
    name: "Dec 18",
    uv: 349,
    pv: 430,
    amt: 210,
  },
];

// export const getServerSideProps: GetServerSideProps = async () => {
//   const result = await prisma.person.findUnique({
//     where: { name: params?.name as string },
//     include: { weighIns: { orderBy: { weighDate: "desc" } } },
//   });

//   return {
//     props: { test: JSON.stringify(result) },
//   };
// };

const TestGraph = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 25,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={75} textAnchor="start" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        <Line type="monotone" dataKey="amt" stroke="#ff0000" />
      </LineChart>
    </ResponsiveContainer>
  );
};

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
      <TestGraph />
    </Grid>
  </Layout>
);

export default DemoPage;
