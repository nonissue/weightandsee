import { GetServerSideProps } from "next/types";
import { useRouter } from "next/router";
import {
  Heading,
  Box,
  Stack,
  Divider,
  Button,
  useColorModeValue,
  ButtonGroup,
} from "@chakra-ui/core";
// import { ensureAuthenticated } from "lib/guards/ensureAuthenticated";
import { Session } from "interfaces";
import { Layout, Confirmation } from "components";
import { isAuth } from "lib/helpers/auth";

import db from "prisma";
const prisma = db.getInstance().prisma;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // await ensureAuthenticated(context);
  const session = await isAuth(context);

  const result = await prisma.weighIn.findOne({
    where: { id: Number(context.params?.id) },
    include: { user: true },
  });

  return {
    props: { data: JSON.stringify(result), session },
  };
};

const WeighInPage: React.FunctionComponent<
  { data: string } & { session: Session }
> = ({ data, session }) => {
  const router = useRouter();
  const weighInData = JSON.parse(data);

  const showEdit = false;

  const actionDeleteBorder = useColorModeValue(
    "hsla(0, 88%, 68%, 1)",
    "hsla(0, 88%, 80%, 0.9)"
  );

  const actionEditBorder = useColorModeValue("gray.400", "gray.500");
  const dataText = useColorModeValue("black", "white");

  const confirmationCallback = async () => {
    console.log("Deleting weighIn: " + weighInData.id);

    try {
      // call delete api
      const result = await fetch(`/api/weigh-ins/${weighInData.id}`, {
        method: "DELETE",
      });
      console.log(result);
      // toast here to confirm deletion
      router.push("/weights");
    } catch (error) {
      console.log("Error deleting...");
    }
  };

  return (
    <Layout>
      <Stack
        maxW="min(65ch, 100%)"
        mx="auto"
        mt="8"
        px={["4", "4", "2", "2"]}
        spacing={4}
      >
        <Box
          display="flex"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading
            size="lg"
            fontFamily="heading"
            fontWeight="600"
            letterSpacing="1px"
            alignSelf="center"
          >
            {weighInData.user.name}
          </Heading>
          {session.user.role === "ADMIN" && (
            <ButtonGroup
              isAttached
              variant="outline"
              size="xs"
              shadow="0 1px 2px 0.25px rgba(0,0,0,0.1)"
              borderRadius="6px"
            >
              {showEdit && (
                <Button
                  colorScheme="gray"
                  size="xs"
                  px="4"
                  pl="4"
                  py="2"
                  borderColor={actionEditBorder}
                  borderRightColor="transparent"
                >
                  Edit
                </Button>
              )}
              <Confirmation
                title="Delete"
                action={confirmationCallback}
                px="4"
                description="Are you sure you want to remove this Weigh-In?"
                borderColor={actionDeleteBorder}
                colorScheme="red"
                border="1px"
                py="2"
                size="xs"
              />
            </ButtonGroup>
          )}
        </Box>
        {/* <Divider /> */}
        <Stack spacing={1} direction="column" justifyContent="space-between">
          <Divider />
          <Box
            display="flex"
            fontSize="md"
            textTransform="none"
            fontWeight="400"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box fontStyle="italic">Entry ID</Box>
            <Box fontFamily="mono" textColor={dataText}>
              {weighInData.id}
            </Box>
          </Box>
          <Divider />
          <Box
            display="flex"
            fontFamily="body"
            fontSize="md"
            textTransform="none"
            fontWeight="400"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box fontStyle="italic">Weigh Date</Box>
            <Box fontFamily="mono" textColor={dataText}>
              {weighInData.weighDate.split("T")[0]}
            </Box>
          </Box>
          <Divider />
          <Box
            display="flex"
            fontFamily="body"
            fontSize="md"
            textTransform="none"
            fontWeight="400"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box fontStyle="italic">Created</Box>
            <Box fontFamily="mono" textColor={dataText}>
              {weighInData.createdAt.split("T")[0]}&nbsp;
              {weighInData.createdAt.split("T")[1].split(".")[0]}
            </Box>
          </Box>
          <Divider />
          <Box
            display="flex"
            fontFamily="body"
            fontSize="md"
            textTransform="none"
            fontWeight="400"
            // color="gray.600"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box fontStyle="italic">Updated</Box>
            <Box fontFamily="mono" textColor={dataText}>
              {weighInData.updatedAt.split("T")[0]}&nbsp;
              {weighInData.updatedAt.split("T")[1].split(".")[0]}
            </Box>
          </Box>
          <Divider />
          <Box
            fontSize="2xl"
            fontFamily="mono"
            fontWeight="500"
            display="inline-flex"
            alignSelf="flex-end"
          >
            <Box>{weighInData.weight.toFixed(1)}</Box>
            <Box
              textColor="gray.600"
              fontWeight="400"
              fontSize="lg"
              my="auto"
              ml="1"
              fontFamily="heading"
            >
              lbs
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default WeighInPage;
