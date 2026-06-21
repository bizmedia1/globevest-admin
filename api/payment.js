import fs from "fs";
import path from "path";

export default function handler(req, res) {

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  const filePath = path.join(
    process.cwd(),
    "data",
    "payment.json"
  );

  const data = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  res.status(200).json(data);

}
