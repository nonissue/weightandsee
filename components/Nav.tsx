import {
  Flex,
  Box,
  Stack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { MenuIcon } from "@heroicons/react/solid";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { NextChakraLink } from "./NextChakraLink";
import { ColorModeToggle } from "./ColorModeToggle";

type Props = {
  mobileNavShown: boolean;
  setMobileNavShown: (bool: boolean) => void;
};

export const NavItems: React.FunctionComponent = () => {
  const loginLinkColor = useColorModeValue("pink.500", "pink.200");
  return (
    <>
      <NextChakraLink href="/weights/add" color={loginLinkColor}>
        + Add
      </NextChakraLink>
      <NextChakraLink href="/people">People</NextChakraLink>
      <NextChakraLink href="/weights">Weigh-Ins</NextChakraLink>
      {/* <NextChakraLink href="/demo">Graphs</NextChakraLink> */}
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
  // this is actually the opposite of what we expect?
  const showBurger = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  // const logoutLinkColor = useColorModeValue("orange.500", "orange.200");
  const loginLinkColor = useColorModeValue("green.500", "green.200");
  const user = true;

  // showBurger => show burger button rather than full nav
  // mobileNavShown => burger clicked, show mobile nav items

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
                  padding="1"
                  icon={
                    <InformationCircleIcon
                      width="24px"
                      height="24px"
                      // viewBox="0 0 24 24"
                    />
                  }
                />
              </NextChakraLink>

              <ColorModeToggle />

              <IconButton
                marginLeft="1"
                paddingY="1"
                size="sm"
                aria-label={`Menu`}
                variant="ghost"
                icon={<MenuIcon width="24px" height="24px" />}
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
              fontWeight="semibold"
            >
              {!user ? (
                <>
                  <NextChakraLink href="/demo" color={loginLinkColor}>
                    Login
                  </NextChakraLink>
                </>
              ) : (
                <NavItems />
              )}
              ;
              <Stack isInline spacing={1}>
                <NextChakraLink href="/about">
                  <IconButton
                    // marginLeft="1"
                    // padding="1"
                    size="sm"
                    aria-label={`About/Info`}
                    variant="ghost"
                    icon={
                      <InformationCircleIcon
                        width="24px"
                        height="24px"
                        // viewBox="0 0 24 24"
                      />
                    }
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
