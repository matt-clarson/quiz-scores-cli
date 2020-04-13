import { QuizMember } from "../Quiz";

const calculateScore = (member: QuizMember, members: QuizMember[]): number => {
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
  return Math.ceil(rawRoundScore / (members.length - 1)) + baseScore;
};

export default calculateScore;
