import React from 'react';
import {Box, render} from 'ink';

const App = () => {
  return <Box>{'Hello World!'}</Box>;
}

export default function main() {
  render(<App />);
}