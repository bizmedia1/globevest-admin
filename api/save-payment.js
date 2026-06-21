export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const {
    accountNumber,
    bankName,
    accountName,
    telegram
  } = req.body;

  const content = JSON.stringify({
    accountNumber,
    bankName,
    accountName,
    telegram
  }, null, 2);

  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;

  const filePath = "data/payment.json";

  const currentFile = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      headers: {
        Authorization: `token ${token}`
      }
    }
  );

  const currentData = await currentFile.json();

  const updateResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Update payment details",
        content: Buffer
          .from(content)
          .toString("base64"),
        sha: currentData.sha
      })
    }
  );

  const result = await updateResponse.json();

  return res.status(200).json({
    success: true,
    result
  });

}
