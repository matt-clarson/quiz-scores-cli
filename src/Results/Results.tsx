import React from "react";
import { Box } from "ink";
import { useQuiz } from "../Quiz";
import calculateScore from "./calculate-score";

const Results: React.FC = () => {
  const { members } = useQuiz();

  const scores = members
    .map(member => [member.name, calculateScore(member, members)])
    .sort((a, b) => (a[1] < b[1] ? 1 : -1));
  return (
    <Box flexDirection="column" width={40}>
      {scores.map(([member, score]) => (
        <React.Fragment key={member}>
          <Box key={member} width="100%" justifyContent="space-around">
            <Box>{member}</Box>
            <Box>{score}</Box>
          </Box>
          <Box>{Array(40).fill("=").join("")}</Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Results;
