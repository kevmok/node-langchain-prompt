import * as dotenv from 'dotenv';
import * as readlineSync from 'readline-sync';
import chalk from 'chalk';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain, ConversationChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { BufferMemory } from 'langchain/memory';
import { log, terminalSpinner } from './utils/index.js';

dotenv.config();

function promptUser(prompt: string): string {
  const input: string = readlineSync.question(chalk.blue(prompt));
  return input;
}

async function askGPT(llm: OpenAI) {
  const userInput: string = promptUser('What is your question: ');
  const template = `Question: {question}\nAnswer: `;

  terminalSpinner.start();

  const prompt = new PromptTemplate({
    template,
    inputVariables: ['question'],
  });

  const chain = new LLMChain({ llm, prompt });
  const response = await chain.run(userInput);
  terminalSpinner.stop();
  log(chalk.green(response));
}

async function converseGPT(llm: OpenAI) {
  const memory = new BufferMemory();
  const chain = new ConversationChain({ llm, memory });

  while (true) {
    const input = promptUser('You: ');

    if (input.toLowerCase() === 'exit') {
      log(chalk.green('Goodbye!'));
      break;
    }
    terminalSpinner.start();
    const { response } = await chain.call({ input });
    terminalSpinner.stop();
    log(chalk.green('AI: ', response));
  }
}

async function main() {
  const llm = new OpenAI({
    modelName: 'gpt-3.5-turbo',
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_KEY,
  });

  log(
    chalk.underline('Select an option:\n') +
      chalk.bold.cyan('  1. Ask GPT a question\n') +
      chalk.bold.greenBright('  2. Converse with GPT\n') +
      chalk.bold.red('  3. Exit\n')
  );
  while (true) {
    const userChoice = promptUser('Select an option: ');
    switch (userChoice) {
      case '1':
        await askGPT(llm);
        process.exit(0);
      case '2':
        await converseGPT(llm);
        process.exit(0);
      case '3':
        process.exit(0);
      default:
        log(chalk.red('Invalid selection, please try again.'));
    }
  }
}

main();
