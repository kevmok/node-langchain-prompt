import chalk from 'chalk';
import { OpenAI } from 'langchain/llms/openai';
import { askGPT, converseGPT, pdfLoader } from 'common/functions/gpt.js';
import { log } from './index.js';

type MenuOption = {
  description: string;
  color: (text: string) => string;
  action: (llm: OpenAI) => Promise<void>;
};

export const menuOptions: Record<string, MenuOption> = {
  '1': {
    description: 'Ask GPT a question',
    color: chalk.bold.cyan,
    action: askGPT,
  },
  '2': {
    description: 'Converse with GPT',
    color: chalk.bold.greenBright,
    action: converseGPT,
  },
  '3': {
    description: 'Read paper',
    color: chalk.bold.red,
    action: pdfLoader,
  },
  '4': {
    description: 'Exit',
    color: chalk.bold.red,
    action: () => process.exit(0),
  },
};

export function printMenu() {
  log(chalk.underline('Select an option:\n'));

  for (const key in menuOptions) {
    if (Object.hasOwn(menuOptions, key)) {
      const option = menuOptions[key];
      log(option.color(`  ${key}. ${option.description}`));
    }
  }
}
