'use client'

import Login from "../components/Login";
import {Ui} from "@ctims-mono-repo/ui";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export function Index() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    // Check if we're in an iframe
    setIsIframe(window !== window.parent);

    // If we're authenticated, redirect to main page
    if (session) {
      router.push('/main');
    }
  }, [session, router]);

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
