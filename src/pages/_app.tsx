import { type AppType } from "next/app";
import Head from "next/head";
import { api } from "~/client/api";
import { mainFont } from "~/client/fonts";
import "~/client/styles/globals.css";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Filerly</title>
        <meta name="description" content="Filerly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={mainFont.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default api.withTRPC(App);
