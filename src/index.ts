import * as dotenv from 'dotenv';
import chalk from 'chalk';
import { OpenAI } from 'langchain/llms/openai';
import { menuOptions, printMenu } from 'common/utils/menu.js';
import { log, promptUser } from './common/utils/index.js';

dotenv.config();

async function main() {
  const llm = new OpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_KEY,
  });
  printMenu();
  while (true) {
    const userChoice = promptUser('Select an option: ');
    const selectedOption = menuOptions[userChoice];

    if (selectedOption) {
      await selectedOption.action(llm);
      process.exit(0);
    } else {
      log(chalk.red('Invalid selection, please try again.'));
    }
  }
  // log(
  //   chalk.underline('Select an option:\n') +
  //     chalk.bold.cyan('  1. Ask GPT a question\n') +
  //     chalk.bold.greenBright('  2. Converse with GPT\n') +
  //     chalk.bold.red('  3. Read paper\n') +
  //     chalk.bold.red('  4. Exit\n')
  // );
  // while (true) {
  //   const userChoice = promptUser('Select an option: ');
  //   switch (userChoice) {
  //     case '1':
  //       await askGPT(llm);
  //       process.exit(0);
  //     case '2':
  //       await converseGPT(llm);
  //       process.exit(0);
  //     case '3':
  //       await pdfLoader(llm);
  //       process.exit(0);
  //     case '4':
  //       process.exit(0);
  //     default:
  //       log(chalk.red('Invalid selection, please try again.'));
  //   }
  // }
}

main();
