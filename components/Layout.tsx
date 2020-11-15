import { Box } from "@chakra-ui/core";
import React, { ReactNode } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";

// import Link from 'next/link';
// import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout: React.FunctionComponent<Props> = ({ children }) => (
  // <Grid gridTemplateRows="1fr auto" minHeight="100%" height="100vh">
  // <Box display="flex" minHeight="100vh" flexDirection="column">
  <Box minHeight="100vh" display="flex" flexDirection="column">
    <Header />

    <Box flex="1" height="100%">
      {children}
    </Box>

    <Footer />
  </Box>
);
