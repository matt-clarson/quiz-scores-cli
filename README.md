# Quiz Scores CLI

A CLI (**C**ommand **L**ine **I**nterface) for calculating pub quiz scores.  
Written using [TypeScript](https://www.typescriptlang.org/), [Ink](https://github.com/vadimdemedes/ink), and [React](https://reactjs.org/), because I thought it'd be cool to use React to build something that isn't a web-app.

## Usage

At the moment [NodeJS](https://nodejs.org/en/) is required to run this, so make sure that is installed, than clone this repo, install dependencies, build, and run:

```bash
git clone https://github.com/matt-clarson/quiz-scores-cli.git
cd quiz-scores-cli
npm install
npm start
```

At the moment, compilation outputs to the `./build/` directory, so you can compile and then just run the outputed `.js` file:

```bash
npm run compile               // creates ./build/quiz-scores.js
node ./build/quiz-scores.js   // run the CLI
```

### Output

The CLI outputs a `csv` file containing all of the recorded information.The file will be output to a file named `quiz-result_<DD-MM-YYYY>.csv` in the dirctory you called the CLI from.

### Environment Variables

You will need to provide your own list of quizzers. You can do this with environment variables.  
The easiest way is by making a `.env` file in the root of the directory, adding a variable `PEOPLE`, a comma separated list of people:

```
// .env

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
