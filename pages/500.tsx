import {
  Heading,
  Text,
  Grid,
  Stack,
  useColorModeValue,
  Icon,
  Flex,
} from "@chakra-ui/react";

import { Layout, NextChakraLink } from "../components";

import { ExclamationCircleIcon } from "@heroicons/react/outline";

const Custom500 = () => {
  const iconColor = useColorModeValue("#f87171", "#fda4af");

  return (
    <Layout title="About | weightandsee">
      <Grid
        templateColumns={`1fr min(65ch, 100%) 1fr`}
        sx={{
          "& > *": {
            gridColumn: 2,
          },
        }}
        rowGap={3}
        mt={16}
      >
        <Grid px={["4", "4", "2", "2"]} textAlign="center">
          <Stack spacing={4}>
            <Flex
              flexDir={"column"}
              justifyContent="left"
              alignItems={"center"}
            >
              {" "}
              <Icon
                as={ExclamationCircleIcon}
                w={10}
                h={10}
                marginRight={2}
                rounded={"full"}
                color={iconColor}
              />
              <Heading
                mt="4"
                mb="0"
                size="3xl"
                sx={{
                  fontVariationSettings: "'slnt' -8, 'wght' 1000, 'MONO' 0.2",
                }}
                textTransform={"uppercase"}
                letterSpacing={"0.01em"}
              >
                Error
              </Heading>
            </Flex>
            <Text fontSize="xl" fontWeight="500">
              Yikes. A Server-side Error Occurred. Sorry.
            </Text>
            <Text fontSize="sm" fontFamily="mono" lineHeight={1.6}>
              Email me{" "}
              <NextChakraLink href="mailto:andy@nonissue.org" color="red.400">
                here
              </NextChakraLink>{" "}
              if this unexpected, unhandled error was a surprise.
            </Text>
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Custom500;
