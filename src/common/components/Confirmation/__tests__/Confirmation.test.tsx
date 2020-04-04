import React from "react";
import { render } from "ink-testing-library";
import { PageContext } from "../../Pages";

import Confirmation from "../Confirmation";

describe("<Confirmation />", () => {
  const pageContext = {
    page: "",
    pageState: {
      message: "some message",
      acceptFn: jest.fn(),
      cancelFn: jest.fn()
    }
  };

  const tree = (
    <PageContext.Provider value={pageContext}>
      <Confirmation />
    </PageContext.Provider>
  );

  const LEFT_ARROW = "\u001B[D";
  const RETURN_KEY = "\r";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    const testCli = render(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "==================================================
      |                                                |
      |                  Are you sure?                 |
      |     (Use Enter, Left, and Right to choose)     |
      |                                                |
      |                  some message                  |
      |                                                |
      |                  [48;2;255;204;153m[38;2;0;0;0m[Yes][39m[49m   [No]                  |
      |                                                |
      =================================================="
    `);
  });

  it('should trigger cancel function when "no" is selected', () => {
    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write(LEFT_ARROW);
    testCli.rerender(tree);
    expect(pageContext.pageState.cancelFn).not.toHaveBeenCalled();
    testCli.stdin.write(RETURN_KEY);
    expect(pageContext.pageState.cancelFn).toHaveBeenCalledTimes(1);
  });

  it('should trigger accept function when "yes" is selected', () => {
    const testCli = render(tree);
    testCli.rerender(tree);
    expect(pageContext.pageState.acceptFn).not.toHaveBeenCalled();
    testCli.stdin.write(RETURN_KEY);
    expect(pageContext.pageState.acceptFn).toHaveBeenCalledTimes(1);
  });
});
