import { getSession } from "next-auth/client";
import { GetServerSideProps } from "next";

export const ensureAuthenticated: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const { res } = context;

  const prefix =
    context.req.headers.host === "localhost:3000" ? "http://" : "https://";

  if (!session) {
    res.setHeader(
      "location",
      `/user/signin?callbackUrl=${prefix}${context.req.headers.host}${context.resolvedUrl}`
    );
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {},
  };
};
