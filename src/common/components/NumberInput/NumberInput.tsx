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
const deleteFromNumber = (n?: number): number => {
  if (n === undefined || n < 10) return 0;
  else {
    const stringN = n.toString();
    return parseInt(stringN.slice(0, stringN.length - 1));
  }
};

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
    } else if (isBackspace(input)) {
      onChange(label, deleteFromNumber(value));
    }
  });
  return <Focusable focus={focus}>{`${label}: ${value ?? ""}`}</Focusable>;
};

export default NumberInput;
