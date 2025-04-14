import NextAuth, { NextAuthOptions, User as NextAuthUser, JWT } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {createAction} from "@reduxjs/toolkit";
// console.log('process.env.NEXTAUTH_SECRET', process.env.NEXTAUTH_SECRET)
// console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_API_URL)
// console.log('process.env.NEXTAUTH_URL', process.env.NEXTAUTH_URL)

interface User extends NextAuthUser {
  accessToken: string;
  roles: string[];
  id: string;
  [key: string]: any;
}

interface ExtendedJWT extends JWT {
  accessToken?: string;
  roles?: string[];
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    roles?: string[];
    user?: any;
  }
  interface JWT {
    accessToken?: string;
    roles?: string[];
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({token, user}) => {
      if (user) {
        const typedUser = user as User;
        token.accessToken = typedUser.accessToken;
        token.roles = typedUser.roles;
      }
      return token;
    },
    session: async ({session, token}) => {
      const typedToken = token as JWT & {
        accessToken?: string;
        roles?: string[];
      };
      session.accessToken = typedToken.accessToken ?? '';
      session.roles = typedToken.roles ?? [];
      return session;
    }
  },
  providers: [CredentialsProvider({
    credentials: undefined,

    authorize: async (credentials: Record<string, string>) => {
      const api_url = process.env.NEXTAUTH_API_URL || 'http://localhost:3333/api';

      try {
        const response = await fetch(`${api_url}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        console.log('response', JSON.stringify(response))
        const data = await response.json();

        if (data.accessToken && data.user) {
          const user: User = {
            ...data.user,
            id: data.user.id || data.user.sub || 'default-id',
            accessToken: data.accessToken,
            roles: data.user.roles || []
          };
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      } catch (error) {
        console.log(error)
        console.log(JSON.stringify(error))
        throw new Error('Failed to authorize');
      }
    }
  })],
  secret: process.env.NEXTAUTH_SECRET || 'secret',
};

export default NextAuth(authOptions);

export const logout = createAction('auth/logout')
