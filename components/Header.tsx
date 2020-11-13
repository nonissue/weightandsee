import { useState } from "react";
import { Box, Stack, Text, useColorModeValue, Fade } from "@chakra-ui/core";
import { Nav, NavItems, NextChakraLink } from ".";

import { motion } from "framer-motion";

import Head from "next/head";

export const Header: React.FunctionComponent = () => {
  const headerColor = useColorModeValue("pink.400", "pink.300");
  // const headerBg = useColorModeValue("gray.50", "gray.800");
  const headerBg = useColorModeValue(
    "hsla(210, 38%, 99%, 0.7)",
    "hsla(230, 21%, 15%, 0.4)"
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
        flex="none"
        as="header"
        bg={headerBg}
        position="sticky"
        top="0"
        textDecoration="initial"
        zIndex="1000"
        style={{
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
        }}
        className="nav-header"
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
          {/* {mobileNavShown && ( */}
          <motion.div
            variants={{
              open: {
                opacity: 1,
                right: "0vw",
                top: "0",
                // top: "0",
                clipPath: `circle(${500 * 2}px at 100vw 10vh)`,
                transition: {
                  type: "spring",
                  stiffness: 30,
                  // restDelta: 30,
                  restSpeed: 20,
                  // damping: 10,
                },
              },
              closed: {
                opacity: 0,
                // left: "50%",
                top: "0vh",
                right: "-100vw",
                // top: "50%",
                clipPath: "circle(50px at 100vw 0vh)",
                transition: {
                  delay: 0,
                  type: "spring",
                  stiffness: 30,
                  damping: 5,
                },
              },
            }}
            initial={false}
            style={{
              position: "absolute",
              // height: "100vh",

              marginLeft: "-16px",
              // backdropFilter: "blur(15px)",
              // WebkitBackdropFilter: "blur(15px)",
            }}
            // transition={{ duration: 0.5 }}
            animate={mobileNavShown ? "open" : "closed"}
          >
            <Stack
              pb={5}
              spacing={2}
              pl="4"
              pt="4"
              fontWeight="500"
              fontSize="lg"
              bg={headerBg}
              // position="absolute"
              height="100vh"
              style={{
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
              }}
              // left="0"
              width="100vw"
            >
              <NavItems />
            </Stack>
          </motion.div>
          {/* )} */}
        </Box>
      </Box>
    </>
  );
};
