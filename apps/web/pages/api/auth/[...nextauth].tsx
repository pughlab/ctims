import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {createAction} from "@reduxjs/toolkit";
import { env } from 'next-runtime-env';

console.log('process.env.NEXTAUTH_SECRET', process.env.NEXTAUTH_SECRET)
console.log('process.env.REACT_APP_API_URL', process.env.REACT_APP_API_URL)
console.log('process.env.NEXTAUTH_URL', process.env.NEXTAUTH_URL)
const myPingTime = env('NEXT_PUBLIC_TRIAL_LOCK_PING_TIME');
console.log('process.env.NEXT_PUBLIC_TRIAL_LOCK_PING_TIME', myPingTime)

export default NextAuth({
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({token, user, account, profile, isNewUser}) => {
      // console.log('jwt', token, user, account, profile, isNewUser);
      if (user) {
        token.accessToken = user['accessToken'];
        token.roles = user['roles'];
      }
      return token
    },
    session: async ({session, token, user}) => {
      // console.log('session', session, token, user);
      session['accessToken'] = token.accessToken
      session['roles'] = token.roles
      return session
    }
  },
  providers: [CredentialsProvider({
    credentials: undefined,

    authorize: async  (credentials: any) => {
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
          data.user.accessToken = data.accessToken;
          data.user['roles'] = data.user.roles;
          return data.user
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
});

export const logout = createAction('auth/logout')
