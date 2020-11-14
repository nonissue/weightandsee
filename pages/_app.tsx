import { useEffect } from "react";
import { useRouter } from "next/router";
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

const App: React.FunctionComponent<AppRenderProps> = ({
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
    <Chakra cookies={cookies}>
      <Component {...pageProps} />
    </Chakra>
  );
};

export default App;
