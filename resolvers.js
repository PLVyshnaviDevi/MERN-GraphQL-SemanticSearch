import { generateEmbedding } from "./embeddings.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db("sample_mflix");
const movies = db.collection("movies");

export const resolvers = {
  Query: {
    semanticSearch: async (_, { query }) => {
      const queryVec = await generateEmbedding(query);

      const results = await movies.aggregate([
        {
          $vectorSearch: {
            queryVector: queryVec,
            path: "plot_embedding",
            numCandidates: 100,
            limit: 4,
            index: "vector_index",
          },
        },
      ]).toArray();

      return results.map(doc => ({
        title: doc.title,
        plot: doc.plot,
      }));
    },
  },
};
