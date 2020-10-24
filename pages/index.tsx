import {
  Button,
  Input,
  Grid,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText
} from "@chakra-ui/core";
import { FormEvent } from "react";
import { useRouter } from "next/router";

import { Layout } from "../components/Layout";

const IndexPage: React.FunctionComponent = () => {
  const router = useRouter();
  // const iconColor = useColorModeValue("gray.300", "gray.500");
  // const alertBGColor = useColorModeValue("gray.100", "gray.700");
  // const alertBorderColor = useColorModeValue("gray.200", "gray.600");

  const handleSubmit = (event: FormEvent) => {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    router.push("/weights");
    // alert("Logging in");
  };

  return (
    <Layout>
      <Grid maxW="min(65ch, 100%)" mx="auto" px={["4", "4", "2", "2"]} my="0">
        <Stack spacing={3} my="4">
          <form onSubmit={e => handleSubmit(e)}>
            <FormControl id="email" isRequired>
              <FormLabel>Enter Password</FormLabel>
              <Input type="password" />
              <FormHelperText>
                Password required to access this site.
              </FormHelperText>
              <FormErrorMessage>Required</FormErrorMessage>
            </FormControl>
            <Stack align="flex-end">
              <Button
                mt={4}
                w={["100%", "20vw"]}
                colorScheme="teal"
                isLoading={false}
                type="submit"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </Grid>
    </Layout>
  );
  // </Chakra>
};

export default IndexPage;
