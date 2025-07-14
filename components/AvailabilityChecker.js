import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";

// Deutsche Lokalisierung für react-datepicker registrieren
registerLocale("de", de);

const soldOutDates = [
  { from: "2025-07-10", to: "2025-07-23" },
  // beliebig ergänzen!
];

function isSoldOut(from, to) {
  if (!from || !to) return false;
  const fromISO = from.toISOString().split("T")[0];
  const toISO = to.toISOString().split("T")[0];
  return soldOutDates.some(
    period => (fromISO <= period.to && toISO >= period.from)
  );
}

function todayDate() {
  const now = new Date();
  now.setHours(0,0,0,0);
  return now;
}

export default function AvailabilityChecker() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
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
        <DatePicker
          locale="de"
          selected={from}
          onChange={date => setFrom(date)}
          selectsStart
          startDate={from}
          endDate={to}
          minDate={todayDate()}
          placeholderText="Abflugdatum"
          className="availability-input"
          dateFormat="dd.MM.yyyy"
          aria-label="Abflugdatum"
          autoComplete="off"
          showPopperArrow={false}
        />
        <DatePicker
          locale="de"
          selected={to}
          onChange={date => setTo(date)}
          selectsEnd
          startDate={from}
          endDate={to}
          minDate={from || todayDate()}
          placeholderText="Rückflugdatum"
          className="availability-input"
          dateFormat="dd.MM.yyyy"
          aria-label="Rückflugdatum"
          autoComplete="off"
          disabled={!from}
          showPopperArrow={false}
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
      <style jsx global>{`
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
          font-size: 1.07rem !important;
          padding: 1.18rem 1rem !important;
          border-radius: 8px !important;
          border: none !important;
          box-shadow: 0 1px 6px #0001 !important;
          width: 210px !important;
          background: #fff !important;
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
          .availability-input {
            width: 100% !important;
            min-width: 0 !important;
            font-size: 1rem !important;
            padding: 0.95rem 0.8rem !important;
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
        /* React-datepicker Anpassungen */
        .react-datepicker__input-container input {
          width: 100%;
          box-sizing: border-box;
        }
        .react-datepicker-popper {
          z-index: 10002;
        }
      `}</style>
    </>
  );
}
