import {
  Flex,
  Box,
  Stack,
  IconButton,
  useColorModeValue,
  Link,
} from "@chakra-ui/core";
import { signOut, useSession } from "next-auth/client";
import { motion } from "framer-motion";
import { Menu, InformationCircleOutline, X } from "heroicons-react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { NextChakraLink } from "./NextChakraLink";
import { ColorModeToggle } from "./ColorModeToggle";

type Props = {
  mobileNavShown: boolean;
  setMobileNavShown: (bool: boolean) => void;
};

export const NavItems: React.FunctionComponent = () => {
  const loginLinkColor = useColorModeValue("pink.500", "pink.200");
  const logoutLinkColor = useColorModeValue("pink.600", "pink.400");
  return (
    <>
      <NextChakraLink href="/weights/add" color={loginLinkColor}>
        + Add
      </NextChakraLink>
      <NextChakraLink href="/people">People</NextChakraLink>
      <NextChakraLink href="/weights">Weigh-Ins</NextChakraLink>
      {/* <NextChakraLink href="/graphs">Graphs</NextChakraLink> */}
      <Link
        // variant="ghost"
        onClick={() => signOut()}
        textColor={logoutLinkColor}
        // fontWeight="600"
      >
        Sign Out
      </Link>
      {/* <NextChakraLink href="/about">About</NextChakraLink> */}
    </>
  );
};

// Can we render mobile nav in here?
// or should mobile nav be its own component altogether?
export const Nav: React.FunctionComponent<Props> = ({
  mobileNavShown,
  setMobileNavShown,
}) => {
  const [session] = useSession();

  // this is actually the opposite of what we expect?
  const showBurger = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  // const logoutLinkColor = useColorModeValue("orange.500", "orange.200");
  const loginLinkColor = useColorModeValue("pink.400", "pink.200");

  return (
    <>
      <Box>
        <Stack isInline spacing={0} alignItems="center">
          {showBurger ? (
            <Flex justifyContent="flex-end" alignItems="center" width="100%">
              <NextChakraLink href="/about">
                <IconButton
                  marginLeft="1"
                  size="sm"
                  aria-label={`About/Info`}
                  variant="ghost"
                  icon={<InformationCircleOutline />}
                />
              </NextChakraLink>

              <ColorModeToggle />

              <IconButton
                marginLeft="1"
                size="sm"
                aria-label={`Menu`}
                variant="ghost"
                zIndex={1000}
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
                      <X />
                    </motion.div>

                    <motion.div
                      animate={mobileNavShown ? "open" : "closed"}
                      variants={{
                        closed: { opacity: 1, display: "block" },
                        open: { opacity: 0, display: "none" },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu />
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
                    Login
                  </NextChakraLink>
                  <NextChakraLink href="/user/register" color={loginLinkColor}>
                    Sign Up
                  </NextChakraLink>
                </>
              ) : (
                <NavItems />
              )}

              <Stack isInline spacing={1}>
                <NextChakraLink href="/about">
                  <IconButton
                    size="sm"
                    aria-label={`About/Info`}
                    variant="ghost"
                    icon={<InformationCircleOutline />}
                  />
                </NextChakraLink>
                <ColorModeToggle />
              </Stack>
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
};
