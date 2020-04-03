import React from "react";
import { render } from "ink-testing-library";
import { PageContext } from "../common/components/Pages";

import Startup from "../Startup";

describe("<Startup />", () => {
  it("should match snapshot", () => {
    const testCli = render(<Startup />);

    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "PUB QUIZ ON TOUR
      Welcome! Press Enter to start.
      (You can exit at any time by pressing CTRL-C)"
    `);
  });

  it("should set new page when return key is pressed", () => {
    const RETURN_KEY = "\r";
    const pageContextValue = {
      page: "",
      setPage: jest.fn()
    };
    const tree = (
      <PageContext.Provider value={pageContextValue}>
        <Startup />
      </PageContext.Provider>
    );
    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write(RETURN_KEY);

    expect(pageContextValue.setPage).toHaveBeenCalledWith("people-picker");
  });
});
