import React, { useReducer } from "react";
import QuizContext, { QuizMember, DispatchAction } from "./context";

type QuizProps = {
  children?: React.ReactNode;
};

const reducer = (
  _members: QuizMember[],
  action: DispatchAction
): QuizMember[] => {
  if (action.type === "SET_MEMBERS") {
    return action.members?.map((name: string) => ({ name })) ?? [];
  }
  return [];
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
