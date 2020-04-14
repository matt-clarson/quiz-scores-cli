import React from "react";
import { Box, useInput } from "ink";
import { useQuiz } from "../Quiz";
import { usePages } from "../common/components/Pages";
import calculateScore, { CalculateScoreResult } from "./calculate-score";
import formatResultsAsCsv from "./format-results-as-csv";
import { FileWriter } from "../common/file-writer";

type ResultsProps = {
  fileWriter: FileWriter;
};

const Results: React.FC<ResultsProps> = ({ fileWriter }) => {
  const { members } = useQuiz();
  const { setPage } = usePages();

  const scores = members
    .map<[string, CalculateScoreResult]>(member => [
      member.name,
      calculateScore(member, members)
    ])
    .sort((a, b) => (a[1].finalScore < b[1].finalScore ? 1 : -1));

  useInput((_, key) => {
    if (key.return) {
      fileWriter
        .write(formatResultsAsCsv(members, scores))
        .then(outputedFilePath => setPage("final", { outputedFilePath }));
    }
  });

  return (
    <Box flexDirection="column" width={40}>
      <Box>{"Scores"}</Box>
      <Box>
        {"Press Enter to save the results to a file and close this app"}
      </Box>
      {scores.map(([member, { finalScore }]) => (
        <React.Fragment key={member}>
          <Box key={member} width="100%" justifyContent="space-around">
            <Box>{member}</Box>
            <Box>{finalScore}</Box>
          </Box>
          <Box>{Array(40).fill("=").join("")}</Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Results;
