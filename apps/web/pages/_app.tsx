import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import Layout from "../components/Layout";
import { Provider } from 'react-redux'
import {store} from "../store/store";

function CustomApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <Layout>
      <Head>
        <title>CTIMS</title>
      </Head>
      <main className="app">
        <Provider store={store}>
          <AnyComponent {...pageProps} />
        </Provider>
      </main>
    </Layout>
  );
}

export default CustomApp;
