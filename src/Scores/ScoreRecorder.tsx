import React, { useEffect, useMemo, useState } from "react";
import { Box, useInput } from "ink";
import { useActive } from "../common/hooks";
import { NumberInput } from "../common/components/NumberInput";
import { QuizMember, Scores } from "../Quiz";

type ScoreRecorderProps = {
  person: string;
  people: QuizMember[];
  onSubmit: (scores: Scores) => void;
};

const buildInitialState = (person: string, people: QuizMember[]): Scores =>
  people.reduce(
    (acc, { name }) => (name === person ? acc : { ...acc, [name]: undefined }),
    {}
  );

const ScoreRecorder: React.FC<ScoreRecorderProps> = ({
  person,
  people,
  onSubmit
}) => {
  const [scores, setScores] = useState<Scores>(
    buildInitialState(person, people)
  );
  useEffect(() => setScores(buildInitialState(person, people)), [
    person,
    people
  ]);
  const rounds = useMemo(() => people.filter(({ name }) => name !== person), [
    person,
    people
  ]);
  const active = useActive(rounds);

  useInput((_, key) => {
    if (key.return) {
      onSubmit(scores);
    }
  });

  return (
    <Box flexDirection="column">
      <Box>{`Enter scores for ${person}`}</Box>
      <Box marginBottom={1}>
        {
          "Use the Up and Down keys to seect a person, type in their scores, and then press enter when you have finished"
        }
      </Box>

      {rounds.map((round, index) => (
        <NumberInput
          key={round.name}
          label={round.name}
          value={scores[round.name]}
          focus={active === index}
          onChange={(roundName, score) =>
            setScores({ ...scores, [roundName]: score })
          }
        />
      ))}
    </Box>
  );
};

export default ScoreRecorder;
