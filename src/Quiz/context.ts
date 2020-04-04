import { createContext } from "react";

export type QuizMember = {
  name: string;
};

type SetMembersAction = {
  type: "SET_MEMBERS";
  members: string[];
};

export type DispatchAction = SetMembersAction;

export type QuizDispatcher = (action: DispatchAction) => void;

export type TQuizContext = {
  members: QuizMember[];
  dispatch?: QuizDispatcher;
};

export default createContext<TQuizContext>({
  members: []
});
