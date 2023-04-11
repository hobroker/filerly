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

function DirectoryProvider({ children, path, refetch }: Props) {
  return (
    <DirectoryContext.Provider
      value={{
        path,
        refetch,
      }}
    >
      {children}
    </DirectoryContext.Provider>
  );
}

export { DirectoryProvider, DirectoryContext };
