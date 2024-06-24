import dbConnect from "@/db/dbConnect";
import QRCode from "@/db/models/QRCode";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "POST":
      const { title, url } = req.body;
      const newQRCode = await QRCode.create({
        title,
        url,
      });

      res.status(201).send(newQRCode);
      break;

    case "GET":
      const qrcodes = await QRCode.find();
      res.send(qrcodes);
      break;

    default:
      res.status(404).send();
      break;
  }
}
