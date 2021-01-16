import {
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
  Button,
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
  MenuOutline as Menu,
  XSolid as Close,
} from "@graywolfai/react-heroicons";

import { NextChakraLink } from "./NextChakraLink";
import { ColorModeToggle } from "./ColorModeToggle";

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (user) {
      router.push("people/" + user.name.toLowerCase());
    }
  };

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
        <ChakraMenu>
          <MenuButton as={Button} colorScheme="pink" size="sm">
            {user.name}
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
                <MenuItem px="4" onClick={handleClick}>
                  Profile
                </MenuItem>
                <MenuItem px="4">Graphs</MenuItem>
                <MenuItem px="4">Settings</MenuItem>
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

      {/* {isMobile && (
        <Link
          display="inline"
          onClick={() => signOut()}
          textColor={logoutLinkColor}
        >
          Sign&nbsp;Out
        </Link>
      )} */}
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

  console.log(session);

  // console.log(session?.user.role);
  // this is actually the opposite of what we expect?
  const showBurger = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  const loginLinkColor = useColorModeValue("pink.400", "pink.200");

  return (
    <>
      <Box>
        <Stack isInline spacing={0} alignItems="center">
          {showBurger ? (
            <Flex justifyContent="flex-end" alignItems="center" width="100%">
              {/* <NextChakraLink href="/about">
                <IconButton
                  marginX="1"
                  size="sm"
                  p="2"
                  aria-label={`About/Info`}
                  variant="ghost"
                  icon={<InformationCircleOutline />}
                />
              </NextChakraLink> */}
              {session && session.user && (
                <Box textAlign="right" mr="4" whiteSpace="break-spaces">
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
                          // backgroundColor="transparent"
                          colorScheme="pink"
                          size="xs"
                          // variant="outline"
                        >
                          <Box display="inline-block">
                            <b>Profile</b>
                            &nbsp;
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

              <ColorModeToggle />

              <IconButton
                marginX="1"
                size="sm"
                aria-label={`Menu`}
                variant="ghost"
                zIndex={1}
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
                      <Icon w={6} h={6} as={Close} width="2em" />
                    </motion.div>

                    <motion.div
                      animate={mobileNavShown ? "open" : "closed"}
                      variants={{
                        closed: { opacity: 1, display: "block" },
                        open: { opacity: 0, display: "none" },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* <LazyMenu /> */}
                      <Icon w={6} h={6} as={Menu} />
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

              <Stack isInline spacing={1} textAlign="center">
                {/* <NextChakraLink href="/about">
                  <IconButton
                    size="sm"
                    aria-label={`About/Info`}
                    variant="ghost"
                    icon={<InformationCircleOutline />}
                  ></IconButton>
                </NextChakraLink> */}
                <ColorModeToggle />
              </Stack>
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
};
