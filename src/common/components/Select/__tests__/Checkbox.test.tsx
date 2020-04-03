import React from "react";
import { render } from "ink-testing-library";
import Checkbox from "../Checkbox";

describe("<Checkbox />", () => {
  it.each`
    selected | value      | active   | expected
    ${false} | ${"hello"} | ${false} | ${"[] hello"}
    ${true}  | ${"hello"} | ${false} | ${"[✔] hello"}
  `(
    "should render in correct form",
    ({ selected, value, active, expected }) => {
      const testCli = render(<Checkbox {...{ selected, value, active }} />);
      expect(testCli.lastFrame()).toEqual(expected);
    }
  );

  it("should focus when active", () => {
    const testCli = render(<Checkbox selected value="hello" active />);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`"[48;2;255;204;153m[38;2;0;0;0m[✔] hello[39m[49m"`);
  });
});
