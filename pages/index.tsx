import {
  Button,
  Input,
  Grid,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import { useRouter } from "next/router";

import { Layout } from "../components/Layout";

const IndexPage: React.FunctionComponent = () => {
  const router = useRouter();

  // router.push("/weights");
  const handleSubmit = (event: FormEvent) => {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    router.push("/weights");
    // alert("Logging in");
  };

  return (
    <Layout>
      <Grid maxW="min(65ch, 100%)" mx="auto" px={["4", "4", "2", "2"]} my="0">
        <Stack spacing={3} my="4" mt="8">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack align="center" direction={["column", "row"]}>
              <FormControl id="email" isRequired>
                <FormLabel>Enter Password</FormLabel>
                <Input type="password" />
                <FormHelperText>
                  Password required to access this site.
                </FormHelperText>
                <FormErrorMessage>Required</FormErrorMessage>
              </FormControl>
              <FormControl w={["100%", "25%"]}>
                <FormLabel visibility="hidden">Login</FormLabel>
                <Button
                  // mt={4}
                  width="100%"
                  colorScheme="pink"
                  isLoading={false}
                  type="submit"
                >
                  Login
                </Button>
                <FormHelperText visibility="hidden">
                  Login button
                </FormHelperText>
              </FormControl>
            </Stack>
          </form>
        </Stack>
      </Grid>
    </Layout>
  );
  // </Chakra>
};

export default IndexPage;
