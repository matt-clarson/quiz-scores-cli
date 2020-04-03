import React from "react";
import { render } from "ink-testing-library";
import Focusable from "../Focusable";

describe("<Focusable />", () => {
  it("should colour output when focused", () => {
    const testCli = render(<Focusable focus>{"Hello World"}</Focusable>);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`"[48;2;255;204;153m[38;2;0;0;0mHello World[39m[49m"`);
  });

  it("should not colour output when not focused", () => {
    const testCli = render(<Focusable>{"Hello World"}</Focusable>);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`"Hello World"`);
  });
});
