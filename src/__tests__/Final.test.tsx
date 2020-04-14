import React from "react";
import { render } from "ink-testing-library";
import { PageContext } from "../common/components/Pages";

import Final from "../Final";

describe("<Final />", () => {
  const exit = jest.fn();
  const pageContext = {
    page: "final",
    pageState: { outputedFilePath: "/path/to/some.file" },
    setPage: jest.fn(),
    setPageState: jest.fn()
  };

  const tree = (
    <PageContext.Provider value={pageContext}>
      <Final exit={exit} />
    </PageContext.Provider>
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should match initial snapshot", () => {
    jest.doMock("ink", () => ({ useApp: jest.fn() }));
    const testCli = render(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Quiz results have been saved to: /path/to/some.file
      Closing in 5"
    `);
  });
});
