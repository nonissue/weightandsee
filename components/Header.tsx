import { useState } from "react";
import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/core";
import { Nav, NavItems, NextChakraLink } from ".";
import { useSession } from "next-auth/client";
import { motion } from "framer-motion";

import Head from "next/head";

export const Header: React.FunctionComponent = () => {
  const headerColor = useColorModeValue("pink.400", "pink.300");
  const loginLinkColor = useColorModeValue("pink.400", "pink.200");
  // const headerBg = useColorModeValue("gray.50", "gray.800");
  const headerBg = useColorModeValue(
    "hsla(210, 38%, 95%, 0.7)",
    "hsla(230, 21%, 24%, 0.2)"
  );
  const mobileNavBg = useColorModeValue(
    "hsla(210, 38%, 99%, 0.1)",
    "hsla(230, 21%, 15%, 0.7)"
  );
  const headerDs = useColorModeValue("sm", "xl");
  const navDs = useColorModeValue("lg", "xl");
  const [mobileNavShown, setMobileNavShown] = useState(false);

  const [session, loading] = useSession();

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
          WebkitBackdropFilter: "blur(25px)",
        }}
        className="nav-header"
      >
        <Box maxW="min(65ch, 100%)" mx="auto" px={["4", "4", "2", "2"]}>
          <motion.div
            animate={loading ? "loading" : "loaded"}
            initial="loading"
            variants={{
              loading: { opacity: 0, y: "-100px" },
              loaded: { opacity: 1, y: "0px" },
            }}
            transition={{ delay: 0, duration: 0.5 }}
          >
            <Stack
              isInline
              justifyContent="space-between"
              alignItems="center"
              py={4}
            >
              <Box>
                <NextChakraLink
                  href="/weights"
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
                  clipPath: `circle(${300 * 1.5}px at 0px 10vh)`,
                  transition: {
                    delay: 0,
                    type: "spring",
                    stiffness: 40,
                    restSpeed: 2,
                  },
                },
                closed: {
                  opacity: 0,
                  display: "none",
                  top: "0vh",
                  left: "0vw",
                  clipPath: "circle(25px at 0vw 10vh)",
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
                shadow={navDs}
                pb={4}
                pt={4}
                spacing={3}
                ml={["-4", "-4", "-2", "-2"]}
                px={["4", "4", "2", "2"]}
                position="absolute"
                // zIndex="-1"
                fontWeight="500"
                fontSize="lg"
                bg={mobileNavBg}
                className="mobile-nav"
                style={{
                  backdropFilter: "blur(15px)",
                  WebkitBackdropFilter: "blur(25px)",
                }}
                width="100vw"
              >
                {!session ? (
                  <>
                    <NextChakraLink
                      href="/api/auth/signin"
                      color={loginLinkColor}
                    >
                      Sign In
                    </NextChakraLink>
                    <NextChakraLink
                      href="/user/register"
                      color={loginLinkColor}
                    >
                      Sign Up
                    </NextChakraLink>
                  </>
                ) : (
                  <NavItems />
                )}
              </Stack>
              // </motion.div>
            )}
            {/* )} */}
          </motion.div>
        </Box>
      </Box>
    </>
  );
};
