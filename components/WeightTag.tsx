import { useColorModeValue, Stack, Text } from "@chakra-ui/core";

// TODO: Accept stack props as {...props}

export const WeightTag: React.FunctionComponent<{ weight: string }> = ({
  weight
}) => {
  const weightColor = useColorModeValue("gray.700", "gray.300");
  const weightBGColor = useColorModeValue("gray.200", "gray.700");
  const weightBorderColor = useColorModeValue("gray.300", "gray.600");
  const lbsColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Stack
      isInline
      spacing="0"
      borderBottom="1px"
      px="1"
      align="center"
      borderRadius="4px"
      background={weightBGColor}
      fontSize="md"
      shadow="sm"
      borderBottomColor={weightBorderColor}
    >
      <Text
        // fontSize="sm"
        fontWeight="400"
        px={0}
        fontFamily="mono"
        color={weightColor}
      >
        {weight}
      </Text>
      <Text
        fontWeight="600"
        fontFamily="heading"
        fontSize="0.7em"
        // lineHeight="2em"
        pt="0.2rem"
        align="center"
        color={lbsColor}
      >
        &#8198;lbs
      </Text>
    </Stack>
  );
};
