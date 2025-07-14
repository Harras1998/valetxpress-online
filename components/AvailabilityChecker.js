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
        <div className="availability-field">
          <label htmlFor="from">Abflugdatum</label>
          <input
            id="from"
            type="date"
            value={from}
            min={todayISO()}
            onChange={e => setFrom(e.target.value)}
            className="availability-input"
            aria-label="Abflugdatum"
          />
        </div>
        <div className="availability-field">
          <label htmlFor="to">Rückflugdatum</label>
          <input
            id="to"
            type="date"
            value={to}
            min={todayISO()}
            onChange={e => setTo(e.target.value)}
            className="availability-input"
            aria-label="Rückflugdatum"
          />
        </div>
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
        .availability-field {
          display: flex;
          flex-direction: column;
        }
        .availability-field label {
          font-size: 1.08rem;
          font-weight: 500;
          color: #444;
          margin-bottom: 0.32em;
          margin-left: 0.1em;
        }
        .availability-input {
          font-size: 1.07rem;
          padding: 1.18rem 1rem;
          border-radius: 8px;
          border: none;
          box-shadow: 0 1px 6px #0001;
          width: 210px;
          background: #fff;
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
            align-items: stretch;
            gap: 12px;
            padding: 1.1rem 0.5rem;
          }
          .availability-field {
            width: 100%;
          }
          .availability-input {
            width: 100%;
            min-width: 0;
            font-size: 1rem;
            padding: 0.95rem 0.8rem;
          }
          .availability-btn {
            width: 100%;
            padding: 1.1rem 0;
            font-size: 1.05rem;
          }
          .availability-status {
            width: 100%;
            margin-left: 0;
            text-align: center;
            margin-top: 2px;
          }
        }
      `}</style>
    </>
  );
}
