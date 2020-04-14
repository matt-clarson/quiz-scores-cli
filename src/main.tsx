import React from "react";
import { Box, render, useApp } from "ink";
import { Pages, Page } from "./common/components/Pages";
import { Quiz } from "./Quiz";
import Startup from "./Startup";
import { Confirmation } from "./common/components/Confirmation";
import PeoplePicker from "./PeoplePicker";
import Scores from "./Scores";
import Results from "./Results";
import Final from "./Final";
import ErrorHandler from "./ErrorHandler";
import { CsvWriter, FileWriter } from "./common/file-writer";

type AppProps = {
  people: string[];
  fileWriter: FileWriter;
};

const App: React.FC<AppProps> = ({ people, fileWriter }) => {
  const { exit } = useApp();
  return (
    <Quiz>
      <Box flexDirection="column">
        <Box>{"PUB QUIZ ON TOUR"}</Box>
        <Box>{Array(60).fill("=").join("")}</Box>
        <Box>{process.env.NODE_ENV}</Box>
        <Pages>
          <Page page="">
            <Startup />
          </Page>

          <Page page="confirmation">
            <Confirmation />
          </Page>

          <Page page="people-picker">
            <PeoplePicker people={people} />
          </Page>

          <Page page="scores">
            <Scores />
          </Page>

          <Page page="results">
            <Results fileWriter={fileWriter} />
          </Page>

          <Page page="final">
            <Final exit={exit} />
          </Page>
        </Pages>
      </Box>
    </Quiz>
  );
};

export default function main() {
  const people: string[] = (process.env.PEOPLE ?? "").split(/[,;]/);
  const csvWriter = new CsvWriter();
  render(
    <ErrorHandler>
      <App people={people} fileWriter={csvWriter} />
    </ErrorHandler>
  );
}
