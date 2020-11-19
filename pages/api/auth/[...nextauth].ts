/* eslint-disable */
import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { compare } from "bcrypt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "email@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findOne({
          where: { email: credentials.email },
        });

        let test = await compare(
          credentials.password,
          user?.password as string
        );

        let result = await compare(
          credentials.password,
          user?.password as string
        );

        if (user) {
          if (result) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } else {
          return Promise.resolve(null);
        }
      },
    }),
    Providers.Email({
      server: {
        host: process.env.SMTP_HOST as string,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER as string,
          pass: process.env.SMTP_PASSWORD as string,
        },
      },
      from: process.env.SMTP_FROM,
    }),
  ],
  debug: true,
  adapter: Adapters.Prisma.Adapter({ prisma }),
  // secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
    maxAge: 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    jwt: async (
      token: any,
      user: any,
      _account: any,
      _profile: any,
      _isNewUser: any
    ) => {
      if (user) {
        token.name = user.name;
        token.user = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      return Promise.resolve(token);
    },
    session: async (session: any, user: any) => {
      return Promise.resolve({
        ...session,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user.user,
        },
      });
    },
    redirect: async (url: any, baseUrl: any) => {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
  },
  pages: {
    newUser: "/people",
    signIn: "/user/signin",
    // signOut: "/user"
    // error: "/user/signin",
  },
  // callbacks: {
  //   jwt: async (
  //     token: { user: any },
  //     user: any,
  //     account: any,
  //     profile: any,
  //     isNewUser: any
  //   ) => {
  //     //  "user" parameter is the object received from "authorize"
  //     //  "token" is being send below to "session" callback...
  //     //  ...so we set "user" param of "token" to object from "authorize"...
  //     //  ...and return it...
  //     user && (token.user = user);
  //     return Promise.resolve(token); // ...here
  //   },
  //   session: async (
  //     session: { user: any },
  //     user: { user: any },
  //     sessionToken: any
  //   ) => {
  //     //  "session" is current session object
  //     //  below we set "user" param of "session" to value received from "jwt" callback
  //     session.user = user.user;
  //     return Promise.resolve(session);
  //   },
  // },
};
