import { createContext, useContext } from "react";

export type GlobalLoadingContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const GlobalLoadingContext = createContext<GlobalLoadingContextType>({
  loading: false,
  setLoading: () => {},
});

export const useGlobalLoading = () => useContext(GlobalLoadingContext);

export default GlobalLoadingContext;
