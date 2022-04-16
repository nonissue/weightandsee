import {
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeToggle: React.FunctionComponent = (
  props: ColorModeSwitcherProps
) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(SunIcon, MoonIcon);

  return (
    <IconButton
      size="sm"
      variant="ghost"
      color="current"
      marginLeft="1"
      // ml="0"
      onClick={toggleColorMode}
      icon={<SwitchIcon width="24px" height="24px" viewBox="0 0 24 24" />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
