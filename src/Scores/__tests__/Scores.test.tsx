import React from "react";
import { render } from "ink-testing-library";
import { PageContext } from "../../common/components/Pages";
import { QuizContext } from "../../Quiz";

import Scores from "../Scores";

const DOWN_ARROW = "\u001B[B";
const RETURN_KEY = "\r";

describe("<Scores />", () => {
  const quizContext = {
    members: [{ name: "John" }, { name: "Kate" }, { name: "Ellie" }],
    dispatch: jest.fn()
  };

  const pageContext = {
    page: "scores",
    setPage: jest.fn(),
    setPageState: jest.fn()
  };

  const tree = (
    <QuizContext.Provider value={quizContext}>
      <PageContext.Provider value={pageContext}>
        <Scores />
      </PageContext.Provider>
    </QuizContext.Provider>
  );

  beforeEach(() => {
    jest.resetAllMocks();
    Object.assign(pageContext, { page: "scores", pageState: undefined });
  });

  it("should match initial snapshot", () => {
    const testCli = render(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Enter scores for John
      Use the Up and Down keys to seect a person, type in their scores, and then press enter when you have finished

      [48;2;255;204;153m[38;2;0;0;0mKate: [39m[49m
      Ellie:"
    `);
  });

  it("should match snapshot when current `person` is set in page state", () => {
    Object.assign(pageContext, { pageState: { person: "Kate" } });
    const testCli = render(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Enter scores for Kate
      Use the Up and Down keys to seect a person, type in their scores, and then press enter when you have finished

      [48;2;255;204;153m[38;2;0;0;0mJohn: [39m[49m
      Ellie:"
    `);
  });

  it("should present each persons scores for confirmation", () => {
    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write("6");
    testCli.rerender(tree);
    testCli.stdin.write(DOWN_ARROW);
    testCli.rerender(tree);
    testCli.stdin.write("5");
    testCli.rerender(tree);
    testCli.stdin.write(RETURN_KEY);
    expect(pageContext.setPage).toHaveBeenCalledWith("confirmation");
    expect(pageContext.setPageState).toHaveBeenCalledTimes(1);
    expect(
      pageContext.setPageState.mock.calls[0][0].message
    ).toMatchInlineSnapshot(`"Scores entered: Kate - 6; Ellie - 5"`);
  });

  it("should notify unentered scores", () => {
    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write(RETURN_KEY);
    expect(
      pageContext.setPageState.mock.calls[0][0].message
    ).toMatchInlineSnapshot(
      `"Scores entered: Kate - NOT-ENTERED; Ellie - NOT-ENTERED"`
    );
  });

  it("should provide a cancel function that returns to scores page", () => {
    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write(RETURN_KEY);
    const { cancelFn } = pageContext.setPageState.mock.calls[0][0];
    cancelFn();
    expect(pageContext.setPage).toHaveBeenCalledTimes(2);
    expect(pageContext.setPage).toHaveBeenCalledWith("scores");
    expect(pageContext.setPageState).toHaveBeenCalledTimes(2);
    expect(pageContext.setPageState).toHaveBeenCalledWith({ person: "John" });
  });

  it("should provide an accept function that returns to scores page for next person", () => {
    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write(RETURN_KEY);
    const { acceptFn } = pageContext.setPageState.mock.calls[0][0];
    acceptFn();
    expect(pageContext.setPage).toHaveBeenCalledTimes(2);
    expect(pageContext.setPage).toHaveBeenCalledWith("scores");
    expect(pageContext.setPageState).toHaveBeenCalledTimes(2);
    expect(pageContext.setPageState).toHaveBeenCalledWith({ person: "Kate" });
  });

  it("should provide an accept function that moves to `results` page if all scores are submitted", () => {
    Object.assign(quizContext, {
      members: [
        { name: "John", scores: { Kate: 5, Ellie: 8 } },
        { name: "Kate", scores: { John: 9, Ellie: 5 } },
        { name: "Ellie" }
      ]
    });
    Object.assign(pageContext, { pageState: { person: "Ellie" } });

    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write("6");
    testCli.rerender(tree);
    testCli.stdin.write(DOWN_ARROW);
    testCli.rerender(tree);
    testCli.stdin.write("5");
    testCli.rerender(tree);
    testCli.stdin.write(RETURN_KEY);
    const { acceptFn } = pageContext.setPageState.mock.calls[0][0];
    acceptFn();
    expect(pageContext.setPage).toHaveBeenCalledWith("results");
  });
});
