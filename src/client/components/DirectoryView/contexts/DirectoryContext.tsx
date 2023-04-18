import { createContext, type ReactNode } from "react";

interface Props {
  path: string[];
  refetch: () => void;
  children: ReactNode;
}

interface ContextType {
  path: string[];
  refetch: () => void;
}

const DirectoryContext = createContext<ContextType>({} as ContextType);

const DirectoryProvider = ({ children, path, refetch }: Props) => (
  <DirectoryContext.Provider
    value={{
      path,
      refetch,
    }}
  >
    {children}
  </DirectoryContext.Provider>
);

export { DirectoryProvider, DirectoryContext };
