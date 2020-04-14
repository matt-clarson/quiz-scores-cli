import React, { useEffect } from "react";
import ScoreRecorder from "./ScoreRecorder";
import { usePages } from "../common/components/Pages";
import { QuizMember, Scores, useQuiz } from "../Quiz";

const nextPerson = (quizMembers: QuizMember[], person: string): string => {
  for (const [index, member] of quizMembers.entries()) {
    if (!("name" in member)) throw new Error("Could not find next person");
    if (member.name === person) return quizMembers[index + 1].name;
  }
  throw new Error("Could not find next person");
};

const finalScoresSubmitted = (members: QuizMember[]): boolean =>
  members.filter(({ scores }) => !scores).length === 1;

const Scores: React.FC = () => {
  const { pageState, setPage } = usePages();
  const { members, setMemberScores } = useQuiz();
  const person = pageState?.person ?? members[0].name;

  useEffect(() => {
    if (pageState?.done) setPage("results");
  }, [pageState]);

  const submitScores = (scores: Scores) => {
    setPage("confirmation", {
      acceptFn: () => {
        setMemberScores(person, scores);
        setPage(
          "scores",
          finalScoresSubmitted(members)
            ? { done: true }
            : { person: nextPerson(members, person) }
        );
      },
      cancelFn: () => setPage("scores", { person: person }),
      message: `Scores entered: ${Object.entries(scores)
        .map(([p, s]) => `${p} - ${s ?? "NOT-ENTERED"}`)
        .join("; ")}`
    });
  };

  return (
    <ScoreRecorder person={person} people={members} onSubmit={submitScores} />
  );
};

export default Scores;
