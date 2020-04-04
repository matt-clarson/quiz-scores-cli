import { mocked } from "ts-jest/utils";
import { renderHook, act } from "@testing-library/react-hooks";
import { useInput, Key } from "ink";

import useActive from "../use-active";

jest.mock("ink", () => ({
  useInput: jest.fn()
}));

const mockUseInput = mocked(useInput, true);

const DOWN = {
  upArrow: false,
  downArrow: true,
  leftArrow: false,
  rightArrow: false,
  escape: false,
  return: false,
  ctrl: false,
  shift: false,
  meta: false
};

const UP = { ...DOWN, downArrow: false, upArrow: true };

describe("useActive()", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const array = Array(5).fill(null);

  it.each`
    name            | keyPresses                              | expected
    ${"down"}       | ${[DOWN]}                               | ${1}
    ${"multi-down"} | ${[DOWN, DOWN, DOWN, DOWN]}             | ${4}
    ${"up"}         | ${[DOWN, DOWN, UP]}                     | ${1}
    ${"underflow"}  | ${[UP]}                                 | ${0}
    ${"overflow"}   | ${[DOWN, DOWN, DOWN, DOWN, DOWN, DOWN]} | ${4}
  `(
    "should set correct active value when key presses are: $name",
    ({ keyPresses, expected }) => {
      const { result } = renderHook(() => useActive(array));
      expect(result.current).toBe(0);
      keyPresses.forEach((keyPress: Key, index: number) => {
        const [useInputCb] = mockUseInput.mock.calls[index];
        act(() => useInputCb("", keyPress));
      });
      expect(result.current).toBe(expected);
    }
  );
});
