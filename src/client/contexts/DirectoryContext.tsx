import { createContext, type ReactNode } from "react";

interface Props {
  path: string[];
  children: ReactNode;
}

interface ContextType {
  path: string[];
}

const DirectoryContext = createContext<ContextType>({
  path: [],
});

function DirectoryProvider({ children, path }: Props) {
  return (
    <DirectoryContext.Provider
      value={{
        path,
      }}
    >
      {children}
    </DirectoryContext.Provider>
  );
}

export { DirectoryProvider, DirectoryContext };
