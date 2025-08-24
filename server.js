import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { generateEmbedding } from "./embeddings.js";

dotenv.config();
const app = express();

async function populateEmbeddings() {
  const client = await mongoose.connect(process.env.MONGO_URI, {
    dbName: "sample_mflix",
  });

  console.log("Connected to MongoDB");

  const db = client.connection.db;
  const movies = db.collection("movies");

  const docs = await movies
    .find({ plot: { $exists: true }, plot_embedding: { $exists: false } })
    .limit(50)
    .toArray();

  console.log(`Found ${docs.length} documents without embeddings`);

  for (const doc of docs) {
    try {
      console.log(`Processing: ${doc.title}`);
      const embedding = await generateEmbedding(doc.plot);
      await movies.updateOne(
        { _id: doc._id },
        { $set: { plot_embedding: embedding } }
      );
      console.log(`Updated embedding for: ${doc.title}`);
    } catch (err) {
      console.error(`Error updating ${doc.title}:`, err.message);
    }
  }

  console.log("All embeddings populated!");
}

async function startServer() {
  //  await populateEmbeddings();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`) 
  );
}

startServer();
