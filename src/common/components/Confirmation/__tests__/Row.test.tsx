import React from "react";
import { Box } from "ink";
import { render } from "ink-testing-library";

import Row from "../Row";

describe("<Row />", () => {
  it("should render centered content with pipe border", () => {
    const testCli = render(
      <Box width={40}>
        <Row>{"hello"}</Row>
      </Box>
    );
    expect(testCli.lastFrame()).toMatchInlineSnapshot(
      `"|                 hello                |"`
    );
  });

  it("should apply margin top as empty rows above content", () => {
    const testCli = render(
      <Box width={40} flexDirection="column">
        <Row marginTop={2}>{"hello"}</Row>
      </Box>
    );
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "|                                      |
      |                                      |
      |                 hello                |"
    `);
  });

  it("should apply margin bottom as empty rows below content", () => {
    const testCli = render(
      <Box width={40} flexDirection="column">
        <Row marginBottom={2}>{"hello"}</Row>
      </Box>
    );
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "|                 hello                |
      |                                      |
      |                                      |"
    `);
  });

  it("should apply margin top and bottom", () => {
    const testCli = render(
      <Box width={40} flexDirection="column">
        <Row marginTop={2} marginBottom={3}>
          {"hello"}
        </Row>
      </Box>
    );
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "|                                      |
      |                                      |
      |                 hello                |
      |                                      |
      |                                      |
      |                                      |"
    `);
  });
});
