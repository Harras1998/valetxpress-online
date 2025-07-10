import { useState } from "react";

// Beispiel: Ausgebuchte Zeiträume (kannst du jederzeit ändern!)
const soldOutDates = [
  { from: "2025-07-10", to: "2025-07-23" }, // Beispielzeitraum, einfach anpassen!
  // weitere ausgebuchte Zeiträume hinzufügen ...
];

function isSoldOut(from, to) {
  // Checks if the selected range overlaps with any sold out range
  return soldOutDates.some(
    period =>
      (from <= period.to && to >= period.from)
  );
}

export default function AvailabilityChecker() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState(null);

  const handleCheck = () => {
    if (!from || !to) {
      setStatus("Bitte beide Daten auswählen.");
      return;
    }
    setStatus(
      isSoldOut(from, to)
        ? "AUSGEBUCHT"
        : "VERFÜGBAR"
    );
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      background: "rgba(80,80,80,0.4)",
      padding: "2rem 1rem",
      borderRadius: 16,
      marginBottom: 36,
      marginTop: 24,
      maxWidth: 800,
      marginLeft: "auto",
      marginRight: "auto",
    }}>
      <input
        type="date"
        value={from}
        onChange={e => setFrom(e.target.value)}
        style={{
          fontSize: "1rem",
          padding: "1.2rem 1rem",
          borderRadius: 7,
          border: "none",
          boxShadow: "0 1px 6px #0001",
          width: 180,
          marginRight: 8,
        }}
        placeholder="Datum Hinflug"
      />
      <input
        type="date"
        value={to}
        onChange={e => setTo(e.target.value)}
        style={{
          fontSize: "1rem",
          padding: "1.2rem 1rem",
          borderRadius: 7,
          border: "none",
          boxShadow: "0 1px 6px #0001",
          width: 180,
          marginRight: 8,
        }}
        placeholder="Datum Rückflug"
      />
      <button
        onClick={handleCheck}
        style={{
          background: "#8fd642",
          color: "#fff",
          fontWeight: 700,
          padding: "1.2rem 2rem",
          border: "none",
          borderRadius: 8,
          fontSize: "1.1rem",
          cursor: "pointer",
          transition: "background .2s",
        }}
      >
        VERFÜGBARKEIT PRÜFEN
      </button>
      {status && (
        <div style={{
          marginLeft: 16,
          fontWeight: 700,
          fontSize: "1.08rem",
          color: status === "AUSGEBUCHT" ? "#df1b1b" : "#40b355",
          background: status === "AUSGEBUCHT" ? "#ffebeb" : "#ecffe6",
          padding: "0.7rem 1.3rem",
          borderRadius: 8,
        }}>
          {status}
        </div>
      )}
    </div>
  );
}
