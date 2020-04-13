import findIndex from "lodash/findIndex";
import { QuizMember } from "../Quiz";
import { CalculateScoreResult } from "./calculate-score";

const formatResultsAsCsv = (
  quizMembers: QuizMember[],
  scores: [string, CalculateScoreResult][]
): string => {
  const headers = [
    "Name",
    ...quizMembers.map(({ name }) => name),
    "Round Average",
    "Total"
  ];
  const rows = [];
  for (const member of quizMembers) {
    const row = Array(headers.length);
    row[0] = member.name;
    row[findIndex(quizMembers, ({ name }) => member.name === name) + 1] = null;
    const [, memberScores] = scores.find(([name]) => name === member.name)!;
    row[row.length - 2] = memberScores!.avgRoundScore;
    row[row.length - 1] = memberScores!.finalScore;
    for (const [round, score] of Object.entries(member.scores!)) {
      const index = findIndex(quizMembers, ({ name }) => name === round);
      row[index + 1] = score;
    }
    rows.push(row.join(","));
  }
  return `${headers.join(",")}\n${rows.join("\n")}`;
};

export default formatResultsAsCsv;
