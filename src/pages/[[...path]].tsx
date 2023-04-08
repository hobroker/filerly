import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { DirectoryView } from "~/client/components/DirectoryView";

type Params = {
  path: string[];
};

const BrowsePage: NextPage<Params> = ({ path }) => {
  if (!path) return null;

  return <DirectoryView path={path} />;
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
