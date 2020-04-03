import React, { useEffect } from "react";
import { Box } from "ink";
import { render } from "ink-testing-library";

import { Pages, Page, usePages } from "../";

describe("<Pages />", () => {
  const Page1 = () => {
    const { setPage } = usePages();
    useEffect(() => {
      setPage("p2");
    }, []);
    return <Box>{"Page 1"}</Box>;
  };

  const Page2 = () => {
    const { page, setPage } = usePages();
    useEffect(() => {
      setPage("p3", { message: "hello world" });
    }, []);
    return <Box>{`You are at page: ${page}`}</Box>;
  };

  const Page3 = () => {
    const { pageState } = usePages();
    return <Box>{`Message is ${pageState?.message ?? "uh"}`}</Box>;
  };

  const TestApp = () => (
    <Pages>
      <Page page="">
        <Page1 />
      </Page>

      <Page page="p2">
        <Page2 />
      </Page>

      <Page page="p3">
        <Page3 />
      </Page>
    </Pages>
  );

  it("should cycle through pages correctly", () => {
    const testCli = render(<TestApp />);
    testCli.rerender(<TestApp />);
    testCli.rerender(<TestApp />);

    expect(testCli.frames).toMatchInlineSnapshot(`
      Array [
        "Page 1",
        "You are at page: p2",
        "Message is hello world",
      ]
    `);
  });
});
