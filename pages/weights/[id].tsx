import { GetServerSideProps } from "next/types";
import {
  Heading,
  Box,
  Stack,
  Divider,
  Button,
  useColorModeValue,
  ButtonGroup,
} from "@chakra-ui/core";
import { Layout } from "components";

import db from "prisma";
const prisma = db.getInstance().prisma;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await prisma.weighIn.findOne({
    where: { id: Number(params?.id) },
    include: { person: true },
  });

  return {
    props: { data: JSON.stringify(result) },
  };
};

const WeighInPage: React.FunctionComponent<{ data: string }> = ({ data }) => {
  const weighInData = JSON.parse(data);

  // const actionsBg = useColorModeValue("gray.200", "gray.700");
  // const actionsShadow = useColorModeValue("sm", "base");
  const actionDeleteBorder = useColorModeValue(
    "hsla(0, 88%, 68%, 1)",
    "hsla(0, 88%, 80%, 0.9)"
  );
  const actionEditBorder = useColorModeValue("gray.400", "gray.500");
  const dataText = useColorModeValue("black", "white");

  console.table(weighInData);

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
            // mb="2"
            alignSelf="center"
            // fontStyle="italic"
          >
            {weighInData.person.name}
          </Heading>
          <ButtonGroup
            // isInline
            isAttached
            // spacing="6"
            // background={actionsBg}
            // color={actionsColor}
            variant="outline"
            // py="1"
            // px="4"
            size="xs"
            shadow="0 1px 2px 0.25px rgba(0,0,0,0.1)"
            // p="3"

            borderRadius="6px"
          >
            <Button
              colorScheme="gray"
              size="xs"
              px="4"
              pl="4"
              py="2"
              // borderRightColor="hsla(0, 0%, 10%, 0.075)"
              // borderRightWidth="0px"
              borderColor={actionEditBorder}
              // shadow="1px 1px 15px hsla(0, 0%, 0%, 0.2)"
              borderRightColor="transparent"
              // px="4"
              // borderRadius="0"
            >
              Edit
            </Button>
            <Button
              px="4"
              borderColor={actionDeleteBorder}
              colorScheme="red"
              border="1px"
              py="2"
              size="xs"
            >
              Delete
            </Button>
          </ButtonGroup>
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
            // color="gray.600"
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