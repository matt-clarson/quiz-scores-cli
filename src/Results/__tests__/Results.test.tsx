import React from "react";
import { render } from "ink-testing-library";
import { QuizContext } from "../../Quiz";
import Results from "../Results";

describe("<Results />", () => {
  const quizContext = {
    members: [
      { name: "John", scores: { Kate: 6, Ellie: 7 } },
      { name: "Kate", scores: { John: 8, Ellie: 7 } },
      { name: "Ellie", scores: { John: 6, Kate: 3 } },
    ],
    dispatch: jest.fn(),
  };

  const tree = (
    <QuizContext.Provider value={quizContext}>
      <Results />
    </QuizContext.Provider>
  );

  it("should match snapshot", () => {
    const testCli = render(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "         Kate                 20
      ========================================
               John                 20
      ========================================
              Ellie                 16
      ========================================"
    `);
  });
});
