import React from "react";
import { render } from "ink-testing-library";

import ScoreRecorder from "../ScoreRecorder";

const DOWN_ARROW = "\u001B[B";
const RETURN_KEY = "\r";

describe("<ScoreRecorder />", () => {
  const person = "John";
  const people = [{ name: "John" }, { name: "Ellie" }, { name: "Sarah" }];
  const onSubmit = jest.fn();
  const tree = <ScoreRecorder {...{ person, people, onSubmit }} />;
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should match initial snapshot", () => {
    const testCli = render(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Enter scores for John
      Use the Up and Down keys to seect a person, type in their scores, and then press enter when you have finished

      [48;2;255;204;153m[38;2;0;0;0mEllie: [39m[49m
      Sarah:"
    `);
  });

  it("should allow user to input scores", () => {
    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write("7");
    testCli.rerender(tree);
    testCli.stdin.write(DOWN_ARROW);
    testCli.rerender(tree);
    testCli.stdin.write("1");
    testCli.rerender(tree);
    testCli.stdin.write("0");
    testCli.rerender(tree);
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`
      "Enter scores for John
      Use the Up and Down keys to seect a person, type in their scores, and then press enter when you have finished

      Ellie: 7
      [48;2;255;204;153m[38;2;0;0;0mSarah: 10[39m[49m"
    `);
  });

  it("should submit scores on return keypress", () => {
    const testCli = render(tree);
    testCli.rerender(tree);
    testCli.stdin.write("7");
    testCli.rerender(tree);
    testCli.stdin.write(DOWN_ARROW);
    testCli.rerender(tree);
    testCli.stdin.write("1");
    testCli.rerender(tree);
    expect(onSubmit).not.toHaveBeenCalled();
    testCli.stdin.write(RETURN_KEY);
    expect(onSubmit).toHaveBeenCalledWith({
      Ellie: 7,
      Sarah: 1
    });
  });
});
