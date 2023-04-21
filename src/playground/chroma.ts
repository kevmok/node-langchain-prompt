import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';

const client = new ChromaClient();
const key = process.env.OPENAI_KEY || 'na';
const embedder = new OpenAIEmbeddingFunction(key);

async function main() {
  // const collection = await client.createCollection('my_collection', embedder);
  const collection = await client.getCollection('my_collection', embedder);
  // await collection.add(
  //   ['id1', 'id2'],
  //   [
  //     [1.2, 2.3, 4.5],
  //     [6.7, 8.2, 9.2],
  //   ],
  //   [{ source: 'my_source' }, { source: 'my_source' }],
  //   ['This is a document', 'This is another document']
  // );

  // const results = await collection.query(undefined, 2, undefined, [
  //   'This is a query document',
  // ]);
  console.log(collection);
}

main();
