import { FormEvent, useState } from "react";
import Head from "next/head";

import { signIn } from "next-auth/client";
import { NextChakraLink, Layout } from "components";
import {
  Button,
  Stack,
  FormLabel,
  Input,
  Heading,
  useColorModeValue,
} from "@chakra-ui/core";
import { getBaseURL } from "lib/getBaseURL";

export default function Register(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseURL = getBaseURL();
  const headerColor = useColorModeValue("pink.400", "pink.200");

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
          maxW="min(65ch, 100%)"
          mx="auto"
          mt="8"
          px={["4", "4", "2", "2"]}
          spacing={5}
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
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="name"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <FormLabel htmlFor="name">Email</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <FormLabel htmlFor="name">Password</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Stack isInline>
            <Button type="submit" colorScheme="pink" w="75%">
              Register
            </Button>
            <NextChakraLink href="/" w="25%">
              <Button type="submit" w="100%" variant="outline">
                Cancel
              </Button>
            </NextChakraLink>
          </Stack>
        </Stack>
      </form>
    </Layout>
  );
}
