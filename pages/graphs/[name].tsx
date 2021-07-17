/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";

import { Heading, Grid, useColorModeValue } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

// import { getSession } from "next-auth/client";
import { ensureAuthenticated } from "lib/guards/ensureAuthenticated";

import { Layout } from "components";
import { User } from "interfaces";

export const getServerSideProps: GetServerSideProps = async (context) => {
  await ensureAuthenticated(context);
  // const session = await getSession(context);

  const result = await prisma.user.findFirst({
    where: {
      name: {
        equals: context.params?.name as string,
        mode: "insensitive",
      },
    },
    include: { weighIns: { orderBy: { weighDate: "asc" } } },
  });

  // console.log(result);

  return {
    props: { data: JSON.stringify(result) },
  };
};

const CustomLabel = (props: any) => {
  const { x, y, payload }: any = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={15}
        textAnchor="start"
        fill="#666"
        transform="rotate(55)"
      >
        {payload.value.split("T")[0].split(/-(.+)/)[1]}
      </text>
    </g>
  );
};

const TestGraph = ({ data }: any) => {
  console.log(data);

  // const yBounds = data[0].weight;

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
        <defs>
          <linearGradient
            id="blue-gradient"
            x1="-25%"
            y1="100%"
            x2="0%"
            y2="-50%"
          >
            <stop stopColor="#6dd5ed" offset="0%" />
            <stop stopColor="#2193b0" offset="100%" />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="2 2"
          stroke={useColorModeValue("#ccc", "#555")}
        />
        <XAxis
          tickLine={true}
          dataKey="weighDate"
          tick={<CustomLabel />}
          height={60}
          tickCount={4}
          interval={0}
        />
        <YAxis
          //domain={[yBounds - 30, yBounds + 30]}
          domain={["auto", "auto"]}
        />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Brush
          // fill={useColorModeValue("#ccc", "#999")}
          // fill="hsl(270, 66.94214876033058%, 47.45098039215686%)"
          fill="url(#blue-gradient)"
          dataKey="name"
          height={25}
          // travellerWidth={10}
          y={500 - 40}
          // stroke="#8884d8"
          stroke={useColorModeValue("#333", "#eee")}
        />
        <Line
          connectNulls={true}
          type="monotone"
          dataKey="weight"
          stroke="#8884d8"
          // activeDot={{ r: 1 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const DemoPage: React.FunctionComponent<{ data: string }> = ({ data }) => {
  const graphData: User = JSON.parse(data);

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
