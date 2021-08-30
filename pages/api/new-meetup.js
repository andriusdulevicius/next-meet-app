const mongoDbString =
  'mongodb+srv://andriusAdmin:mongo123@frankfurtclusteraws.9ltyw.mongodb.net/next-meetup?retryWrites=true&w=majority';

module.exports = { mongoDbString };

// /api/new-meetup  tokiu endpoint adresu bus vykdomi fetch

import { MongoClient } from 'mongodb';

// cia aprasyti galima passwordus ir kita jautria info , nes cia aprasytas kodas nekeliauja i klientu narsykle

async function handler(req, res) {
  console.log(req.method);

  if (req.method === 'POST') {
    const data = req.body;
    console.log({ data });
    try {
      const client = await MongoClient.connect(mongoDbString);
      const db = client.db();
      //sukurti arba nusitaikyti i esama kolekcija
      const meetupCollection = db.collection('meetups');
      const insertResult = await meetupCollection.insertOne(data);

      res.status(201).json({ msg: 'success', data });
    } catch (err) {
      res.status(500).json({ error: err });
      throw new Error(err.message);
    } finally {
      client.close();
    }
  }
}

export default handler;
