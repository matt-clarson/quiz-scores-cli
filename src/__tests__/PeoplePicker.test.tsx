import React from "react";
import { render } from "ink-testing-library";
import { PageContext } from "../common/components/Pages";
import { QuizContext } from "../Quiz";

import PeoplePicker from "../PeoplePicker";

describe("<PeoplePicker />", () => {
  const quizContext = {
    members: [],
    dispatch: jest.fn()
  };

  const pageContext = {
    page: "people-picker",
    setPage: jest.fn(),
    setPageState: jest.fn()
  };

  const people = ["Kate", "Ellie", "Mark"];

  const tree = (
    <QuizContext.Provider value={quizContext}>
      <PageContext.Provider value={pageContext}>
        <PeoplePicker people={people} />
      </PageContext.Provider>
    </QuizContext.Provider>
  );

  const DOWN_ARROW = "\u001B[B";
  const RETURN_KEY = "\r";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render select with people as options", () => {
    const testCli = render(tree);
    testCli.rerender(tree);

    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Select quiz members
      (Use Space, Up, and Down to select
      options, and press Enter to submit)
      [48;2;255;204;153m[38;2;0;0;0m[] Kate[39m[49m
      [] Ellie
      [] Mark"
    `);
  });

  describe("onSelect handler", () => {
    const selectAndReturn = () => {
      const testCli = render(tree);
      testCli.rerender(tree);
      testCli.stdin.write(" ");
      testCli.rerender(tree);
      testCli.stdin.write(DOWN_ARROW);
      testCli.rerender(tree);
      testCli.stdin.write(DOWN_ARROW);
      testCli.rerender(tree);
      testCli.stdin.write(" ");
      testCli.rerender(tree);
      testCli.stdin.write(RETURN_KEY);
    };

    it("should set correct page state on return key press", () => {
      selectAndReturn();

      expect(pageContext.setPage).toHaveBeenCalledWith("confirmation");
      expect(pageContext.setPageState).toHaveBeenCalledTimes(1);
      expect(pageContext.setPageState.mock.calls[0][0].message).toEqual(
        "You have selected: Kate, Mark"
      );
    });

    it("should pass correct cancel function to confirmation page state", () => {
      selectAndReturn();
      const { cancelFn } = pageContext.setPageState.mock.calls[0][0];
      cancelFn();
      expect(pageContext.setPage).toHaveBeenCalledWith("people-picker");
    });

    it("should pass correct accept function to confirmation page state", () => {
      selectAndReturn();
      const { acceptFn } = pageContext.setPageState.mock.calls[0][0];
      acceptFn();
      expect(pageContext.setPage).toHaveBeenCalledWith("scores");
      expect(quizContext.dispatch).toHaveBeenCalledWith({
        type: "SET_MEMBERS",
        members: ["Kate", "Mark"]
      });
    });
  });
});
