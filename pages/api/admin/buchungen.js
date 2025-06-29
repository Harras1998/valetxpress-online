// index.js (bzw. eigener admin-Route auf deinem Node-Backend!)
// Dieser Code gehört NICHT in Vercel, sondern in dein Backend auf IONOS!

require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// --- DB-Verbindung ---
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// --- Middleware ---
app.use(cors({
  origin: [
    "https://valetxpress.de",
    "https://www.valetxpress.de"
  ],
  credentials: true
}));
app.use(express.json());

// --- ADMIN API ENDPOINT: Buchungen verwalten ---
app.all("/api/admin/buchungen", async (req, res) => {
  // Authentifizierung: HTTP Basic Auth (sehr simpel)
  const auth = req.headers.authorization || "";
  const [type, encoded] = auth.split(" ");
  const decoded = encoded ? Buffer.from(encoded, "base64").toString() : "";
  const [user, pass] = decoded.split(":");
  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"');
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
    db.query(query, params, (err, results) => {
      if (err) return res.status(500).json({ error: "DB-Fehler", details: err });
      res.status(200).json({ buchungen: results });
    });
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    db.query("DELETE FROM bookings WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json({ error: "DB-Fehler", details: err });
      res.status(200).json({ success: true });
    });
  } else {
    res.status(405).end();
  }
});

// --- Server starten ---
app.listen(PORT, "0.0.0.0", () => {
  console.log("API läuft auf Port " + PORT);
});
