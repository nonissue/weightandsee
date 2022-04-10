import { Heading, Grid, Box, useColorModeValue, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { Layout } from "../components";

// https://blog.greenroots.info/how-to-create-a-countdown-timer-using-react-hooks
// https://gotofritz.net/blog/countdown-clock-state-machine-requestanimationframe-vanilla-js/
// https://stackoverflow.com/questions/63984376/how-can-i-implement-this-countdown-timer-in-react-with-hooks
// https://github.com/vincentntang/react-timer-request-animation-frame-example/blob/master/src/requestAnimFrame/useRafCounter.js

const Seannaroo: React.FunctionComponent = () => {
  const seannarooDateUTC = new Date(Date.UTC(2022, 8, 15, 19, 0, 0));
  //   const currentDate = new Date(Date.now());

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  let now = new Date().getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      now = new Date().getTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const distance = seannarooDateUTC.getTime() - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeLeft({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
  }, [now, seannarooDateUTC]);

  const borderColor = useColorModeValue("gray.300", "gray.700");

  return (
    <Layout title="Seannaroo | Countdown">
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
          <Box
            mt={["8", "8", "24", "24"]}
            textAlign={"center"}
            py="2"
            border="2px"
            borderBottom="0"
            borderColor={borderColor}
          >
            <Heading
              fontFamily={"JetBrains Mono"}
              size="2xl"
              fontWeight="800"
              py="2"
            >
              {`${timeLeft.days} days, ${timeLeft.hours
                .toString()
                .padStart(2, "0")}:${timeLeft.minutes
                .toString()
                .padStart(2, "0")}:${timeLeft.seconds
                .toString()
                .padStart(2, "0")}`}
              {/* {Math.ceil(daysUntilDate)} */}
            </Heading>
            <Heading
              size="xl"
              display="inline-block"
              fontFamily="Inter"
              fontWeight="300"
              letterSpacing={"0.1em"}
              textTransform={"uppercase"}
              mb="2"
            >
              before
            </Heading>
          </Box>
          <Box
            w="100%"
            textAlign="center"
            display="none"
            border="2px"
            borderBottom="0"
            borderColor={borderColor}
          >
            <Heading
              fontWeight="500"
              py="1"
              display="inline-block"
              //   bg="blue.300"
              size="xl"
              px="2"
              letterSpacing={"0.05em"}
              fontFamily={"Red Hat Mono"}
              textTransform={"uppercase"}
              lineHeight="1.2"
            >
              Until
            </Heading>
          </Box>
          <Box
            textAlign={"center"}
            border="2px"
            borderBottom="0"
            borderColor={borderColor}
          >
            <Heading
              size="4xl"
              py="10"
              mt="0"
              px="2"
              fontWeight="900"
              display="inline-block"
            >
              Seannaroo
            </Heading>
          </Box>

          <Flex border="2px" borderColor={borderColor} borderBottom="0">
            <Box w="100%" textAlign="center">
              <Heading
                fontWeight="400"
                py="4"
                display="inline-block"
                size="lg"
                px="2"
                letterSpacing={"0.05em"}
                fontFamily={"Red Hat Mono"}
                textTransform={"uppercase"}
                lineHeight="1.2"
              >
                {seannarooDateUTC.toLocaleDateString()}
              </Heading>
            </Box>
            <Box
              w="100%"
              borderLeft="2px"
              borderColor={borderColor}
              textAlign="center"
            >
              <Heading
                fontWeight="400"
                py="4"
                display="inline-block"
                size="lg"
                px="2"
                letterSpacing={"0.05em"}
                fontFamily={"Red Hat Mono"}
                textTransform={"uppercase"}
                lineHeight="1.2"
              >
                {seannarooDateUTC.toLocaleTimeString()}
              </Heading>
            </Box>
          </Flex>
          <Box textAlign={"center"} border="2px" borderColor={borderColor}>
            <Heading
              size="2xl"
              display="inline-block"
              fontFamily="Inter"
              fontWeight="300"
              py="8"
            >
              {'"The Event of the Century"'}
            </Heading>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Seannaroo;
