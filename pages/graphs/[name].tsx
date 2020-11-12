/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from "next";
import db from "prisma";

import { Heading, Grid } from "@chakra-ui/core";
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

import { Layout } from "components";
import { Person } from "interfaces";

const prisma = db.getInstance().prisma;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await prisma.person.findOne({
    where: { name: params?.name as string },
    include: { weighIns: { orderBy: { weighDate: "asc" } } },
  });

  console.log(result);

  return {
    props: { data: JSON.stringify(result) },
  };
};

const CustomLabel = (props: any) => {
  const { x, y, payload }: any = props;

  console.log(props);

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={15}
        textAnchor="start"
        fill="#666"
        transform="rotate(35)"
      >
        {payload.value.split("T")[0].split(/-(.+)/)[1]}
      </text>
    </g>
  );
};

const TestGraph = ({ data }: any) => {
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
        <XAxis
          dataKey="weighDate"
          tick={<CustomLabel />}
          height={60}
          tickCount={4}
          interval={0}
        />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#8884d8"
          // activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const DemoPage: React.FunctionComponent<{ data: string }> = ({ data }) => {
  console.log(data);

  const graphData: Person = JSON.parse(data);

  console.log(graphData);

  return (
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
            Data Visualization: {graphData.name}
          </Heading>
        </Grid>
        <TestGraph data={graphData.weighIns} />
      </Grid>
    </Layout>
  );
};

export default DemoPage;
