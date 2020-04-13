import { QuizMember } from "../Quiz";

export type CalculateScoreResult = {
  avgRoundScore: number;
  finalScore: number;
};

const calculateScore = (
  member: QuizMember,
  members: QuizMember[]
): CalculateScoreResult => {
  if (member.scores === undefined)
    throw new Error(`${member.name} has no scores`);
  let baseScore = 0;
  for (const [round, score] of Object.entries(member.scores)) {
    if (score === undefined)
      throw new Error(`${member.name} has no score for ${round}`);
    baseScore += score;
  }

  const rawRoundScore = members.reduce((acc, otherMember) => {
    if (otherMember.name === member.name) return acc;
    if (otherMember.scores === undefined)
      throw new Error(`${otherMember.name} has no scores`);
    if (otherMember.scores[member.name] === undefined)
      throw new Error(`${otherMember.name} has no score for ${member.name}`);
    return acc + otherMember.scores[member.name]!;
  }, 0);
  const avgRoundScore = Math.ceil(rawRoundScore / (members.length - 1));
  return { avgRoundScore, finalScore: avgRoundScore + baseScore };
};

export default calculateScore;
