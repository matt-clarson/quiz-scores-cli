import { useContext } from "react";
import QuizContext, { QuizMember, Scores } from "./context";

type UseQuizResult = {
  members: QuizMember[];
  setMembers: (members: string[]) => void;
  setMemberScores: (member: string, scores: Scores) => void;
};

export const useQuiz = (): UseQuizResult => {
  const { members, dispatch } = useContext(QuizContext);
  const setMembers = (newMembers: string[]) => {
    if (members.length > 0) return;
    dispatch?.({ type: "SET_MEMBERS", members: newMembers });
  };
  const setMemberScores = (member: string, scores: Scores) =>
    dispatch?.({ type: "SET_MEMBER_SCORES", member, scores });
  return { members, setMembers, setMemberScores };
};
