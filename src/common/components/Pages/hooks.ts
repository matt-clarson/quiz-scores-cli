import { useContext } from "react";
import PageContext, { Page, PageState } from "./context";

type SetPageAndState = (page: Page, state?: PageState) => void;

export const usePages = (): [Page, PageState, SetPageAndState] => {
  const { page, setPage, pageState, setPageState } = useContext(PageContext);
  const setPageAndState: SetPageAndState = (page, state) => {
    setPage(page);
    setPageState(state);
  };
  return [page, pageState, setPageAndState];
};
