import { useColorModeValue, Stack, Text, StackProps } from "@chakra-ui/react";
import { NextChakraLink } from "components";

// TODO: Accept stack props as {...props}

export const GraphLink: React.FunctionComponent<
  { linkURL: string } & StackProps
> = ({ linkURL, ...chakraProps }) => {
  // const weightColor = useColorModeValue("gray.100", "pink.600 ");
  // const weightBGGradient = useColorModeValue(
  //   "linear(to-br, gray.500, gray.400)",
  //   "linear(to-tl, gray.300, gray.400)"
  // );
  // const weightBorderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <NextChakraLink
      href={linkURL}
      color={useColorModeValue("gray.700", "gray.200")}
      borderRadius="0px"
      border="1px"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      _hover={{
        textDecoration: "none",
        color: useColorModeValue("pink.500", "pink.300"),
        background: useColorModeValue("gray.100", "gray.700"),
        borderColor: useColorModeValue("gray.200", "gray.700  "),
      }}
    >
      <Stack
        isInline
        spacing="0"
        px="1.5"
        py="0.5"
        align="center"
        shadow="sm"
        // borderBottomColor={weightBorderColor}
        {...chakraProps}
      >
        <Text
          fontWeight="500"
          px={0}
          textTransform="uppercase"
          letterSpacing="0.09em"
          fontSize="sm"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
        >
          Graphs
        </Text>
      </Stack>
    </NextChakraLink>
  );
};
