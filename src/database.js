// mongo.js
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB conectado!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
  }
}
export async function disconnectFromDB() {
  try {
    await client.close();
    console.log("✅ MongoDB desconectado!");
  } catch (error) {
    console.error("❌ Erro ao desconectar do MongoDB:", error);
  }
}