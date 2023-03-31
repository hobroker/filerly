import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { DirectoryView } from "~/components/DirectoryView";
import { DirectoryProvider } from "~/contexts/DirectoryContext";

type Params = {
  path: string[];
};

const BrowsePage: NextPage<Params> = ({ path }) => {
  return (
    <>
      <main>
        <DirectoryProvider path={path}>
          <DirectoryView />
        </DirectoryProvider>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<Params> = (context) => {
  const path = context.params?.path;
  return {
    props: { path: path ? (Array.isArray(path) ? path : [path]) : [] },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  return {
    paths: [{ params: { path: [] } }],
    fallback: true,
  };
};

export default BrowsePage;
