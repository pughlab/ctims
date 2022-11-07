import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <>
      <Head>
        <title>Welcome to web!</title>
        <link href="/assets/layout/css/blue/layout-light.css" rel="stylesheet" />
        <link id="theme-css" rel="stylesheet" type="text/css" href="assets/theme/green/theme-light.css"/>
        <link id="layout-css" rel="stylesheet" type="text/css" href="assets/layout/css/green/layout-light.css"/>
      </Head>
      <main className="app">
        <AnyComponent {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
