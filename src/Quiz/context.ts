import { createContext } from "react";

export type Scores = {
  [key: string]: number | undefined;
};

export type QuizMember = {
  name: string;
  scores?: Scores;
};

type SetMembersAction = {
  type: "SET_MEMBERS";
  members: string[];
};

type SetMemberScores = {
  type: "SET_MEMBER_SCORES";
  member: string;
  scores: Scores;
};

export type DispatchAction = SetMembersAction | SetMemberScores;

export type QuizDispatcher = (action: DispatchAction) => void;

export type TQuizContext = {
  members: QuizMember[];
  dispatch?: QuizDispatcher;
};

export default createContext<TQuizContext>({
  members: []
});
