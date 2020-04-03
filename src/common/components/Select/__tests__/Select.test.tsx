import React from "react";
import { render } from "ink-testing-library";
import Select from "../Select";

describe("Select />", () => {
  const UP_ARROW = "\u001B[A";
  const DOWN_ARROW = "\u001B[B";
  const RETURN_KEY = "\r";

  const onSelect = jest.fn();

  const tree = (
    <Select
      label="Choose a number"
      data={["one", "two", "three"]}
      onSelect={onSelect}
    />
  );

  beforeEach(() => {
    onSelect.mockReset();
  });

  it("should render correctly", () => {
    const testCli = render(tree);

    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Choose a number
      (Use Space, Up, and Down to select
      options, and press Enter to submit)
      [48;2;255;204;153m[38;2;0;0;0m[] one[39m[49m
      [] two
      [] three"
    `);
  });

  it("should focus elements based on arrow presses", () => {
    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write(DOWN_ARROW);
    testCli.rerender(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Choose a number
      (Use Space, Up, and Down to select
      options, and press Enter to submit)
      [] one
      [48;2;255;204;153m[38;2;0;0;0m[] two[39m[49m
      [] three"
    `);
    testCli.stdin.write(DOWN_ARROW);
    testCli.rerender(tree);
    testCli.stdin.write(DOWN_ARROW);
    testCli.rerender(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Choose a number
      (Use Space, Up, and Down to select
      options, and press Enter to submit)
      [] one
      [] two
      [48;2;255;204;153m[38;2;0;0;0m[] three[39m[49m"
    `);
    testCli.stdin.write(UP_ARROW);
    testCli.rerender(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Choose a number
      (Use Space, Up, and Down to select
      options, and press Enter to submit)
      [] one
      [48;2;255;204;153m[38;2;0;0;0m[] two[39m[49m
      [] three"
    `);
  });

  it("should allow toggling of options", () => {
    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write(" ");
    testCli.rerender(tree);
    testCli.stdin.write(DOWN_ARROW);
    testCli.rerender(tree);
    testCli.stdin.write(" ");
    testCli.rerender(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Choose a number
      (Use Space, Up, and Down to select
      options, and press Enter to submit)
      [✔] one
      [48;2;255;204;153m[38;2;0;0;0m[✔] two[39m[49m
      [] three"
    `);

    testCli.stdin.write(UP_ARROW);
    testCli.rerender(tree);
    testCli.stdin.write(" ");
    testCli.rerender(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Choose a number
      (Use Space, Up, and Down to select
      options, and press Enter to submit)
      [48;2;255;204;153m[38;2;0;0;0m[] one[39m[49m
      [✔] two
      [] three"
    `);
  });

  it("should submit selected items on return keypress", () => {
    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write(" ");
    testCli.rerender(tree);
    testCli.stdin.write(DOWN_ARROW);
    testCli.rerender(tree);
    testCli.stdin.write(" ");
    testCli.rerender(tree);
    expect(onSelect).not.toHaveBeenCalled();
    testCli.stdin.write(RETURN_KEY);
    expect(onSelect).toHaveBeenCalledWith(["one", "two"]);
  });
});
