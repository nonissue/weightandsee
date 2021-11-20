import { Box } from "@chakra-ui/react";
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
  <Box>
    <Header />

    {children}

    <Footer />
  </Box>
);
