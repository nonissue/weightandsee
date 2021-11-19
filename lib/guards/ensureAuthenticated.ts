import { getSession } from "next-auth/client";
import { GetServerSideProps } from "next";

export const ensureAuthenticated: GetServerSideProps = async (context) => {
  console.log("ensureAuth hit");

  const session = await getSession(context);

  console.log("session: ");
  console.log(session);

  // const { res } = context;

  const prefix =
    context.req.headers.host === "localhost:3000" ? "http://" : "https://";

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `/user/signin?callbackUrl=${prefix}${context.req.headers.host}${context.resolvedUrl}`,
      },
    };
    // console.log("no session found!");
    // console.log(
    //   `/user/signin?callbackUrl=${prefix}${context.req.headers.host}${context.resolvedUrl}`
    // );
    // res.setHeader(
    //   "location",
    //   `/user/signin?callbackUrl=${prefix}${context.req.headers.host}${context.resolvedUrl}`
    // );

    // res.statusCode = 302;
    // res.end();
  }

  return {
    props: {},
  };
};
