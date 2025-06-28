import Link from "next/link";
export default function Footer() {
  return (
    <footer style={{ background: "#1e3a8a", color: "#fff", padding: "1rem 0", marginTop: "2rem" }}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <span>© {new Date().getFullYear()} ValetXpress – Parken am Flughafen München</span>
        <div className="flex gap-4">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}