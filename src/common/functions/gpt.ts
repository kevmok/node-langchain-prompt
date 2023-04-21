import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Chroma } from 'langchain/vectorstores/chroma';
import chalk from 'chalk';
import { OpenAI } from 'langchain/llms/openai';
import {
  LLMChain,
  loadQAStuffChain,
  ConversationChain,
} from 'langchain/chains';
import { PromptTemplate } from 'langchain/prompts';
import { BufferMemory } from 'langchain/memory';
import { promptUser, log, terminalSpinner } from '../utils/index.js';

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_KEY,
});

export async function pdfLoader(llm: OpenAI) {
  const loader = new PDFLoader('src/pdfs/SOP.pdf');
  log(loader);
  const docs = await loader.load();
  log(docs);
  const vectorStore = await Chroma.fromDocuments(docs, embeddings, {
    collectionName: 'AITA',
  });
  await vectorStore.ensureCollection();

  const userInput = promptUser('What would like to look into: ');
  const resultDocs = vectorStore.similaritySearch(userInput);

  const chain = loadQAStuffChain(llm);

  const { result } = await chain.call({
    input_documents: resultDocs,
    question: userInput,
  });
  log(chalk.greenBright(result));
}

export async function askGPT(llm: OpenAI) {
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

export async function converseGPT(llm: OpenAI) {
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
