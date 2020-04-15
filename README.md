# Quiz Scores CLI

A CLI (**C**ommand **L**ine **I**nterface) for calculating pub quiz scores.  
Written using [TypeScript](https://www.typescriptlang.org/), [Ink](https://github.com/vadimdemedes/ink), and [React](https://reactjs.org/), because I thought it'd be cool to use React to build something that isn't a web-app.

## Usage

The quickest way to get started is to use the `start` script. This compiles and bundles the TypeScript into a single `.js` file.

```bash
git clone https://github.com/matt-clarson/quiz-scores-cli.git
cd quiz-scores-cli
npm install
npm start
```

**Testing required**

You can also build binaries that have the Node runtime built-in, using [nexe](https://github.com/nexe/nexe).

```bash
npm run build:macos     # targets darwin-x64
npm run build:linux     # targets linux-x64
npm run build:windows   # targets windowx-x64
npm run build           # builds a binary for each target
```

### Output

The CLI outputs a `csv` file containing all of the recorded information.The file will be output to a file named `quiz-result_<DD-MM-YYYY>.csv` in the dirctory you called the CLI from.

### Environment Variables

You will need to provide your own list of quizzers. You can do this with environment variables.  
The easiest way is by making a `.env` file in the root of the directory, adding a variable `PEOPLE`, a comma separated list of people:

```bash
# .env

PEOPLE=John,Kate,Ellie,Zack
```

**Note** that the `PEOPLE` variable needs to be present _at runtime_ not at compilation.

---

## Development

The following commands will be useful for development:

```bash
npm test                // runs the test suite
npm run test:watch      // runs the tests in watch mode
npm run test:coverage   // produces a coverage report
```
