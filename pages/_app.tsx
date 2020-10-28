/* eslint-disable @typescript-eslint/ban-types */
import { Chakra } from '../Chakra';

import type { NextComponentType, NextPageContext } from 'next';
import type { NextRouter } from 'next/router';

import './react-datepicker.css'; // can we move this elsewhere with next.js 10?

export interface AppRenderProps {
  pageProps: object;
  err?: Error;
  Component: NextComponentType<NextPageContext, AppRenderProps, object>;
  router: NextRouter;
  cookies?: string;
}

const App: React.FunctionComponent<AppRenderProps> = ({ Component, pageProps, cookies }) => {
  return (
    <Chakra cookies={cookies}>
      <Component {...pageProps} />
    </Chakra>
  );
}

export default App;