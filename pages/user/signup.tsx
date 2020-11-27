import { FormEvent, useState } from "react";
import Head from "next/head";

import { signIn } from "next-auth/client";
import { Layout } from "components";
import {
  Button,
  Stack,
  FormLabel,
  Input,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { getBaseURL } from "lib/getBaseURL";

export default function Register(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseURL = getBaseURL();
  const headerColor = useColorModeValue("pink.400", "pink.200");
  const formBorderColor = useColorModeValue("gray.200", "gray.700");

  console.log(baseURL);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: `${baseURL}/people`,
      });

      // router.push("/people");
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Weight&See Register</title>
      </Head>{" "}
      {/* <Box> */}
      <form onSubmit={handleRegister}>
        <Stack
          maxW="min(40ch, 100%)"
          mx="auto"
          mt="8"
          border={["0px", "1px"]}
          // border="1px"
          // background="gray.700"
          borderRadius={["0px", "6px"]}
          borderColor={[formBorderColor, formBorderColor]}
          // p="8"
          p={["4", "4", "4", "4"]}
          spacing={3}
        >
          <Heading
            size="xl"
            fontWeight="725"
            color={headerColor}
            mb="2"
            style={{
              fontVariationSettings: `'MONO' 0, 'CRSV' 1, 'CASL' 0.15, 'slnt' 0`,
            }}
          >
            Sign Up
          </Heading>
          <div>
            <FormLabel htmlFor="name" mb="1">
              Name
            </FormLabel>
            <Input
              type="name"
              name="name"
              id="name"
              value={name}
              // background="gray.600"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <FormLabel htmlFor="name" mb="1">
              Email
            </FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <FormLabel htmlFor="name" mb="1">
              Password
            </FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* <Flex w="100%" justifyContent="center"> */}
          <div>
            <Button type="submit" colorScheme="pink" mt="3" w="100%">
              Sign Up
            </Button>
          </div>
          {/* </Flex> */}
        </Stack>
      </form>
    </Layout>
  );
}
