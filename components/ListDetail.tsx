import * as React from "react";

import { User } from "../interfaces";

import { Heading, Text, Stack, Divider } from "@chakra-ui/core";
import { NextChakraLink } from "./NextChakraLink";

type ListDetailProps = {
  item: User;
};

const ListDetail: React.FunctionComponent<ListDetailProps> = ({
  item: user
}) => (
  <Stack spacing={3}>
    <Heading size="lg" fontFamily="body" fontWeight="700">
      {user.name}
    </Heading>
    <Divider borderColor="gray.400" borderWidth="2px" />
    <Text fontFamily="mono">
      <b>ID:</b> {user.id} &nbsp; <b>Role:</b> Admin
    </Text>
    <Divider borderColor="gray.400" />
    <NextChakraLink href="/users">← Back to Users List</NextChakraLink>
  </Stack>
);

export default ListDetail;
