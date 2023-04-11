import { useContext } from "react";
import { DirectoryContext } from "~/client/components/DirectoryView/contexts";

export const useOnSuccess = () => {
  const { refetch } = useContext(DirectoryContext);

  return refetch;
};
