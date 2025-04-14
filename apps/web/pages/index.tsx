'use client'

import Login from "../components/Login";
import {Ui} from "@ctims-mono-repo/ui";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useDispatch } from 'react-redux';
import { setIsAccessTokenSet } from "../store/slices/contextSlice";

interface ExtendedSession {
  accessToken?: string;
  user?: any;
}

export function Index() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isIframe, setIsIframe] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if we're in an iframe
    setIsIframe(window !== window.parent);

    // If we're authenticated
    if (session) {
      // Set the access token in Redux store
      const extendedSession = session as ExtendedSession;
      if (extendedSession.accessToken) {
        localStorage.setItem('ctims-accessToken', extendedSession.accessToken);
        dispatch(setIsAccessTokenSet(true));
      }
      
      // Only redirect to main page if not in iframe
      if (!isIframe) {
        router.push('/main');
      }
    }
  }, [session, router, isIframe]);

  // If we're in an iframe and not authenticated, show nothing
  if (isIframe && !session) {
    return null;
  }

  // If we're not in an iframe and not authenticated, show login
  if (!session) {
    return <Login />;
  }

  return null;
}

export default Index;
