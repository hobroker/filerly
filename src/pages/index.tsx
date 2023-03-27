import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({
    text: "from tRPC",
  });

  return (
    <>
      <main>
        <p>{hello.data ? hello.data.greeting : "Loading tRPC query..."}</p>
      </main>
    </>
  );
};

export default Home;
