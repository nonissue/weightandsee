import {
  Avatar,
  Flex,
  Box,
  Stack,
  IconButton,
  useColorModeValue,
  Link,
  Icon,
  Text,
  Portal,
  Menu as ChakraMenu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuDivider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import { motion } from "framer-motion";
// import { Menu, X as Close } from "heroicons-react";
import {
  MenuAlt3Outline as Menu,
  XOutline as Close,
  UserCircleSolid as UserAvatar,
} from "@graywolfai/react-heroicons";

import { NextChakraLink } from "./NextChakraLink";
import { ColorModeToggle2 } from "./ColorModeToggle";

type Props = {
  mobileNavShown: boolean;
  setMobileNavShown: (bool: boolean) => void;
};

type NavItemsProps = {
  isAdmin?: boolean; // show add link
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  isMobile?: boolean;
};

export const NavItems: React.FunctionComponent<NavItemsProps> = ({
  isAdmin,
  user = undefined,
  isMobile = true,
}) => {
  const router = useRouter();
  const loginLinkColor = useColorModeValue("pink.500", "pink.200");
  const logoutLinkColor = useColorModeValue("pink.700", "pink.400");

  console.log(isMobile);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    context: string
  ): void => {
    event.preventDefault();
    console.log(context);
    if (user) {
      router.push("/" + context + "/" + user.name.toLowerCase());
    }
  };
  const buttonBgHover = useColorModeValue("gray.200", "gray.700");
  return (
    <>
      {isAdmin && (
        <NextChakraLink href="/weights/add" color={loginLinkColor}>
          + Add
        </NextChakraLink>
      )}
      <NextChakraLink href="/people">People</NextChakraLink>
      <NextChakraLink href="/weights">WeighIns</NextChakraLink>
      <NextChakraLink href="/about">About</NextChakraLink>
      {user && !isMobile && (
        // shown on desktop viewport
        <ChakraMenu>
          <MenuButton
            as={IconButton}
            borderRadius="999em"
            variant="ghost"
            size="md"
            mr={["0", "-4"]}
            _hover={{
              cursor: "pointer",
              // background: "gray.400",
              background: buttonBgHover,
            }}
          >
            <Avatar
              boxShadow="none"
              background="transparent"
              color="currentcolor"
              w={6}
              h={6}
              icon={
                <Icon
                  sx={{
                    path: {
                      strokeWidth: "0px",
                    },
                    stroke: "url(#pink-gradient)",
                  }}
                  w={6}
                  h={6}
                  as={UserAvatar}
                  aria-label={user.name}
                />
              }
            />
          </MenuButton>
          <Portal>
            <MenuList zIndex={10}>
              <MenuGroup title="">
                {user.role === "ADMIN" && (
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
                <MenuItem px="4" onClick={(e) => handleClick(e, "people")}>
                  Profile
                </MenuItem>
                <MenuItem px="4" onClick={(e) => handleClick(e, "graphs")}>
                  Graphs
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem>
                  <Link
                    px="1"
                    onClick={() => signOut()}
                    textColor={logoutLinkColor}
                  >
                    Sign&nbsp;Out
                  </Link>
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Portal>
        </ChakraMenu>
      )}
    </>
  );
};

// Can we render mobile nav in here?
// or should mobile nav be its own component altogether?
export const Nav: React.FunctionComponent<Props> = ({
  mobileNavShown,
  setMobileNavShown,
}) => {
  // next-auth session.user type is wrong
  // so have to set this as any?
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session]: any = useSession();
  const router = useRouter();

  // console.log(session);

  // console.log(session?.user.role);
  // this is actually the opposite of what we expect?
  const showBurger = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  const loginLinkColor = useColorModeValue("pink.400", "pink.200");
  const buttonBgHover = useColorModeValue("gray.300", "gray.700");

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    context: string
  ): void => {
    event.preventDefault();
    console.log(context);
    if (session.user) {
      router.push("/" + context + "/" + session.user.name.toLowerCase());
    }
  };

  return (
    <>
      <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#6dd5ed" offset="0%" />
          <stop stopColor="#2193b0" offset="100%" />
        </linearGradient>
      </svg>

      <svg width="0" height="0">
        <linearGradient id="pink-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#FBB6CE" offset="0%" />
          <stop stopColor="#cf5895" offset="100%" />
        </linearGradient>
      </svg>
      <Box>
        <Stack isInline spacing={0} alignItems="center">
          {showBurger ? (
            <Flex justifyContent="flex-end" alignItems="center" width="100%">
              {session && session.user && (
                <Box textAlign="right" mr="1" whiteSpace="break-spaces">
                  <Box
                    display="initial"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <ChakraMenu>
                      <Box display="flex" justifyContent="flex-end">
                        <MenuButton
                          as={IconButton}
                          borderRadius="9999em"
                          w="6"
                          variant="ghost"
                          sz="md"
                          _hover={{
                            cursor: "pointer",
                            // background: "gray.400",
                            background: buttonBgHover,
                          }}
                        >
                          <Avatar
                            boxShadow="none"
                            background="transparent"
                            color="currentcolor"
                            // color="pink.400"
                            icon={
                              <Icon
                                sx={{
                                  path: {
                                    strokeWidth: "0px",
                                  },
                                  stroke: "url(#pink-gradient)",
                                }}
                                w={6}
                                h={6}
                                as={UserAvatar}
                                aria-label={session.user.name}
                              />
                            }
                          />
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
                            <MenuItem
                              px="4"
                              onClick={(e) => handleClick(e, "people")}
                            >
                              Profile
                            </MenuItem>
                            <MenuItem
                              px="4"
                              onClick={(e) => handleClick(e, "graphs")}
                            >
                              Graphs
                            </MenuItem>
                          </MenuGroup>
                          <MenuDivider />
                          <MenuGroup>
                            <MenuItem>
                              <Link px="1" onClick={() => signOut()}>
                                Sign&nbsp;Out
                              </Link>
                            </MenuItem>
                          </MenuGroup>
                        </MenuList>
                      </Portal>
                    </ChakraMenu>
                  </Box>
                </Box>
              )}

              <ColorModeToggle2 />

              <IconButton
                marginX="1"
                // size="sm"
                aria-label={`Menu`}
                variant="ghost"
                zIndex={1}
                borderRadius="999em"
                icon={
                  <>
                    <motion.div
                      animate={mobileNavShown ? "open" : "closed"}
                      variants={{
                        closed: { opacity: 0, display: "none" },
                        open: { opacity: 1, display: "block" },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon
                        sx={{
                          stroke: "url(#blue-gradient)",
                          strokeLinecap: "round",
                        }}
                        aria-label="menu"
                        w={7}
                        h={7}
                        as={Close}
                      />
                    </motion.div>

                    <motion.div
                      animate={mobileNavShown ? "open" : "closed"}
                      variants={{
                        closed: { opacity: 1, display: "block" },
                        open: { opacity: 0, display: "none" },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon
                        w={7}
                        h={7}
                        as={Menu}
                        sx={{
                          stroke: "url(#blue-gradient)",
                          strokeLinecap: "round",
                        }}
                      />
                    </motion.div>
                  </>
                }
                onClick={() => {
                  setMobileNavShown(!mobileNavShown);
                }}
              />
            </Flex>
          ) : (
            <Stack
              isInline
              spacing={["4", "4", "4", "6"]}
              alignItems="center"
              fontWeight="600"
            >
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
                  isAdmin={(session.user?.role as string) === "ADMIN"}
                  user={session?.user || undefined}
                  isMobile={showBurger}
                />
              )}

              {/* <Stack isInline spacing={0} textAlign="center"> */}
              {/* <NextChakraLink href="/about">
                  <IconButton
                    size="sm"
                    aria-label={`About/Info`}
                    variant="ghost"
                    icon={<InformationCircleOutline />}
                  ></IconButton>
                </NextChakraLink> */}
              {/* <h3>Hi</h3> */}
              <ColorModeToggle2 />
              {/* </Stack> */}
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
};
