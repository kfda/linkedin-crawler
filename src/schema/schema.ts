import { MongoClient, MongoClientOptions } from 'mongodb';

// MongoDB connection and saving function
export async function saveProspectToMongoDB(prospectData: {
  name: string | undefined;
  lastName: string | undefined;
  profilePicture: string | null; // Change 'undefined' to 'null' to match the type in the error message
}) {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true } as MongoClientOptions); // Use 'as MongoClientOptions' to bypass the error

  try {
    await client.connect();
    const db = client.db('linkedin');
    const prospects = db.collection('prospects');
    await prospects.insertOne(prospectData);
  } finally {
    await client.close();
  }
}
