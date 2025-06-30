// pages/api/proxy.js

export default async function handler(req, res) {
  // URL deines Backends (ohne / am Ende!)
  const backendUrl = "http://217.154.220.163:4000";

  // Welche Route soll angesprochen werden? (z.B. /api/buchung)
  const path = req.query.path || ""; // Übergib in der Anfrage: /api/proxy?path=api/buchung

  // Header übernehmen – authorization explizit weitergeben
  const { authorization, ...headers } = req.headers;

  const options = {
    method: req.method,
    headers: {
      ...headers,
      ...(authorization ? { authorization } : {})
    },
    body: ["POST", "PUT", "PATCH"].includes(req.method)
      ? JSON.stringify(req.body)
      : undefined,
  };

  try {
    // Antwort vom Backend holen
    const apiRes = await fetch(`${backendUrl}/${path}`, options);
    res.status(apiRes.status);

    // Alle Backend-Header (optional, z.B. für Auth)
    // Object.entries(apiRes.headers.raw()).forEach(([key, value]) => res.setHeader(key, value));

    const data = await apiRes.text();
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy-Fehler", details: err.message });
  }
}
