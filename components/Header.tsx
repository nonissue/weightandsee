import { useState } from "react";
import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/core";
import { Nav, NavItems, NextChakraLink } from ".";
import { useSession } from "next-auth/client";
import { motion } from "framer-motion";

import Head from "next/head";

export const Header: React.FunctionComponent = () => {
  const headerColor = useColorModeValue("pink.400", "pink.300");
  // const headerBg = useColorModeValue("gray.50", "gray.800");
  const headerBg = useColorModeValue(
    "hsla(210, 38%, 99%, 0.7)",
    "hsla(230, 21%, 15%, 0.4)"
  );
  const headerDs = useColorModeValue("sm", "lg");
  const [mobileNavShown, setMobileNavShown] = useState(false);
  // const loading = false;
  const [session, loading] = useSession();

  if (session) {
    console.log(session);
  }
  // if (loading) {
  //   return <h1>LOADING</h1>;
  // }

  return (
    <>
      <Head>
        <title>WeightAndSee</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box
        shadow={headerDs}
        flex="none"
        as="header"
        bg={headerBg}
        position="sticky"
        top="0"
        textDecoration="initial"
        zIndex="1000"
        // opacity={loading ? "0.1" : "0.9"}
        style={{
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
        }}
        className="nav-header"
      >
        <Box maxW="min(65ch, 100%)" mx="auto" px={["4", "4", "2", "2"]}>
          <motion.div
            // in={mobileNavShown}
            animate={loading ? "loading" : "loaded"}
            initial="loading"
            variants={{
              loading: { opacity: 0 },
              loaded: { opacity: 1 },
            }}
            transition={{ delay: 0, duration: 2 }}
          >
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
            {/* {mobileNavShown && ( */}
            {/* <motion.div
              variants={{
                open: {
                  opacity: 1,
                  left: "0px",
                  top: "0",
                  display: "block",
                  clipPath: `circle(${200 * 1.5}px at 0px 10vh)`,
                  transition: {
                    delay: 0.3,
                    type: "spring",
                    stiffness: 30,
                    restSpeed: 2,
                  },
                },
                closed: {
                  opacity: 0,
                  display: "none",
                  top: "0vh",
                  left: "0vw",
                  clipPath: "circle(5px at 0vw 10vh)",
                  transition: {
                    delay: 0,
                    type: "spring",
                    stiffness: 30,
                    damping: 5,
                  },
                },
              }}
              initial={false}
              animate={mobileNavShown ? "open" : "closed"}
            > */}
            {mobileNavShown && (
              <Stack
                pb={5}
                spacing={1}
                // pl="4"
                pt="0"
                fontWeight="500"
                fontSize="lg"
                bg={headerBg}
                // position="absolute"
                // height="100vh"
                style={{
                  backdropFilter: "blur(15px)",
                  WebkitBackdropFilter: "blur(15px)",
                }}
                // left="0"
                width="100vw"
              >
                <NavItems />
              </Stack>
            )}
            {/* </motion.div> */}
            {/* )} */}
          </motion.div>
        </Box>
      </Box>
    </>
  );
};
