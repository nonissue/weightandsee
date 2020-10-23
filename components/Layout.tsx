import { Box } from "@chakra-ui/core";
import React, { ReactNode } from "react";

import { Header } from "./Header";

// import Link from 'next/link';
// import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout: React.FunctionComponent<Props> = ({ children }) => (
  <Box>
    <Header />

    {children}
  </Box>
);
