import { useContext } from "react";
import PageContext, { PageState } from "./context";

type SetPageAndState = (page: string, state?: PageState) => void;
type PagesResult = {
  page: string;
  pageState?: PageState;
  setPage: SetPageAndState;
};

export const usePages = (): PagesResult => {
  const { page, setPage, pageState, setPageState } = useContext(PageContext);
  const setPageAndState: SetPageAndState = (page, state) => {
    setPage?.(page);
    setPageState?.(state);
  };
  return {
    page,
    pageState,
    setPage: setPageAndState
  };
};
