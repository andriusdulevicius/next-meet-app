// /api/new-meetup  tokiu endpoint adresu bus vykdomi fetch

import { MongoClient } from 'mongodb';

// cia aprasyti galima passwordus ir kita jautria info , nes cia aprasytas kodas nekeliauja i klientu narsykle

async function handler(req, res) {
  console.log(req.method);

  if (req.method === 'POST') {
    const data = req.body;
    console.log({ data });
    let client;
    try {
      console.log('env', process.env.MONGO_CONN);
      client = await MongoClient.connect(process.env.MONGO_CONN);
      const db = client.db();
      //sukurti arba nusitaikyti i esama kolekcija
      const meetupCollection = db.collection('meetups');
      const insertResult = await meetupCollection.insertOne(data);
      console.log(insertResult);

      res.status(201).json({ msg: 'success', data });
    } catch (err) {
      res.status(500).json({ error: err });
    } finally {
      client && client.close();
    }
  }
}

export default handler;
