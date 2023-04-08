import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/client/styles/globals.css";
import Head from "next/head";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Filerly</title>
        <meta name="description" content="Filerly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(App);
