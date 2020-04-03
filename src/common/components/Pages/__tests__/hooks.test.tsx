import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import Pages from "../Pages";

import * as hooks from "../hooks";

type WrapperProps = {
  children?: React.ReactNode;
};

describe("Pages/hooks", () => {
  describe(".usePages()", () => {
    const wrapper = ({ children }: WrapperProps) => <Pages>{children}</Pages>;

    it("should expose page and page state", () => {
      const { result } = renderHook(() => hooks.usePages(), { wrapper });
      const { page, pageState } = result.current;

      expect(page).toBe("");
      expect(pageState).toBe(undefined);
    });

    it("should allow updating page and page state", () => {
      const { result } = renderHook(() => hooks.usePages(), { wrapper });
      const newPage = "some-page";
      const newPageState = { some: "object" };

      act(() => {
        result.current.setPage(newPage, newPageState);
      });

      expect(result.current.page).toBe(newPage);
      expect(result.current.pageState).toStrictEqual(newPageState);
    });
  });
});
