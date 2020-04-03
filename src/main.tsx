import React from "react";
import { render } from "ink";
import { Pages, Page } from "./common/components/Pages";
import Startup from "./Startup";

const App = () => {
  return (
    <Pages>
      <Page page="">
        <Startup />
      </Page>
    </Pages>
  );
};

export default function main() {
  render(<App />);
}
