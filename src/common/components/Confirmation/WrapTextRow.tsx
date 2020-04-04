import React from "react";
import Row from "./Row";
import { wrapText } from "../../utils";

type WrapTextRowProps = {
  width: number;
  text: string;
  padding?: number;
};

const WrapTextRow: React.FC<WrapTextRowProps> = ({
  width,
  text,
  padding = 1
}) => {
  const _width = width - 2;
  const lines = wrapText(text, _width, padding);
  return (
    <>
      {lines.map(line => (
        <Row key={line}>{line}</Row>
      ))}
    </>
  );
};

export default WrapTextRow;
