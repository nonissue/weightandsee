import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "next-auth/client";
import { AppProps } from "next/app";
import * as gtag from "../lib/gtag";

/* eslint-disable @typescript-eslint/ban-types */
import { Chakra } from "../Chakra";

import type { NextComponentType, NextPageContext } from "next";
import type { NextRouter } from "next/router";

import "./global.css";
import "react-datepicker/dist/react-datepicker.css";
import "./react-datepicker.css"; // can we move this elsewhere with next.js 10?

export interface AppRenderProps {
  pageProps: object;
  err?: Error;
  Component: NextComponentType<NextPageContext, AppRenderProps, object>;
  router: NextRouter;
  cookies?: string;
}

const App: React.FunctionComponent<AppRenderProps & AppProps> = ({
  Component,
  pageProps,
  cookies,
}) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider session={pageProps.session}>
      <Chakra cookies={cookies}>
        <Component {...pageProps} />
      </Chakra>
    </Provider>
  );
};

export default App;
