import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("DB_USER:", process.env.DB_USER);
  console.log("DB_NAME:", process.env.DB_NAME);
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  // Authentifizierung: HTTP Basic Auth (sehr simpel)
  const auth = req.headers.authorization || "";
  const [type, encoded] = auth.split(" ");
  const decoded = encoded ? Buffer.from(encoded, "base64").toString() : "";
  const [user, pass] = decoded.split(":");
  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"');
    await connection.end();
    return res.status(401).end("Unauthorized");
  }

  // Suche & Sortierung
  const search = req.query.suchtext || "";
  const sort = req.query.sort || "id";
  const dir = req.query.dir === "desc" ? "DESC" : "ASC";
  const allowedSort = [
    "id","vorname","nachname","email","telefon","auto","kennzeichen",
    "strasse","plz","ort","abflug","ankunftUhrzeit","abflugUhrzeit",
    "rueckflug","rueckflugUhrzeit","reiseziel","fluggesellschaft",
    "flugnummerHin","flugnummerRueck","terminal","handgepaeck","bemerkung",
    "typ","start","end","tage","preis","addOut","addIn","addTank","addLade","bezahlt","erstellt"
  ];
  const safeSort = allowedSort.includes(sort) ? sort : "id";

  if (req.method === "GET") {
    let query = "SELECT * FROM bookings";
    let params = [];
    if (search) {
      query += " WHERE kennzeichen LIKE ?";
      params.push("%" + search + "%");
    }
    query += ` ORDER BY ${safeSort} ${dir}`;
    const [rows] = await connection.query(query, params);
    await connection.end();
    res.status(200).json({ buchungen: rows });
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await connection.query("DELETE FROM bookings WHERE id = ?", [id]);
    await connection.end();
    res.status(200).json({ success: true });
  } else {
    await connection.end();
    res.status(405).end();
  }
}
