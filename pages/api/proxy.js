// pages/api/proxy.js

export default async function handler(req, res) {
  // URL deines Backends (ohne / am Ende!)
  const backendUrl = "http://217.154.220.163:4000";

  // Welche Route soll angesprochen werden? (z.B. /api/buchung)
  // Query-Parameter (außer "path") werden korrekt übergeben!
  const { path, ...query } = req.query;
  const cleanPath = String(path || "").replace(/^\/+/ , "");
  const queryString = Object.entries(query)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

  const url = `${backendUrl}/${cleanPath}${queryString ? `?${queryString}` : ""}`;

  // Header übernehmen – authorization explizit weitergeben
  const { authorization, ...headers } = req.headers;

  const options = {
    method: req.method,
    headers: {
      ...headers,
      ...(authorization ? { authorization } : {}),
      ...((["POST","PUT","PATCH","DELETE"].includes(req.method) && !headers["content-type"]) ? { "content-type": "application/json" } : {})
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
