import { useState } from "react";
import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/core";
import { Nav, NavItems, NextChakraLink } from ".";

import Head from "next/head";

export const Header: React.FunctionComponent = () => {
  const headerColor = useColorModeValue("pink.400", "pink.300");
  // const headerBg = useColorModeValue("gray.50", "gray.800");
  const headerBg = useColorModeValue(
    "hsla(210, 38%, 95%, 0.05)",
    "hsla(230, 21%, 15%, 0.7)"
  );
  const headerDs = useColorModeValue("md", "lg");
  const [mobileNavShown, setMobileNavShown] = useState(false);

  return (
    <>
      <Head>
        <title>WeightAndSee</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box
        shadow={headerDs}
        // mb="6"
        as="header"
        bg={headerBg}
        position="sticky"
        top="0"
        // bg="hsla(0,0,10,0.9)"
        // mb="12"
        textDecoration="initial"
        zIndex="1000"
        style={{
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(15px)",
        }}
      >
        <Box maxW="min(65ch, 100%)" mx="auto" px={["4", "4", "2", "2"]}>
          <Stack
            isInline
            justifyContent="space-between"
            alignItems="center"
            py={4}
          >
            <Box>
              <NextChakraLink
                href="/"
                _hover={{
                  color: headerColor,
                }}
              >
                <Stack
                  isInline
                  spacing={0}
                  fontSize={["xl", "xl", "2xl", "2xl"]}
                  fontFamily={"mono"}
                  fontWeight="300"
                  mr={12}
                >
                  <Text fontFamily="DM Sans" fontWeight="700">
                    weight
                  </Text>
                  <Text fontFamily="DM Sans" fontWeight="400">
                    &
                  </Text>
                  <Text fontFamily="DM Sans" fontWeight="700">
                    see
                  </Text>
                </Stack>
              </NextChakraLink>
            </Box>
            <Box>
              <Nav
                mobileNavShown={mobileNavShown}
                setMobileNavShown={setMobileNavShown}
              />
            </Box>
          </Stack>
          {mobileNavShown && (
            <Stack pb={5} spacing={2} fontWeight="bold">
              <NavItems />
            </Stack>
          )}
        </Box>
      </Box>
    </>
  );
};
