import { useState } from "react";
import {
  Box,
  Stack,
  Text,
  useColorModeValue,
  Button,
  Link,
  Menu as ChakraMenu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuDivider,
  Portal,
} from "@chakra-ui/react";
import { Nav, NavItems, NextChakraLink } from ".";
import { useSession, signOut } from "next-auth/client";
import { motion } from "framer-motion";

import Head from "next/head";

export const Header: React.FunctionComponent = () => {
  const headerColor = useColorModeValue("pink.400", "pink.300");
  const loginLinkColor = useColorModeValue("pink.400", "pink.200");
  // const mobileNavDividerColor = useColorModeValue("gray.400", "gray.600");

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, loading]: any = useSession();

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
        zIndex="1"
        style={{
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(25px)",
          // clip: "rect(0px,0px,0px,0px)",
        }}
        className="nav-header"
        // w="95vw"
        // overflowY="auto"
      >
        <Box maxW="min(65ch, 100%)" mx="auto" px={["4", "4", "2", "2"]}>
          <motion.div
            animate={loading ? "loading" : "loaded"}
            initial="loading"
            variants={{
              loading: { opacity: 0, y: "-100px" },
              loaded: { opacity: 1, y: "0px" },
            }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Stack
              // overflowX="hidden"
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
                    mr={["2", "6", "12", "12"]}
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
              {/* <Box> */}
              <Nav
                mobileNavShown={mobileNavShown}
                setMobileNavShown={setMobileNavShown}
              />
              {/* </Box> */}
            </Stack>

            {mobileNavShown && (
              <Stack
                shadow={navDs}
                // pb={4}
                pt={4}
                spacing={3}
                ml={["-4", "-4", "-2", "-2"]}
                px={["4", "4", "2", "2"]}
                position="absolute"
                fontWeight="500"
                fontSize="lg"
                bg={mobileNavBg}
                pb="5"
                className="mobile-nav"
                style={{
                  backdropFilter: "blur(15px)",
                  WebkitBackdropFilter: "blur(25px)",
                  // clip: "rect(0,0px,100px,0)",
                }}
                width="100vw"
              >
                {session && session.user && false && (
                  <Box
                    textAlign="right"
                    mr="4"
                    mt="2"
                    whiteSpace="break-spaces"
                  >
                    <Box
                      display="initial"
                      flexDirection="row"
                      alignItems="center"
                    >
                      <ChakraMenu>
                        <Box display="flex" justifyContent="flex-end">
                          <MenuButton
                            as={Button}
                            alignItems="center"
                            backgroundColor="transparent"
                            colorScheme="pink"
                            size="xs"
                            variant="outline"
                          >
                            <Box display="inline-block">
                              Hi <b>{session.user?.name}</b>&nbsp;
                            </Box>
                            <Box
                              flex="0"
                              display="inline"
                              top="-2px"
                              position="relative"
                              fontWeight="400"
                              fontFamily="mono"
                              fontSize="0.7em"
                              textTransform="uppercase"
                              color="gray.300"
                            >
                              {session.user?.role === "ADMIN" && "admin"}
                            </Box>
                          </MenuButton>
                        </Box>
                        <Portal>
                          <MenuList zIndex={10}>
                            <MenuGroup title="">
                              {session.user?.role === "ADMIN" && (
                                <Text
                                  px="4"
                                  py="2"
                                  fontWeight="400"
                                  fontFamily="mono"
                                  fontSize="0.8em"
                                  textTransform="uppercase"
                                  color="gray.400"
                                >
                                  ROLE: Admin
                                </Text>
                              )}
                              <MenuItem px="4">Profile</MenuItem>
                              <MenuItem px="4">Graphs</MenuItem>
                              <MenuItem px="4">Settings</MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup>
                              <MenuItem>
                                <Link
                                  px="1"
                                  onClick={() => signOut()}
                                  // textColor={logoutLinkColor}
                                >
                                  Sign&nbsp;Out
                                </Link>
                              </MenuItem>
                            </MenuGroup>
                          </MenuList>
                        </Portal>
                      </ChakraMenu>
                    </Box>
                    {/* <Divider
                      flex="1"
                      w="100%"
                      // py="2"
                      mt="1"
                      // height="4px"
                      borderWidth="1.5px"
                      borderColor={mobileNavDividerColor}
                      mb="2"
                    /> */}
                  </Box>
                )}
                {!session ? (
                  <>
                    <NextChakraLink
                      href="/api/auth/signin"
                      color={loginLinkColor}
                    >
                      Sign In
                    </NextChakraLink>
                    <NextChakraLink href="/user/signup" color={loginLinkColor}>
                      Sign Up
                    </NextChakraLink>
                  </>
                ) : (
                  <NavItems
                    isAdmin={(session.user?.role as unknown) === "ADMIN"}
                    user={session.user || null}
                  />
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
