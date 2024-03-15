import './styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from "../components/Layout";
import { Provider } from 'react-redux'
import {store} from "../store/store";
import {SessionProvider, signOut} from "next-auth/react";
import {useRouter} from "next/router";
import {useEffect} from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import process from "process";

function CustomApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  const AnyComponent = Component as any;

  const router = useRouter();

  const { error, response, loading, refreshTokenOperation } = useRefreshToken();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const accessToken = localStorage.getItem('ctims-accessToken');
        refreshTokenOperation();
        if (!accessToken) {
          // router.push('/');
          signOut({redirect: false}).then(() => {
            router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);


  return (
    <Layout>
      <Head>
        <title>CTIMS</title>
      </Head>
      <main className="app">
        <SessionProvider session={session}>
        <Provider store={store}>
          <AnyComponent {...pageProps} />
        </Provider>
        </SessionProvider>
      </main>
    </Layout>
  );
}

export default CustomApp;
