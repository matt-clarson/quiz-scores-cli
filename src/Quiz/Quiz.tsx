import React, { useReducer } from "react";
import QuizContext, { QuizMember, DispatchAction } from "./context";

type QuizProps = {
  children?: React.ReactNode;
};

const reducer = (
  members: QuizMember[],
  action: DispatchAction
): QuizMember[] => {
  switch (action.type) {
    case "SET_MEMBER_SCORES":
      return members.map(member =>
        action.member === member.name
          ? { ...member, scores: action.scores }
          : member
      );
    case "SET_MEMBERS":
      return action.members?.map((name: string) => ({ name })) ?? [];
    default:
      return [];
  }
};

const Quiz: React.FC<QuizProps> = ({ children }) => {
  const [members, dispatch] = useReducer(reducer, []);

  return (
    <QuizContext.Provider value={{ members, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export default Quiz;
