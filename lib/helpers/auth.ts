import { getSession } from "next-auth/client";

// verifies user is authenticated, and returns session
// else redirects

export const isAuth: any = async (context: any) => {
  const session = await getSession(context);

  const { res } = context;

  const prefix =
    context.req.headers.host === "localhost:3000" ? "http://" : "https://";

  // console.log(session);

  if (!session) {
    res.setHeader(
      "location",
      `/user/signin?callbackUrl=${prefix}${context.req.headers.host}${context.resolvedUrl}`
    );
    res.statusCode = 302;
    res.end();
  }

  return session;
};
