// pages/api/proxy.js

export default async function handler(req, res) {
  // URL deines Backends (ohne / am Ende!)
  const backendUrl = "http://217.154.220.163:4000";

  // Welche Route soll angesprochen werden? (z.B. /api/buchung)
  const path = req.query.path || ""; // Übergib in der Anfrage: /api/proxy?path=api/buchung

  // Anfrage-Optionen anpassen (Methode, Header, Body)
  const options = {
    method: req.method,
    headers: {
      ...req.headers,
      // Host-Header NICHT weiterleiten
      host: undefined
    },
    body: ["POST", "PUT", "PATCH"].includes(req.method)
      ? JSON.stringify(req.body)
      : undefined,
  };

  try {
    // Hole die Antwort vom Backend
    const apiRes = await fetch(`${backendUrl}/${path}`, options);

    // Setze Status und Header (optional anpassen)
    res.status(apiRes.status);

    // Übernehme die Antwort vom Backend
    const data = await apiRes.text();
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy-Fehler", details: err.message });
  }
}
