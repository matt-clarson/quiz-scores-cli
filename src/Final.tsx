import React, { useEffect, useState } from "react";
import { Box } from "ink";
import { usePages } from "./common/components/Pages";

type FinalProps = {
  exit: (error?: Error) => void;
};

const Final: React.FC<FinalProps> = ({ exit }) => {
  const [count, setCount] = useState(5);
  const { pageState } = usePages();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (count > 0) setCount(count - 1);
      else exit();
    }, 1000);
    return () => clearTimeout(timeoutId);
  });

  return (
    <Box flexDirection="column">
      <Box>{`Quiz results have been saved to: ${pageState?.outputedFilePath}`}</Box>
      <Box>{`Closing in ${count}`}</Box>
    </Box>
  );
};

export default Final;
