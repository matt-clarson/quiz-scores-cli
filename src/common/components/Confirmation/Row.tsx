import React from "react";
import { Box } from "ink";

type RowProps = {
  children?: React.ReactNode;
  marginTop?: number;
  marginBottom?: number;
};

const Row: React.FC<RowProps> = ({
  children,
  marginTop = 0,
  marginBottom = 0
}) => (
  <>
    {Array(marginTop)
      .fill(null)
      .map((_, key) => (
        <Row {...{ key }} />
      ))}
    <Box width="100%" justifyContent="space-between">
      <Box>{"|"}</Box>
      <Box>{children}</Box>
      <Box>{"|"}</Box>
    </Box>
    {Array(marginBottom)
      .fill(null)
      .map((_, key) => (
        <Row {...{ key }} />
      ))}
  </>
);

export default Row;
