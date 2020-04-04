import React, { useState } from "react";
import { Box, useInput } from "ink";
import Row from "./Row";
import WrapTextRow from "./WrapTextRow";
import { Focusable } from "../Focusable";
import { usePages } from "../Pages";

const Confirmation: React.FC = () => {
  const { pageState } = usePages();
  const [accept, setAccept] = useState(true);

  useInput((_, key) => {
    if (key.leftArrow || key.rightArrow) setAccept(!accept);
    else if (key.return && accept) pageState?.acceptFn?.();
    else if (key.return && !accept) pageState?.cancelFn?.();
  });

  const width = 50;
  const fullString = Array(width).fill("=");

  return (
    <Box width={50} flexDirection="column">
      <Box>{fullString}</Box>
      <Row marginTop={1}>{"Are you sure?"}</Row>
      <Row marginBottom={1}>{"(Use Enter, Left, and Right to choose)"}</Row>
      {pageState && pageState.message && (
        <WrapTextRow text={pageState.message} width={width} padding={2} />
      )}
      <Row marginTop={1} marginBottom={1}>
        <Box width={8} justifyContent="center">
          <Focusable focus={accept}>{"[Yes]"}</Focusable>
        </Box>
        <Box width={8} justifyContent="center">
          <Focusable focus={!accept}>{"[No]"}</Focusable>
        </Box>
      </Row>
      <Box>{fullString}</Box>
    </Box>
  );
};

export default Confirmation;
