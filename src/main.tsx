import React from "react";
import { render } from "ink";
import { Pages, Page } from "./common/components/Pages";
import Startup from "./Startup";
import PeoplePicker from "./PeoplePicker";

type AppProps = {
  people: string[];
};

const App: React.FC<AppProps> = ({ people }) => {
  return (
    <Pages>
      <Page page="">
        <Startup />
      </Page>

      <Page page="people-picker">
        <PeoplePicker people={people} />
      </Page>
    </Pages>
  );
};

export default function main() {
  const people: string[] = (process.env.PEOPLE ?? "").split(/[,;]/);
  render(<App people={people} />);
}
