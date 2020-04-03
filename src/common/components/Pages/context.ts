import { createContext } from "react";

export type PageState = { [key: string]: any };

export type TPageContext = {
  page: string;
  pageState?: PageState;
  setPage?: (page: string) => void;
  setPageState?: (pageState?: PageState) => void;
};

export default createContext<TPageContext>({ page: "" });
