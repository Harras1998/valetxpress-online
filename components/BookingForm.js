import { useState } from "react";

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    car: "",
    license: "",
    parkOption: "valet",
    dateFrom: "",
    dateTo: "",
    payment: "paypal",
    flightNo: "",
  });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("pending");
    const res = await fetch("/api/buchen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        car: "",
        license: "",
        parkOption: "valet",
        dateFrom: "",
        dateTo: "",
        payment: "paypal",
        flightNo: "",
      });
    } else setStatus("error");
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", boxShadow: "0 2px 8px #0002", borderRadius: "1rem", padding: "2rem", maxWidth: 500, margin: "2rem auto" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Jetzt Parkplatz buchen</h2>
      <label>Name*<input name="name" required value={form.name} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }} /></label><br />
      <label>E-Mail*<input name="email" required type="email" value={form.email} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }} /></label><br />
      <label>Telefon*<input name="phone" required value={form.phone} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }} /></label><br />
      <label>Fahrzeug<input name="car" value={form.car} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }} /></label><br />
      <label>Kennzeichen<input name="license" value={form.license} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }} /></label><br />
      <label>Parkoption*
        <select name="parkOption" value={form.parkOption} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }}>
          <option value="valet">Valet Parking</option>
          <option value="allinclusive">All-Inclusive Parking</option>
        </select>
      </label><br />
      <label>Abgabe-Datum*<input name="dateFrom" type="date" required value={form.dateFrom} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }} /></label><br />
      <label>Rückgabe-Datum*<input name="dateTo" type="date" required value={form.dateTo} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }} /></label><br />
      <label>Flugnummer (optional)<input name="flightNo" value={form.flightNo} onChange={handleChange} style={{ width: "100%", marginBottom: 8 }} /></label><br />
      <label>Zahlungsart*
        <select name="payment" value={form.payment} onChange={handleChange} style={{ width: "100%", marginBottom: 16 }}>
          <option value="paypal">PayPal</option>
          <option value="creditcard">Kreditkarte (über PayPal)</option>
          <option value="sofort">Sofortüberweisung</option>
          <option value="bank">Überweisung</option>
          <option value="cash">Barzahlung</option>
        </select>
      </label><br /><br />
      <button type="submit" style={{ background: "#1e3a8a", color: "#fff", padding: "1rem", borderRadius: "1rem", fontSize: "1.2rem", width: "100%" }}>
        Buchung absenden
      </button>
      {status === "pending" && <p style={{ marginTop: 16, color: "#1e3a8a" }}>Bitte warten…</p>}
      {status === "success" && <p style={{ marginTop: 16, color: "green" }}>Buchung erfolgreich! Sie erhalten eine Bestätigung per E-Mail.</p>}
      {status === "error" && <p style={{ marginTop: 16, color: "red" }}>Fehler bei der Buchung. Bitte probieren Sie es später erneut.</p>}
    </form>
  );
}
