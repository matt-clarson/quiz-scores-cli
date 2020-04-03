import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Color } from "ink";

const FocusableProps = {
  children: PropTypes.node,
  focus: PropTypes.bool
};

const Focusable = ({ focus, children }: InferProps<typeof FocusableProps>) => (
  <>
    {focus ? (
      <Color hex="#000000" bgHex="#ffcc99">
        {children}
      </Color>
    ) : (
      children
    )}
  </>
);

Focusable.propTypes = FocusableProps;

export default Focusable;
