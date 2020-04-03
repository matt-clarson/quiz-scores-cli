import React from "react";
import { Box, useInput } from "ink";
import { usePages } from "./common/components/Pages";

const Startup = () => {
  const { setPage } = usePages();
  useInput((_, key) => {
    if (key.return) setPage("people-picker");
  });

  return (
    <Box flexDirection="column">
      <Box>{"PUB QUIZ ON TOUR"}</Box>
      <Box>{"Welcome! Press Enter to start."}</Box>
      <Box>{"(You can exit at any time by pressing CTRL-C)"}</Box>
    </Box>
  );
};

export default Startup;
