import { MongoClient } from "mongodb";

const connectToMongo = async (uri) => {
  let mongoClient = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB cluster...');
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Connection to MongoDB failed!', error);
    process.exit();
  }

  return mongoClient;
}

export default connectToMongo