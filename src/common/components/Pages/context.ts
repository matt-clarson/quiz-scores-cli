import { createContext } from "react";

export type Page = string;
const page: Page = "";
export type PageState = { [key: string]: any };
const pageState: PageState = {};
export type SetPage = (page: string) => void;
const setPage: SetPage = (_: string) => {};
export type SetPageState = (pageState?: PageState) => void;
const setPageState = (_?: PageState) => {};

export default createContext({
  page,
  pageState,
  setPage,
  setPageState
});
