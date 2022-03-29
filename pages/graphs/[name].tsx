import { useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import {
  Box,
  Grid,
  Heading,
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

// type LabelProps = {
//   payload: any;
//   label: any;
//   content: any;
// };

const CustomTooltip = ({ payload, label, content }: any) => {
  console.log(payload);
  console.log(label);
  console.log(content);

  const labelBgColor = useColorModeValue("purple.700", "purple.100");
  const labelTextColor = useColorModeValue("purple.50", "purple.900");

  if (!label || !payload[0]) {
    return (
      <Box
        background={labelBgColor}
        color={labelTextColor}
        borderRadius="6"
        opacity="0.95"
        w="100px  "
        shadow="sm"
        className="custom-tooltip"
        p="2"
      >
        Loading...
      </Box>
    );
  }

  return (
    <Box
      background={labelBgColor}
      color={labelTextColor}
      borderRadius="6"
      opacity="0.9"
      w=""
      minWidth="120px"
      shadow="md"
      className="custom-tooltip"
      // textAlign="center"
      // p="1"
      py="2"
      px="3"
    >
      <Box fontFamily="mono" fontSize="sm">
        {label.split("T")[0].slice(2)}
      </Box>
      <Box fontFamily="" fontSize="2xl" fontWeight="700">
        {parseInt(payload[0]?.value).toFixed(2)}
        <Box
          display="inline"
          // fontFamily="sans-serif"
          // pl="0.5"
          fontWeight={300}
          pl="2px"
          opacity="0.9"
          fontSize="0.9em"
        >
          lbs
        </Box>
      </Box>
    </Box>
  );
};

const CustomTickLabel = (props: any) => {
  const { x, y, payload }: any = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={2}
        y={-10}
        dy={15}
        textAnchor="start"
        fill={useColorModeValue("#333", "#ccc")}
        transform="rotate(90)"
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: "0.8em",
        }}
      >
        {/* {payload.value.split("T")[0].split(/-(.+)/)[1]} */}
        {payload.value.split("T")[0].slice(2)}
      </text>
    </g>
  );
};

const CustomYAxisLabel = (props: any) => {
  const { x, y, payload }: any = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-24}
        y={5}
        dy={0}
        textAnchor="start"
        fill={useColorModeValue("#333", "#ccc")}
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: "0.8em",
          fontWeight: 700,
        }}
      >
        {payload.value}
      </text>
      <text
        y={"0.3em"}
        fill={useColorModeValue("#333", "#ccc")}
        style={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: "0.7em",
          fontWeight: 500,
          opacity: 0,
        }}
      >
        lbs
      </text>
    </g>
  );
};

const UserGraph = ({ data, uiState }: any) => {
  // console.log(data);

  return (
    <>
      <ResponsiveContainer
        width="100%"
        // height={`${uiState.showBrush ? "520" : "550"}px`}
        height={uiState.showBrush ? 500 : 550}
      >
        <LineChart
          data={data}
          margin={{
            top: 25,
            right: 15,
            left: 0,
            bottom: 25,
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            stroke={useColorModeValue("#ccc", "#555")}
          />
          <XAxis
            tickLine={true}
            dataKey="weighDate"
            tick={<CustomTickLabel />}
            height={60}
            tickCount={4}
            interval={4}
          ></XAxis>
          <YAxis
            domain={["auto", "auto"]}
            tickCount={10}
            width={50}
            tick={<CustomYAxisLabel />}
          ></YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />

          {uiState.showBrush ? (
            <Brush
              dataKey="name"
              height={20}
              travellerWidth={30}
              y={480}
              fill={"#ccc"}
              stroke="rgba(0,0,0,0.5)"
            />
          ) : (
            ""
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
  const [uiState, setUiState] = useState({ showBrush: false });

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
        <Grid px={["4", "4", "2", "2"]} textAlign="center">
          <Heading mt="4" size="lg">
            Weigh-Ins: {graphData.name}
          </Heading>
          {/* <Flex display="flex" mt="4" alignItems="start"> */}
          {/* <Spacer /> */}
          {2 + 2 < 1 && (
            <Switch
              mt="4"
              onChange={() =>
                setUiState({ ...uiState, showBrush: !uiState.showBrush })
              }
              size="sm"
            >
              Adjust Dates
            </Switch>
          )}
          {/* </Flex> */}
        </Grid>
        <UserGraph data={graphData.weighIns} uiState={uiState} />
      </Grid>
    </Layout>
  );
};

export default DemoPage;
