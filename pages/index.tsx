import {
  Alert,
  AlertIcon,
  Button,
  Input,
  Grid,
  Stack,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText
} from "@chakra-ui/core";

import { Layout } from "../components/Layout";

const IndexPage: React.FunctionComponent = () => {
  // const iconColor = useColorModeValue("gray.300", "gray.500");
  const alertBGColor = useColorModeValue("gray.100", "gray.700");
  const alertBorderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Layout>
      <Grid maxW="min(65ch, 100%)" mx="auto" px={["4", "4", "2", "2"]} my="0">
        <Stack spacing={3} my="4">
          {/* <Alert
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
            Authentication is required.
          </Alert> */}
          <form>
            <FormControl id="email" isRequired>
              <FormLabel>Enter Password</FormLabel>
              <Input type="password" />
              <FormHelperText>
                Password required to access this site.
              </FormHelperText>
              <FormErrorMessage>Required</FormErrorMessage>
            </FormControl>

            <Button mt={4} colorScheme="teal" isLoading={false} type="submit">
              Login
            </Button>
          </form>
        </Stack>
      </Grid>
    </Layout>
  );
  // </Chakra>
};

export default IndexPage;
