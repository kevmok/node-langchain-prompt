import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

const key = process.env.OPENAI_KEY || 'na';

async function hns() {
  const loader = new PDFLoader('src/pdfs/SOP.pdf');
  const docs = await loader.load();

  const vectorStore = await HNSWLib.fromDocuments(
    docs,
    new OpenAIEmbeddings({ openAIApiKey: key })
  );

  const result = await vectorStore.similaritySearch(
    'What is the author name',
    1
  );
  console.log(result);
}

hns();
