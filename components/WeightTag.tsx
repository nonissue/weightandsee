import { useColorModeValue, Stack, Text, StackProps } from "@chakra-ui/react";
import { NextChakraLink } from "./NextChakraLink";
// TODO: Accept stack props as {...props}

// const padIntStart = (toPad: any, targetLength: number, padString: string) => {
//   return `${toPad > 0 ? "+" : "-"}${Math.abs(toPad)
//     .toString()
//     .padStart(targetLength, padString)}`;
// };

export const WeightTag: React.FunctionComponent<
  { weight: number; weighInId: number } & StackProps
> = ({ weight, weighInId, ...chakraProps }) => {
  const weightColor = useColorModeValue("gray.700", "gray.300");
  const weightBGColor = useColorModeValue("gray.200", "gray.700");
  const weightBorderColor = useColorModeValue("gray.300", "gray.600");
  const lbsColor = useColorModeValue("gray.500", "gray.400");

  return (
    <NextChakraLink href={`/weights/${weighInId}`}>
      <Stack
        isInline
        spacing="0"
        borderBottom="1px"
        px="1"
        ml="4"
        align="center"
        borderRadius="4px"
        background={weightBGColor}
        fontSize="md"
        shadow="sm"
        borderBottomColor={weightBorderColor}
        {...chakraProps}
      >
        <Text fontWeight="400" px={0} fontFamily="mono" color={weightColor}>
          {/* {padIntStart(weight.toFixed(2), 0, " ")} */}
          {weight.toFixed(1)}
        </Text>
        <Text
          fontWeight="600"
          fontFamily="heading"
          fontSize="0.7em"
          pt="0.2rem"
          align="center"
          color={lbsColor}
        >
          &#8198;lbs
        </Text>
      </Stack>
    </NextChakraLink>
  );
};
