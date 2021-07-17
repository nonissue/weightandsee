import { useColorModeValue, Stack, Text, StackProps } from "@chakra-ui/react";

// TODO: Accept stack props as {...props}

export const WeightTag: React.FunctionComponent<
  { weight: number; isLink?: boolean } & StackProps
> = ({ weight, isLink, ...chakraProps }) => {
  const weightColor = useColorModeValue("gray.700", "gray.300");
  // const weightBGColor = useColorModeValue("gray.200", "gray.700");
  const weightBGHoverColor = useColorModeValue("gray.100", "gray.600");
  const weightBGBorderColor = useColorModeValue("gray.400", "gray.400");
  const weightBorderColor = useColorModeValue("gray.300", "gray.600");
  const lbsColor = useColorModeValue("gray.500", "gray.400");

  console.log(isLink);

  return (
    <Stack
      isInline
      spacing="0"
      // borderBottom="1px"
      // borderTop="1px"
      // borderTopColor="transparent"
      px="1"
      align="center"
      // borderRadius="4px"
      // background={weightBGColor}
      fontSize="sm"
      // shadow="sm"
      border="0px"
      borderColor={weightBorderColor}
      _hover={{
        background: weightBGHoverColor,
        borderColor: weightBGBorderColor,
      }}
      {...chakraProps}
    >
      <Text fontWeight="400" px={0} fontFamily="mono" color={weightColor}>
        {weight === 0 ? "000.0" : weight.toFixed(1)}
      </Text>
      <Text
        fontWeight="600"
        fontFamily="heading"
        fontSize="0.7em"
        pt="0.2rem"
        align="center"
        color={lbsColor}
      >
        &nbsp;lbs
        {/* &#8198;lbs */}
      </Text>
    </Stack>
  );
};
