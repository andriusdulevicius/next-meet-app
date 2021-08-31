import { MongoClient } from 'mongodb';

export async function getCollection() {
  const client = await MongoClient.connect(process.env.MONGO_CONN);
  const db = client.db();
  // sukurti arba nusitiaikyti i esama
  const meetupCollecion = db.collection('meetups');
  const allMeets = await meetupCollecion.find({}).toArray();
  client.close();
  return allMeets;
}
