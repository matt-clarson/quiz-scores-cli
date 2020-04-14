import React from "react";
import { render } from "ink-testing-library";
import { QuizContext } from "../../Quiz";
import { PageContext } from "../../common/components/Pages";
import { wait } from "../../common/test-utils";
import Results from "../Results";

const RETURN_KEY = "\r";

describe("<Results />", () => {
  const mockFileWriter = { write: jest.fn() };
  const quizContext = {
    members: [
      { name: "John", scores: { Kate: 6, Ellie: 7 } },
      { name: "Kate", scores: { John: 8, Ellie: 7 } },
      { name: "Ellie", scores: { John: 6, Kate: 3 } }
    ],
    dispatch: jest.fn()
  };

  const pageContext = {
    page: "results",
    setPage: jest.fn(),
    setPageState: jest.fn()
  };

  const tree = (
    <QuizContext.Provider value={quizContext}>
      <PageContext.Provider value={pageContext}>
        <Results fileWriter={mockFileWriter} />
      </PageContext.Provider>
    </QuizContext.Provider>
  );

  it("should match snapshot", () => {
    const testCli = render(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Scores
      Press Enter to save the results to a file and close this app
               Kate                 20
      ========================================
               John                 20
      ========================================
              Ellie                 16
      ========================================"
    `);
  });

  it("should write results to file and move to final page", async () => {
    const filePath = "/path/to/some.file";
    mockFileWriter.write.mockImplementation(() => Promise.resolve(filePath));

    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write(RETURN_KEY);
    expect(mockFileWriter.write).toHaveBeenCalled();
    await wait(() => {
      expect(pageContext.setPage).toHaveBeenCalledWith("final");
      expect(pageContext.setPageState).toHaveBeenCalledWith({
        outputedFilePath: filePath
      });
    });
  });
});
