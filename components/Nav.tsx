import {
  Avatar,
  Flex,
  Box,
  BoxProps,
  Button,
  Stack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Link,
  Icon,
  Text,
  Portal,
  IconProps,
  Menu as ChakraMenu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuDivider,
  // useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import { motion } from "framer-motion";
import { SessionUser } from "interfaces";
import {
  MenuAlt3Outline as Menu,
  XOutline as Close,
  UserOutline as UserAvatar,
  MoonOutline as Moon,
  InformationCircleOutline,
  ScaleOutline,
  UsersOutline,
  LightBulbOutline,
  PlusCircleOutline,
} from "@graywolfai/react-heroicons";

import { NextChakraLink } from "./NextChakraLink";
import { PropsWithChildren, useEffect } from "react";

type DemoIconProps = PropsWithChildren<Omit<IconProps, "as"> & BoxProps>;

type NavProps = {
  mobileNavShown: boolean;
  setMobileNavShown: (bool: boolean) => void;
  showMobileMenu: boolean;
};

type NavItemsProps = {
  isAdmin?: boolean;
  user: SessionUser;
  isMobile?: boolean;
};

const DemoIcon: React.FunctionComponent<DemoIconProps> = ({
  as,
  ...chakraProps
}) => (
  <Icon
    as={as}
    mr={["2", "2", "2", "2"]}
    w="6"
    mt="1px"
    h="6"
    sx={{
      path: {
        strokeWidth: "2px",
      },
      fill: "transparent",
      stroke: "url(#pink-gradient)",
    }}
    {...chakraProps}
  >
    <svg width="0" height="0">
      <linearGradient id="pink-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop stopColor="#FBB6CE" offset="0%" />
        <stop stopColor="#cf5895" offset="100%" />
      </linearGradient>
    </svg>
  </Icon>
);

export const NavItems: React.FunctionComponent<NavItemsProps> = ({
  isAdmin,
  user = undefined,
  isMobile = true,
}) => {
  const { toggleColorMode } = useColorMode();

  const uiToggleIcon = useColorModeValue(Moon, LightBulbOutline);

  const iconSize = isMobile ? 7 : 4;
  return (
    <>
      {isAdmin && (
        <NextChakraLink href="/weights/add" whiteSpace="nowrap">
          <Box display="flex" alignItems="center">
            <DemoIcon w={iconSize} h={iconSize} as={PlusCircleOutline} />
            Add
          </Box>
        </NextChakraLink>
      )}
      <NextChakraLink href="/people">
        <Box display="flex" alignItems="center">
          <DemoIcon w={iconSize} h={iconSize} as={UsersOutline} />
          People
        </Box>
      </NextChakraLink>
      <NextChakraLink href="/weights">
        <Box display="flex" alignItems="center">
          <DemoIcon w={iconSize} h={iconSize} as={ScaleOutline} />
          WeighIns
        </Box>
      </NextChakraLink>
      <NextChakraLink href="/about">
        <Box display="flex" alignItems="center">
          <DemoIcon w={iconSize} h={iconSize} as={InformationCircleOutline} />
          About
        </Box>
      </NextChakraLink>
      <Box display="flex" alignItems="center">
        {isMobile || (
          <Box
            display="flex"
            as={Button}
            variant="link"
            alignContent="center"
            onClick={toggleColorMode}
          >
            <DemoIcon as={uiToggleIcon} />
          </Box>
        )}
        <Box display="flex" alignContent="center" mr="2">
          {user && !isMobile && <ProfileMenu user={user} />}
        </Box>
      </Box>
    </>
  );
};

// Can we render mobile nav in here?
// or should mobile nav be its own component altogether?
export const Nav: React.FunctionComponent<NavProps> = ({
  mobileNavShown,
  setMobileNavShown,
  showMobileMenu,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session]: any = useSession();
  const { toggleColorMode } = useColorMode();
  const loginLinkColor = useColorModeValue("pink.400", "pink.200");
  const uiToggleIcon = useColorModeValue(Moon, LightBulbOutline);

  useEffect(() => {
    if (!showMobileMenu && mobileNavShown) {
      setMobileNavShown(false);
    }
  }, [showMobileMenu, setMobileNavShown, mobileNavShown]);

  return (
    <>
      <svg width="0" height="0">
        <linearGradient id="pink-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#FBB6CE" offset="0%" />
          <stop stopColor="#cf5895" offset="100%" />
        </linearGradient>
      </svg>
      <Box>
        <Stack isInline spacing={0} alignItems="center">
          {showMobileMenu ? (
            <Flex justifyContent="unset" alignItems="center" width="100%">
              <Box
                display="flex"
                as={Button}
                variant="link"
                alignContent="center"
                onClick={toggleColorMode}
              >
                <DemoIcon as={uiToggleIcon} />
              </Box>
              {session && session.user && <ProfileMenu user={session.user} />}

              <IconButton
                marginX="1"
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
                          stroke: "url(#pink-gradient)",
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
                          stroke: "url(#pink-gradient)",
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
              // spacing={["4", "4", "4", "6"]}
              spacing={3}
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
                  isMobile={showMobileMenu}
                />
              )}
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
};

type HandleClickProps = {
  event: React.MouseEvent<HTMLButtonElement>;
  prefix: string;
};

const ProfileMenu: React.FunctionComponent<{ user: SessionUser }> = ({
  user,
}) => {
  const router = useRouter();

  const handleClick = ({ event, prefix }: HandleClickProps): void => {
    event.preventDefault();

    if (user) {
      router.push(`/${prefix}/${user.name.toLowerCase()}`);
    }
  };

  return (
    <Box mr={["0", "0", "0", "0"]}>
      <Box display="block" flexDirection="row" alignItems="center">
        <ChakraMenu placement="bottom-start" autoSelect={false}>
          {/* <Box display="flex" justifyContent="flex-end"> */}
          <Box display="flex">
            <MenuButton
              // w="100px"
              // w="5"
              h="6"
              // background="#ff0000"
              zIndex="1000"
              as={Box}
              borderRadius="9999em"
              // w="5"
              // h="5"
              // sz="md"
              _hover={{
                cursor: "pointer",
              }}
            >
              <Avatar
                boxShadow="none"
                background="transparent"
                color="currentcolor"
                w="6"
                h="6"
                icon={
                  <Icon
                    sx={{
                      path: {
                        strokeWidth: "2px",
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
          </Box>
          <Portal>
            <MenuList zIndex={10} pt="2">
              <MenuGroup

              // title={`${user.name}${user.role === "ADMIN" && " (admin)"}`}
              >
                <Box
                  display="flex"
                  // justifyContent="flex-end"
                  // alignItems="flex-start"
                  justifyContent="flex-start"
                  mx="4"
                  flex="0"
                >
                  <Box alignSelf="center" justifySelf="unset" flex="0">
                    <Avatar
                      size="sm"
                      mx="1"
                      fontWeight="800"
                      letterSpacing="-0.06em"
                      boxShadow="base"
                      textShadow="1px 1px 1px hsla(0, 0%, 20%, 0.3)"
                      name={user.name}
                      color="white"
                      bgColor="hsla(320.2941176470588, 69.3877551020408%, 40.7843137254902%, 1)"
                      border="2px solid hsla(320.2941176470588, 90.3877551020408%, 70.7843137254902%, 1)"
                    />
                  </Box>
                  <Box
                    mx="1"
                    flex="0"
                    // textAlign="right"
                    display="flex"
                    flexDirection="column"
                    // alignContent="flex-end"
                  >
                    <Text py="0" fontWeight="800" fontSize="lg" m="0">
                      {user.name}
                    </Text>
                    {user.role && (
                      <Text
                        px="0"
                        p="0"
                        mt="-1"
                        // flex="0"
                        fontWeight="400"
                        fontFamily="body"
                        letterSpacing="0.03em"
                        fontSize="0.6em"
                        textTransform="uppercase"
                        color="gray.400"
                        display="inline"
                      >
                        {user.role === "ADMIN" ? "Admin" : "USER"}
                      </Text>
                    )}
                  </Box>
                </Box>
                <MenuDivider />

                <MenuItem
                  px="4"
                  onClick={(event) => handleClick({ event, prefix: "people" })}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  px="4"
                  onClick={(event) => handleClick({ event, prefix: "graphs" })}
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
  );
};
