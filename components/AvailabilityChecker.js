import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";

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

function addOneDay(date) {
  if (!date) return null;
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
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

  const minToDate = from ? addOneDay(from) : todayDate();

  return (
    <>
      <div className="availability-checker">
        <div className="availability-box">
          <DatePicker
            locale="de"
            selected={from}
            onChange={date => {
              setFrom(date);
              if (to && date && to <= date) setTo(null);
            }}
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
            minDate={minToDate}
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
      </div>
      <style jsx global>{`
        .availability-checker {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .availability-box {
          width: 100%;
          max-width: 900px;
          min-width: 0;
          display: flex;
          flex-direction: row;
          gap: 18px;
          align-items: center;
          background: rgba(80,80,80,0.11);
          padding: 2rem 1rem;
          border-radius: 16px;
          margin-bottom: 36px;
          margin-top: 10px;
        }
        .availability-input {
          font-size: 1.07rem !important;
          padding: 1.18rem 1rem !important;
          border-radius: 8px !important;
          border: none !important;
          box-shadow: 0 1px 6px #0001 !important;
          background: #fff !important;
          width: 210px !important;
          min-width: 0 !important;
          max-width: 100% !important;
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
          min-width: 210px;
          max-width: 100%;
          margin-top: 0;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .availability-status {
          font-weight: 700;
          font-size: 1.09rem;
          padding: 0.9rem 1.6rem;
          border-radius: 8px;
          margin-left: 8px;
          text-align: center;
          height: 54px;
          display: flex;
          align-items: center;
        }
        .availability-status.soldout {
          color: #df1b1b;
          background: #ffebeb;
        }
        .availability-status.available {
          color: #40b355;
          background: #ecffe6;
        }
        .react-datepicker__input-container input {
          width: 100% !important;
          box-sizing: border-box;
        }
        .react-datepicker-popper {
          z-index: 10002;
        }
        @media (max-width: 640px) {
          .availability-box {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 1.1rem 0.5rem;
            max-width: 400px;
          }
          .availability-input,
          .availability-btn,
          .availability-status {
            width: 100% !important;
            max-width: 400px !important;
            margin: 0;
            min-width: 0 !important;
          }
          .availability-status {
            margin-top: 4px;
            margin-left: 0;
            height: auto;
          }
        }
      `}</style>
    </>
  );
}
