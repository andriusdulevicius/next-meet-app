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
    const client = await MongoClient.connect(mongoDbString);

    client.close();
    res.json({ msg: 'success', data });
  }
}

export default handler;
