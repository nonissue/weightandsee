import { useColorModeValue, Stack, Text, StackProps } from "@chakra-ui/react";
import { NextChakraLink } from "./NextChakraLink";
// TODO: Accept stack props as {...props}

// const padIntStart = (toPad: any, targetLength: number, padString: string) => {
//   return `${toPad > 0 ? "+" : "-"}${Math.abs(toPad)
//     .toString()
//     .padStart(targetLength, padString)}`;
// };

export const WeightTag: React.FunctionComponent<
  { weight: number; weighInId?: number } & StackProps
> = ({ weight, weighInId, ...chakraProps }) => {
  const weightColor = useColorModeValue("gray.700", "gray.300");
  const weightBGColor = useColorModeValue("gray.200", "gray.700");
  const weightBorderColor = useColorModeValue("gray.300", "gray.600");
  const lbsColor = useColorModeValue("gray.500", "gray.400");

  return (
    <NextChakraLink
      href={`${weighInId ? "/weights/" + weighInId : "#"}`}
      _hover={{ textDecoration: "none" }}
    >
      <Stack
        isInline
        spacing="0"
        borderBottom="1px"
        px="2"
        ml="1"
        align="left"
        borderRadius="4px"
        background={weightBGColor}
        fontSize="md"
        shadow="sm"
        borderBottomColor={weightBorderColor}
        fontFamily="Red Hat Mono"
        color={weightColor}
        _hover={{ opacity: 0.7 }}
        {...chakraProps}
      >
        <Text px={0} fontWeight="500" letterSpacing={"-0.03em"}>
          {/* {padIntStart(weight.toFixed(2), 0, " ")} */}
          {weight.toFixed(1)}
        </Text>
        <Text
          fontWeight="600"
          fontFamily="Red Hat Mono"
          fontSize="0.7em"
          pt="0.4em"
          pl="3px"
          align="center"
          color={lbsColor}
        >
          {/* &#8198; */}
          lbs
        </Text>
      </Stack>
    </NextChakraLink>
  );
};
