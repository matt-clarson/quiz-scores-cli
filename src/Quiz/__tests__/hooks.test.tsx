import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import Quiz from "../Quiz";

import * as hooks from "../hooks";

type WrapperProps = {
  children?: React.ReactNode;
};

describe("Quiz/hooks", () => {
  describe(".useQuiz()", () => {
    const wrapper: React.FC<WrapperProps> = ({ children }) => (
      <Quiz>{children}</Quiz>
    );

    it("should allow members to be set", () => {
      const { result } = renderHook(() => hooks.useQuiz(), { wrapper });
      expect(result.current.members).toHaveLength(0);

      const newMembers = ["a", "b", "c"];

      act(() => {
        result.current.setMembers(newMembers);
      });

      expect(result.current.members).toStrictEqual([
        { name: "a" },
        { name: "b" },
        { name: "c" }
      ]);
    });

    it("should prevent members being set twice", () => {
      const { result } = renderHook(() => hooks.useQuiz(), { wrapper });
      act(() => result.current.setMembers(["a", "b"]));
      act(() => result.current.setMembers(["a", "b", "c"]));
      expect(result.current.members).toStrictEqual([
        { name: "a" },
        { name: "b" }
      ]);
    });
  });
});
