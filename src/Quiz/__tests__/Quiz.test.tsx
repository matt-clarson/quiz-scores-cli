import React from "react";
import { render } from "ink-testing-library";

import Quiz from "../Quiz";

describe("<Quiz />", () => {
  it("should render", () => {
    render(<Quiz>{"hello"}</Quiz>);
  });
});
