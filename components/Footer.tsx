import { Box, Flex, Link, Stack, useColorModeValue } from "@chakra-ui/core";
import { NextChakraLink } from "./NextChakraLink";

export const Footer: React.FunctionComponent = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      maxW="min(65ch, 100%)"
      mx="auto"
      px={["4", "4", "2", "2"]}
      textColor={textColor}
      mt="4"
    >
      <Flex fontSize="xs" mb="2" fontFamily="mono" justifyContent="center">
        nonissue inc © 2020
      </Flex>
      <Stack
        spacing={0}
        isInline
        justifyContent="center"
        alignContent="flex-end"
      >
        <Box fontSize="xs">
          <Link ml="2" fontWeight="700">
            Contact
          </Link>
        </Box>
        <Box fontSize="xs" textColor="gray.500">
          &nbsp;&nbsp;|&nbsp;&nbsp;
        </Box>
        <Box fontSize="xs">
          <NextChakraLink fontWeight="700" href="/about">
            About
          </NextChakraLink>
        </Box>
      </Stack>
    </Box>
  );
};
