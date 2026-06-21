export default function handler(req, res) {

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  res.status(200).json({
    accountNumber: "0941410430",
    bankName: "Pagiaa",
    accountName: "ASPFkwjIY",
    telegram: "globevest_support"
  });

}
