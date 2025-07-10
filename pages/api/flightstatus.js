// pages/api/flightstatus.js
export default async function handler(req, res) {
  const { flugnr, datum } = req.query;
  if (!flugnr || !datum) return res.status(400).json({ status: "n/a" });

  // Demo: Zufallsstatus
  const statusList = ["pünktlich", "verspätet", "gelandet", "annulliert", "noch offen"];
  const status = statusList[Math.floor(Math.random() * statusList.length)];
  res.json({ status });
}
