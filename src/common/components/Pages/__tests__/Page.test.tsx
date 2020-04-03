import React, { ReactElement } from "react";
import PageContext, { Page as _Page } from "../context";
import { Box } from "ink";
import { render, Helpers } from "ink-testing-library";

import Page from "../Page";

const pageContextValue = (page: _Page) => ({
  page,
  pageState: {},
  setPage: (_: _Page) => {},
  setPageState: (_ = {}) => {},
});

describe("<Page />", () => {
  it("should render child when page path matches", () => {
    const page = "some-page";
    const testCli = render(
      <PageContext.Provider value={pageContextValue(page)}>
        <Page page={page}>
          <Box>{"Hello"}</Box>
        </Page>
      </PageContext.Provider>
    );
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`"Hello"`);
  });

  it("should not render child when page path does not match", () => {
    const page = "some-page";
    const testCli = render(
      <PageContext.Provider value={pageContextValue(page)}>
        <Page page="does-not-match">
          <Box>{"Hello"}</Box>
        </Page>
      </PageContext.Provider>
    );
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`""`);
  });
});
