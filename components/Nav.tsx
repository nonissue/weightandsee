import {
  Flex,
  Box,
  Stack,
  IconButton,
  useColorModeValue
} from "@chakra-ui/core";
import { Menu } from "heroicons-react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { NextChakraLink } from "./NextChakraLink";
import { ColorModeToggle } from "./ColorModeToggle";

type Props = {
  mobileNavShown: boolean;
  setMobileNavShown: (bool: boolean) => void;
};

// Can we render mobile nav in here?
// or should mobile nav be its own component altogether?
export const Nav: React.FunctionComponent<Props> = ({
  mobileNavShown,
  setMobileNavShown
}) => {
  const showBurger = useBreakpointValue({ base: false, sm: true });
  const logoutLinkColor = useColorModeValue("orange.500", "orange.200");
  const loginLinkColor = useColorModeValue("green.500", "green.200");
  const user = true;

  // showBurger => show burger button rather than full nav
  // mobileNavShown => burger clicked, show mobile nav items

  return (
    <>
      <Box>
        <Stack isInline spacing={4} alignItems="center">
          {showBurger ? (
            <Stack
              isInline
              spacing={6}
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
                <>
                  {" "}
                  {/* <NextChakraLink href="/posts">Weign In</NextChakraLink> */}
                  <NextChakraLink href="/weights" color={loginLinkColor}>
                    + Add
                  </NextChakraLink>
                  <NextChakraLink href="/demo">Graphs</NextChakraLink>
                  <NextChakraLink href="/demo">Data</NextChakraLink>
                  {/* <NextChakraLink href="/logout" color={logoutLinkColor}>
                    Logout
                  </NextChakraLink> */}
                </>
              )}
              ;
              <ColorModeToggle />
            </Stack>
          ) : (
            <Flex justifyContent="flex-end" alignItems="center" width="100%">
              <ColorModeToggle />

              <IconButton
                marginLeft="1"
                size="sm"
                aria-label={`Menu`}
                variant="ghost"
                icon={<Menu />}
                onClick={() => {
                  setMobileNavShown(!mobileNavShown);
                  console.log("clicked");
                }}
              />
            </Flex>
          )}
        </Stack>
      </Box>
    </>
  );
};
