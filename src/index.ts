// src/index.ts
import * as readlineSync from 'readline-sync';
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';

const openai_api_key: string | undefined = process.env.OPENAI_KEY;

function promptUser(): string {
  const input: string = readlineSync.question('Please enter some text: ');
  return input;
}

async function main() {
  const userInput: string = promptUser();
  const template = `Question: {question}\nAnswer: `;
  const prompt = new PromptTemplate({
    template: template,
    inputVariables: ['question'],
  });
  const llm = new OpenAI({ temperature: 0.7, openAIApiKey: openai_api_key });

  const chain = new LLMChain({ llm: llm, prompt: prompt });

  const response = await chain.run(userInput);
  console.log(response);
}
main();
