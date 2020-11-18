import { FormEvent, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";
import { NextChakraLink, Layout } from "components";
import { Button, Stack, FormLabel, Input } from "@chakra-ui/core";

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
    </Layout>
  );
}
