import {
  Button,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Layout, NextChakraLink } from "components";
import { getBaseURL } from "lib/getBaseURL";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { hash } from "bcryptjs";
import prisma from "lib/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // await ensureAuthenticated(context);
  const session = await getSession(context);

  if (!session) {
    const prefix =
      context.req.headers.host === "localhost:3000" ? "http://" : "https://";
    context.res.setHeader(
      "location",
      `/user/signin?callbackUrl=${prefix}${context.req.headers.host}${context.resolvedUrl}`
    );
    context.res.statusCode = 302;
    context.res.end();
    return { props: {} };
  }

  // findFirst instead of findUnique so we can use case insensitive filtering
  const result = await prisma.user.findFirst({
    where: {
      name: {
        equals: session?.user?.name as string,
        mode: "insensitive",
      },
    },
    // include: { weighIns: { orderBy: { weighDate: "desc" } } },
  });

  return {
    props: { data: JSON.stringify(result) },
  };
};

export const Profile: React.FunctionComponent<{ data: string }> = ({
  data,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userData: any; // TODO: Validate we have a user here

  try {
    userData = JSON.parse(data);
  } catch (error) {
    console.log(error);
  }

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);

  const baseURL = getBaseURL();
  const headerColor = useColorModeValue("pink.400", "pink.200");

  console.log(baseURL);

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    // let newPassword: string;

    const newPassword = await hash(userData.password, 10);

    console.log(newPassword);
  }

  return (
    <Layout>
      <Head>
        <title>Weight&See Register</title>
      </Head>
      <form onSubmit={handleUpdate}>
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
            Update Profile
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
};

export default Profile;
