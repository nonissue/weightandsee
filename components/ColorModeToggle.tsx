import {
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
// import { Moon, Sun } from "heroicons-react";
import {
  MoonSolid as Moon,
  SunSolid as Sun,
} from "@graywolfai/react-heroicons";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeToggle: React.FunctionComponent = (
  props: ColorModeSwitcherProps
) => {
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
      {...props}
    />
  );
};

type ColorModeSwitcherProps2 = Omit<IconButtonProps, "aria-label">;

export const ColorModeToggle2: React.FunctionComponent = (
  props: ColorModeSwitcherProps2
) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(Sun, Moon);
  const buttonBgHover = useColorModeValue("gray.300", "gray.700");

  return (
    <IconButton
      size="md"
      variant="ghost"
      _hover={{
        cursor: "pointer",
        background: buttonBgHover,
      }}
      // color="#cf5895"
      // color="transparent"
      borderRadius="9999em"
      mr="-1"
      onClick={toggleColorMode}
      icon={
        <Icon
          as={SwitchIcon}
          w="6"
          h="6"
          sx={{
            path: {
              strokeWidth: "0px",
            },
            stroke: "#ff0000",
          }}
        >
          <svg width="0" height="0">
            <linearGradient
              id="blue-gradient"
              x1="100%"
              y1="100%"
              x2="0%"
              y2="0%"
            >
              <stop stopColor="#6dd5ed" offset="0%" />
              <stop stopColor="#2193b0" offset="100%" />
            </linearGradient>
          </svg>
        </Icon>
      }
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
