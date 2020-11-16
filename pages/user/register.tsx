import { FormEvent, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import { NextChakraLink, Layout } from "components";
import {
  Button,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/core";

//http://localhost:3000/api/auth/error?error=Error%3A%20%0AInvalid%20%60prisma.user.findOne()%60%20invocation%20in%0Awebpack-internal%3A%2F%2F%2F.%2Fpages%2Fapi%2Fauth%2F%5B...nextauth%5D.ts%3A52%3A38%0A%0A%7B%0A%20%20where%3A%20%7B%0A%3F%20%20%20email%3F%3A%20String%2C%0A%3F%20%20%20id%3F%3A%20Int%0A%20%20%7D%0A%7D%0A%0AArgument%20where%20of%20type%20UserWhereUniqueInput%20needs%20at%20least%20one%20argument.%20Available%20args%20are%20listed%20in%20green.%0A%0ANote%3A%20Lines%20with%20%3F%20are%20optional.%0A
// import axios from "axios";

// import { Button, Container } from "../styles/pages/Home";

export default function Register(): JSX.Element {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      signIn("credentials", {
        email: email,
        password: password,
      });
      router.push("/people");
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Next + Prisma</title>
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
      {/* </Box> */}
    </Layout>
  );
}
