import {
  Alert,
  AlertIcon,
  Divider,
  Grid,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/core";
import { ChevronDoubleRight } from "heroicons-react";

import { Layout } from "../components/Layout";
import { NextChakraLink } from "../components/NextChakraLink";

const IndexPage: React.FunctionComponent = () => {
  const iconColor = useColorModeValue("gray.300", "gray.500");
  const alertBGColor = useColorModeValue("gray.100", "gray.700");
  const alertBorderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Layout>
      <Grid maxW="min(65ch, 100%)" mx="auto" px={["4", "4", "2", "2"]} my="0">
        <Stack spacing={3} my="4">
          <Alert
            //
            status="info"
            // variant="info"
            border="1px"
            background={alertBGColor}
            borderColor={alertBorderColor}
            shadow="sm"
            mb="5"
            borderRadius={10}
          >
            <AlertIcon />
            This project is in its infancy.
          </Alert>
          <Heading>Info</Heading>

          <Text>
            A modern starting point for web development.
            <Heading size="md" mt="4" mb="4">
              Stack
            </Heading>
            <List mt="1">
              <ListItem fontWeight="400">
                <ListIcon
                  // extract to component
                  fontWeight="300"
                  as={ChevronDoubleRight}
                  color={iconColor}
                  mb="3px"
                  verticalAlign="middle"
                />
                Next.js
              </ListItem>
              <ListItem fontWeight="400">
                <ListIcon
                  as={ChevronDoubleRight}
                  color={iconColor}
                  mb="3px"
                  verticalAlign="middle"
                  // fontSize="0.9rem"
                />
                Prisma
              </ListItem>
              <ListItem fontWeight="400">
                <ListIcon
                  as={ChevronDoubleRight}
                  color={iconColor}
                  mb="3px"
                  verticalAlign="middle"
                  // fontSize="0.9rem"
                />
                Chakra UI
              </ListItem>
              <ListItem fontWeight="400">
                <ListIcon
                  as={ChevronDoubleRight}
                  color={iconColor}
                  mb="3px"
                  verticalAlign="middle"
                  // fontSize="0.9rem"
                />
                TypeScript
              </ListItem>
            </List>
            <Heading size="md" mt="4" mb="4">
              Features
            </Heading>
            <List mt="1">
              <ListItem fontWeight="400">
                <ListIcon
                  fontWeight="300"
                  as={ChevronDoubleRight}
                  color={iconColor}
                  mb="3px"
                  verticalAlign="middle"
                />
                SSG/SSR
              </ListItem>
              <ListItem fontWeight="400">
                <ListIcon
                  as={ChevronDoubleRight}
                  color={iconColor}
                  mb="3px"
                  verticalAlign="middle"
                />
                Agnostic Data Adapter (SQLite by default)
              </ListItem>
              <ListItem fontWeight="400">
                <ListIcon
                  as={ChevronDoubleRight}
                  color={iconColor}
                  mb="3px"
                  verticalAlign="middle"
                />
                Flexible & Polished UI Framework
              </ListItem>
              <ListItem fontWeight="400">
                <ListIcon
                  as={ChevronDoubleRight}
                  color={iconColor}
                  mb="3px"
                  verticalAlign="middle"
                />
                Dark/Light Mode
              </ListItem>
              <ListItem fontWeight="400">
                <ListIcon
                  as={ChevronDoubleRight}
                  color={iconColor}
                  mb="3px"
                  verticalAlign="middle"
                />
                Serverless Functions
              </ListItem>
            </List>
          </Text>
          <Divider pt="2" />
          <Stack isInline fontFamily="mono">
            <Text>
              <NextChakraLink href="/about">Docs</NextChakraLink>
            </Text>
            <Text>•</Text>
            <Text>
              <NextChakraLink href="/about">Changelog</NextChakraLink>
            </Text>
            <Text>•</Text>
            <Text>
              <NextChakraLink href="https://github.com/nonissue/nonstarter">
                Github
              </NextChakraLink>
            </Text>
          </Stack>
        </Stack>
      </Grid>
    </Layout>
  );
  // </Chakra>
};

export default IndexPage;
