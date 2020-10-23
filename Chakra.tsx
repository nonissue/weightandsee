import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager
} from "@chakra-ui/core";
import { GetServerSidePropsContext } from "next";
import { ReactNode } from "react";
import theme from "./theme";

interface ChakraProps {
  cookies?: string;
  children: ReactNode;
}

export const Chakra: React.FunctionComponent<ChakraProps> = ({
  children,
  cookies
}: ChakraProps) => {
  return (
    <ChakraProvider
      resetCSS
      colorModeManager={
        cookies ? cookieStorageManager(cookies) : localStorageManager
      }
      theme={theme}
    >
      {children}
    </ChakraProvider>
  );
};

export type ServerSideProps<T> = { props: T } | Promise<{ props: T }>;

export function getServerSideProps({
  req
}: GetServerSidePropsContext): ServerSideProps<{ cookies?: string }> {
  return {
    props: {
      cookies: req.headers.cookie ?? ""
    }
  };
}
