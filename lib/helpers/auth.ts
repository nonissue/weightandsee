import { getSession } from "next-auth/client";

// verifies user is authenticated, and returns session
// else redirects

// doesn't work when linking to /weights from header...
// I think it's fixed if we return res! But then weights complains

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAuth: any = async (context: any) => {
  const session = await getSession(context);

  const { res } = context;

  // console.log(session);

  if (!session) {
    const prefix =
      context.req.headers.host === "localhost:3000" ? "http://" : "https://";

    res.setHeader(
      "location",
      `/user/signin?callbackUrl=${prefix}${context.req.headers.host}${context.resolvedUrl}`
    );
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return session;
};
