import React from "react";
import { useInput } from "ink";
import { Focusable } from "../Focusable";

type NumberInputProps = {
  label: string;
  value?: number;
  onChange: (label: string, value?: number) => void;
  focus?: boolean;
};

const DIGIT = /^\d$/;
const isBackspace = (character: string) => character.charCodeAt(0) === 127;

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  focus
}) => {
  useInput(input => {
    if (!focus) return;

    if (input.match(DIGIT)) {
      onChange(label, parseInt(`${value ?? ""}${input}`));
    } else if (isBackspace(input) && value === undefined) {
      onChange(label, value);
    } else if (isBackspace(input) && value !== undefined) {
      const vString = value.toString();
      onChange(label, parseInt(vString.slice(0, vString.length - 1)));
    }
  });
  return <Focusable focus={focus}>{`${label}: ${value ?? ""}`}</Focusable>;
};

export default NumberInput;
