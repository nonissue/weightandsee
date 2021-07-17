import {
  BoxProps,
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
// import { Moon, Sun } from "heroicons-react";
import {
  MoonOutline as Moon,
  SunSolid as Sun,
} from "@graywolfai/react-heroicons";

import { PropsWithChildren } from "react";

type ColorModeSwitcherProps3 = PropsWithChildren<
  Omit<IconButtonProps, "aria-label"> & BoxProps
>;

// type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeToggle: React.FunctionComponent<ColorModeSwitcherProps3> =
  ({ ...chakraProps }) => {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue("dark", "light");
    const SwitchIcon = useColorModeValue(Sun, Moon);

    return (
      <IconButton
        size="sm"
        variant="ghost"
        color="current"
        marginX="1"
        onClick={toggleColorMode}
        icon={<SwitchIcon width="20px" height="20px" viewBox="0 0 20 20" />}
        aria-label={`Switch to ${text} mode`}
        {...chakraProps}
      />
    );
  };

export const ColorModeToggle2: React.FunctionComponent<ColorModeSwitcherProps3> =
  ({ ...chakraProps }) => {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue("dark", "light");
    const SwitchIcon = useColorModeValue(Moon, Sun);
    useColorModeValue("2px", "0px");
    // const buttonBgHover = useColorModeValue("gray.300", "gray.700");

    return (
      <IconButton
        size="md"
        variant="ghost"
        _hover={{
          cursor: "pointer",
          // background: buttonBgHover,
        }}
        // color={useColorModeValue("transparent", "#d381ac")}
        // color="transparent"
        borderRadius="9999em"
        mr="0"
        onClick={toggleColorMode}
        icon={
          <Icon
            as={SwitchIcon}
            w="6"
            h="6"
            sx={{
              path: {
                strokeWidth: `${useColorModeValue("2px", "0px")}`,
              },
              fill: `${useColorModeValue(
                "transparent",
                "url(#pink-gradient)"
              )}`,
              stroke: "url(#toggle-gradient)",
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
          </Icon>
        }
        aria-label={`Switch to ${text} mode`}
        {...chakraProps}
      />
    );
  };
