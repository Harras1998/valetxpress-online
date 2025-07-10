// pages/api/proxy.js

export default async function handler(req, res) {
  // URL deines Backends (ohne / am Ende!)
  const backendUrl = "http://217.154.220.163:4000";

  // Damit funktionieren auch POST/PUT/PATCH/DELETE im lokalen Next.js-API-Router korrekt!
  if (req.method !== "GET") {
    let data = '';
    await new Promise(resolve => {
      req.on('data', chunk => { data += chunk; });
      req.on('end', resolve);
    });
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
      ...(authorization ? { authorization } : {}),
      ...(req.method !== "GET" ? { "Content-Type": "application/json" } : {}),
    },
    body: req.method !== "GET"
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
