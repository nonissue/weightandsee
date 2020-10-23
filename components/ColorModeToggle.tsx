import {
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/core";
import { Moon, Sun } from "heroicons-react";

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
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon width="20px" height="20px" viewBox="0 0 20 20" />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
