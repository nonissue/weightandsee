import {
  Avatar,
  Flex,
  Box,
  BoxProps,
  Stack,
  IconButton,
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
  useBreakpointValue,
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
  // UserCircleSolid as UserAvatar,
} from "@graywolfai/react-heroicons";

import { ColorModeToggle } from "./ColorModeToggle";

import { NextChakraLink } from "./NextChakraLink";
import { PropsWithChildren } from "react";

type DemoIconProps = PropsWithChildren<Omit<IconProps, "as"> & BoxProps>;

const DemoIcon: React.FunctionComponent<DemoIconProps> = ({
  as,
  ...chakraProps
}) => (
  <Icon
    as={as}
    mr="2"
    w="6"
    mt="1px"
    h="6"
    sx={{
      path: {
        strokeWidth: "2px",
      },
      // fill: `${useColorModeValue("transparent", "url(#pink-gradient)")}`,
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

type Props = {
  mobileNavShown: boolean;
  setMobileNavShown: (bool: boolean) => void;
};

type NavItemsProps = {
  isAdmin?: boolean; // show add link
  user: SessionUser;
  isMobile?: boolean;
};

export const NavItems: React.FunctionComponent<NavItemsProps> = ({
  isAdmin,
  user = undefined,
  isMobile = true,
}) => {
  const loginLinkColor = useColorModeValue("pink.500", "pink.200");

  return (
    <>
      {isAdmin && (
        <NextChakraLink href="/weights/add" color={loginLinkColor}>
          + Add
        </NextChakraLink>
      )}
      <NextChakraLink href="/people">
        <Box display="flex" alignContent="center">
          <DemoIcon as={UsersOutline} />
          People
        </Box>
      </NextChakraLink>
      <NextChakraLink href="/weights">
        <Box display="flex" alignContent="center">
          <DemoIcon as={ScaleOutline} />
          WeighIns
        </Box>
      </NextChakraLink>
      <NextChakraLink href="/about">
        <Box display="flex" alignContent="center">
          <DemoIcon as={InformationCircleOutline} />
          About
        </Box>
      </NextChakraLink>
      <NextChakraLink href="/people">
        <Box display="flex" alignContent="center">
          <DemoIcon
            as={useColorModeValue(Moon, LightBulbOutline)}
            // opacity={useColorModeValue("0.6", "1")}
          />
          {/* <Icon
            as={Moon}
            mr="2"
            w="6"
            mt="1px"
            h="6"
            sx={{
              path: {
                strokeWidth: `${useColorModeValue("2px", "0px")}`,
              },
              fill: `${useColorModeValue(
                "transparent",
                "url(#pink-gradient)"
              )}`,
              stroke: "url(#pink-gradient)",
            }}
          >
            <svg width="0" height="0">
              <linearGradient
                id="pink-gradient"
                x1="100%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop stopColor="#FBB6CE" offset="0%" />
                <stop stopColor="#cf5895" offset="100%" />
              </linearGradient>
            </svg>
          </Icon> */}
          Dark Mode
        </Box>
      </NextChakraLink>

      {user && !isMobile && <ProfileMenu user={user} />}

      <ColorModeToggle position="absolute" top="-1" right="5" />
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
              {/* <ColorModeToggle2 /> */}
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
    <Box
      textAlign="right"
      mr={["0", "-1", "-4", "-6"]}
      whiteSpace="break-spaces"
    >
      <Box display="initial" flexDirection="row" alignItems="center">
        <ChakraMenu placement="bottom-start" autoSelect={false}>
          <Box display="flex" justifyContent="flex-end">
            <MenuButton
              as={IconButton}
              borderRadius="9999em"
              w="6"
              variant="ghost"
              sz="md"
              _hover={{
                cursor: "pointer",
              }}
            >
              <Avatar
                boxShadow="none"
                background="transparent"
                color="currentcolor"
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
