import { useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import {
  Flex,
  Grid,
  Heading,
  Spacer,
  Switch,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Layout } from "components";
import { UserWithWeighIns } from "interfaces";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await prisma.person.findFirst({
    where: {
      name: {
        equals: params?.name as string,
      },
    },
    include: { weighIns: { orderBy: { weighDate: "asc" } } },
  });

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
        y={-10}
        dy={15}
        textAnchor="start"
        fill="#777"
        transform="rotate(80)"
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: "0.8em",
        }}
      >
        {payload.value.split("T")[0].split(/-(.+)/)[1]}
      </text>
    </g>
  );
};

const UserGraph = ({ data }: any) => {
  const [uiState, setUiState] = useState({ showBrush: false });
  // const brushGradient = useColorModeValue(
  //   "url(#blue-gradient-light)",
  //   "url(#pink-gradient"
  // );
  // const brushStroke = useColorModeValue("#666", "rgb(163, 35, 140)");
  console.log(data);

  return (
    <>
      <Flex display="flex" alignItems="end">
        <Spacer />
        <Switch
          onChange={() =>
            setUiState({ ...uiState, showBrush: !uiState.showBrush })
          }
          size="sm"
        >
          Zoom
        </Switch>
      </Flex>
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
          <defs>
            <linearGradient
              id="blue-gradient-light"
              x1="-25%"
              y1="100%"
              x2="0%"
              y2="-50%"
            >
              <stop stopColor="#26454e" offset="0%" />
              <stop stopColor="#1ec1f1" offset="90%" />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient
              id="pink-gradient"
              x1="-25%"
              y1="100%"
              x2="0%"
              y2="-50%"
            >
              <stop stopColor="rgb(251, 182, 206)" offset="0%" />
              <stop stopColor="rgb(213, 63, 140)" offset="100%" />
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
            interval={4}
          />
          <YAxis
            //domain={[yBounds - 30, yBounds + 30]}
            domain={["auto", "auto"]}
          />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />

          {uiState.showBrush && (
            <Brush
              // fill={useColorModeValue("#ccc", "#999")}
              // fill="hsl(270, 66.94214876033058%, 47.45098039215686%)"
              // fill="url(#blue-gradient)"
              // fill={brushGradient}
              dataKey="name"
              height={30}
              travellerWidth={30}
              y={500 - 40}
              // style={{ color: "rgb(129, 101, 125)" }}
              // stroke="#8884d8"
              // stroke={brushStroke}
            />
          )}
          <Line
            connectNulls={true}
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            // activeDot={{ r: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

const DemoPage: React.FunctionComponent<{ data: string }> = ({ data }) => {
  const graphData: UserWithWeighIns = JSON.parse(data);

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
            Weigh-Ins: {graphData.name}
          </Heading>
        </Grid>
        <UserGraph data={graphData.weighIns} />
      </Grid>
    </Layout>
  );
};

export default DemoPage;
