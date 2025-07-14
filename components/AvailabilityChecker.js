import { useState } from "react";

const soldOutDates = [
  { from: "2025-07-10", to: "2025-07-23" },
  // beliebig ergänzen!
];

function isSoldOut(from, to) {
  return soldOutDates.some(
    period => (from <= period.to && to >= period.from)
  );
}

// Hilfsfunktion für heutiges Datum im YYYY-MM-DD Format
function todayISO() {
  return new Date().toISOString().split("T")[0];
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
    <>
      <div className="availability-checker">
        <input
          type="date"
          value={from}
          min={todayISO()}
          onChange={e => setFrom(e.target.value)}
          className="availability-input"
          placeholder="Abflugdatum"
          aria-label="Abflugdatum"
        />
        <input
          type="date"
          value={to}
          min={todayISO()}
          onChange={e => setTo(e.target.value)}
          className="availability-input"
          placeholder="Rückflugdatum"
          aria-label="Rückflugdatum"
        />
        <button
          onClick={handleCheck}
          className="availability-btn"
        >
          VERFÜGBARKEIT PRÜFEN
        </button>
        {status && (
          <div className={`availability-status ${status === "AUSGEBUCHT" ? "soldout" : "available"}`}>
            {status}
          </div>
        )}
      </div>
      <style jsx>{`
        .availability-checker {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 18px;
          background: rgba(80,80,80,0.11);
          padding: 2rem 1rem;
          border-radius: 16px;
          margin-bottom: 36px;
          margin-top: 10px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }
        .availability-input {
          font-size: 1.07rem;
          padding: 1.18rem 1rem;
          border-radius: 8px;
          border: none;
          box-shadow: 0 1px 6px #0001;
          width: 210px;
          background: #fff;
          max-width: 400px;
        }
        .availability-btn {
          background: #8fd642;
          color: #fff;
          font-weight: 700;
          padding: 1.18rem 2.1rem;
          border: none;
          border-radius: 9px;
          font-size: 1.12rem;
          cursor: pointer;
          transition: background .2s;
          max-width: 400px;
          width: 100%;
        }
        .availability-status {
          font-weight: 700;
          font-size: 1.09rem;
          padding: 0.9rem 1.6rem;
          border-radius: 8px;
          margin-left: 8px;
        }
        .availability-status.soldout {
          color: #df1b1b;
          background: #ffebeb;
        }
        .availability-status.available {
          color: #40b355;
          background: #ecffe6;
        }
        @media (max-width: 640px) {
          .availability-checker {
            flex-direction: column;
            align-items: center;
            gap: 12px;
            padding: 1.1rem 0.5rem;
          }
          .availability-input,
          .availability-btn {
            width: 100%;
            min-width: 0;
            max-width: 400px;
            font-size: 1rem;
            padding: 0.95rem 0.8rem;
            margin-left: auto;
            margin-right: auto;
            display: block;
          }
          .availability-btn {
            padding: 1.1rem 0;
            font-size: 1.05rem;
          }
          .availability-status {
            width: 100%;
            margin-left: 0;
            text-align: center;
            margin-top: 2px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </>
  );
}
