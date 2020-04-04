import React from "react";
import { Box } from "ink";
import { render } from "ink-testing-library";

import WrapTextRow from "../WrapTextRow";

describe("<WrapTextRow />", () => {
  const text = "this is some text that is longer than the given width";

  it("should wrap text and place it in rows", () => {
    const testCli = render(
      <Box width={40} flexDirection="column">
        <WrapTextRow width={40} text={text} />
      </Box>
    );
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "|   this is some text that is longer   |
      |         than the given width         |"
    `);
  });

  it("should apply padding when wrpaping text", () => {
    const testCli = render(
      <Box width={40} flexDirection="column">
        <WrapTextRow width={40} text={text} padding={4} />
      </Box>
    );

    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "|       this is some text that is      |
      |      longer than the given width     |"
    `);
  });
});
