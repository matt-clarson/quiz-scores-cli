import React from "react";
import { render } from "ink";
import { Pages, Page } from "./common/components/Pages";
import { Quiz } from "./Quiz";
import Startup from "./Startup";
import { Confirmation } from "./common/components/Confirmation";
import PeoplePicker from "./PeoplePicker";
import Scores from "./Scores";
import Results from "./Results";
import { CsvWriter, FileWriter } from "./common/file-writer";

type AppProps = {
  people: string[];
  fileWriter: FileWriter;
};

const App: React.FC<AppProps> = ({ people, fileWriter }) => {
  return (
    <Quiz>
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
      </Pages>
    </Quiz>
  );
};

export default function main() {
  const people: string[] = (process.env.PEOPLE ?? "").split(/[,;]/);
  const csvWriter = new CsvWriter();
  render(<App people={people} fileWriter={csvWriter} />);
}
