import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Focusable } from "../Focusable";

const CheckboxProps = {
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired,
  active: PropTypes.bool
};

const Checkbox = ({
  selected,
  value,
  active
}: InferProps<typeof CheckboxProps>) => {
  const checkboxString = `[${selected ? "✔" : ""}] ${value}`;
  return <Focusable focus={active}>{checkboxString}</Focusable>;
};

Checkbox.propTypes = CheckboxProps;

export default Checkbox;
