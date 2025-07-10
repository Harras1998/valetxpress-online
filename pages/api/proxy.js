// pages/api/proxy.js

export default async function handler(req, res) {
  // URL deines Backends (ohne / am Ende!)
  const backendUrl = "http://217.154.220.163:4000";

  // Next.js übergibt bei DELETE den Body NICHT automatisch!
  if (req.method === "DELETE") {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    await new Promise(resolve => req.on('end', resolve));
    try {
      req.body = JSON.parse(data || '{}');
    } catch (e) {
      req.body = {};
    }
  }

  // Welche Route soll angesprochen werden? (z.B. /api/buchung)
  // Query-Parameter (außer "path") werden korrekt übergeben!
  const { path, ...query } = req.query;
  const queryString = Object.entries(query)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

  const url = `${backendUrl}/${path}${queryString ? `?${queryString}` : ""}`;

  // Header übernehmen – authorization explizit weitergeben
  const { authorization, ...headers } = req.headers;

  const options = {
    method: req.method,
    headers: {
      ...headers,
      ...(authorization ? { authorization } : {})
    },
    body: ["POST", "PUT", "PATCH", "DELETE"].includes(req.method)    // <--- HIER!
      ? JSON.stringify(req.body)
      : undefined,
  };

  console.log("Proxy-Request:", url, options); // <--- LOGGEN!

  try {
    // Antwort vom Backend holen
    const apiRes = await fetch(url, options);
    res.status(apiRes.status);

    // Alle Backend-Header (optional, z.B. für Auth)
    // Object.entries(apiRes.headers.raw()).forEach(([key, value]) => res.setHeader(key, value));

    const data = await apiRes.text();
    console.log("Proxy-Response:", data); // <--- LOGGEN!
    res.send(data);
  } catch (err) {
    console.error("Proxy-Fehler:", err); // <--- LOGGEN!
    res.status(500).json({ error: "Proxy-Fehler", details: err.message });
  }
}
