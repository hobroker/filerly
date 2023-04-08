import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/client/styles/globals.css";
import Head from "next/head";
import { Roboto_Mono } from "next/font/google";

const font = Roboto_Mono({
  display: "swap",
  weight: ["400", "600", "700"],
  subsets: ["latin", "cyrillic"],
});

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Filerly</title>
        <meta name="description" content="Filerly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default api.withTRPC(App);
