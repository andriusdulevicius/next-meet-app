// /api/new-meetup  tokiu endpoint adresu bus vykdomi fetch

import { getCollection } from '../../utils/mongo-data';

// cia aprasyti galima passwordus ir kita jautria info , nes cia aprasytas kodas nekeliauja i klientu narsykle

async function handler(req, res) {
  console.log(req.method);
  const data = req.body;
  if (req.method === 'POST') {
    const [meetupCollection, client] = await getCollection();
    try {
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
