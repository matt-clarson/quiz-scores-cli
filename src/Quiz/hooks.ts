import { useContext } from "react";
import QuizContext, { QuizMember } from "./context";

type UseQuizResult = {
  members: QuizMember[];
  setMembers: (members: string[]) => void;
};

export const useQuiz = (): UseQuizResult => {
  const { members, dispatch } = useContext(QuizContext);
  const setMembers = (newMembers: string[]) => {
    if (members.length > 0) return;
    dispatch?.({ type: "SET_MEMBERS", members: newMembers });
  };
  return { members, setMembers };
};
