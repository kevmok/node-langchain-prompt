import chalk from 'chalk';
import { menuOptions, printMenu } from 'common/utils/menu.js';
import * as dotenv from 'dotenv';
import { OpenAI } from 'langchain/llms/openai';

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
}

main();
