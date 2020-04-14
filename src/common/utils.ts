export const wrapText = (text: string, width: number, padding = 1): string[] =>
  text.length + padding * 2 < width
    ? [text]
    : text.split(" ").reduce(
        (acc, word) => {
          const lastLine = acc[acc.length - 1];
          const potentialLastLine = `${lastLine} ${word}`.trim();
          return potentialLastLine.length + padding * 2 < width
            ? [...acc.slice(0, acc.length - 1), potentialLastLine]
            : [...acc, word];
        },
        [""]
      );

export const suppressErrors = () => {
  const consoleError = console.error;
  global.console.error = () => {};
  if (process.env.NODE_ENV === "development") {
    global.console.error = consoleError;
  }
};
