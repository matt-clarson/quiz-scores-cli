import React from "react";
import { render } from "ink-testing-library";

import NumberInput from "../NumberInput";

const BACKSPACE = String.fromCharCode(127);

describe("<NumberInput />", () => {
  it("should render correctly", () => {
    const testCli = render(
      <NumberInput label="Test Input" value={100} onChange={jest.fn()} />
    );
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`"Test Input: 100"`);
  });

  it("should render correctly when focused", () => {
    const testCli = render(
      <NumberInput label="Test Input" value={100} onChange={jest.fn()} focus />
    );
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`"[48;2;255;204;153m[38;2;0;0;0mTest Input: 100[39m[49m"`);
  });

  it("should render correctly when value is undefined", () => {
    const testCli = render(
      <NumberInput label="Test Input" onChange={jest.fn()} focus />
    );
    expect(testCli.lastFrame()).toMatchInlineSnapshot(`"[48;2;255;204;153m[38;2;0;0;0mTest Input: [39m[49m"`);
  });

  describe("input changes", () => {
    const onChange = jest.fn();
    const tree = (
      <NumberInput label="Test Input" value={100} onChange={onChange} focus />
    );

    beforeEach(() => {
      jest.resetAllMocks();
    });

    it("should not emit change when input is received but not focused", () => {
      const _onChange = jest.fn();
      const _localTree = (
        <NumberInput label="Test Input" value={100} onChange={_onChange} />
      );
      const testCli = render(_localTree);
      testCli.rerender(_localTree);
      testCli.stdin.write("1");
      expect(_onChange).not.toHaveBeenCalled();
    });

    it("should emit change when input is received", () => {
      const testCli = render(tree);
      testCli.rerender(tree);
      testCli.stdin.write("7");
      expect(onChange).toHaveBeenCalledWith("Test Input", 1007);
    });

    it("should delete from value when backspace is input", () => {
      const testCli = render(tree);
      testCli.rerender(tree);
      testCli.stdin.write(BACKSPACE);
      expect(onChange).toHaveBeenCalledWith("Test Input", 10);
    });

    it("should handle completely removing value with backspaces", () => {
      const _localTree = (
        <NumberInput label="Test Input" value={1} onChange={onChange} focus />
      );
      const testCli = render(_localTree);
      testCli.rerender(_localTree);
      testCli.stdin.write(BACKSPACE);
      expect(onChange).toHaveBeenCalledWith("Test Input", 0);
    });
  });
});
