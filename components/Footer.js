import Link from "next/link";
export default function Footer() {
  return (
    <footer style={{ background: "#1e3a8a", color: "#fff", padding: "1rem 0", marginTop: "2rem" }}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <span>© {new Date().getFullYear()} ValetXpress – Parken am Flughafen München</span>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="/impressum" className="footer-link">Impressum</Link>
          <Link href="/datenschutz" className="footer-link">Datenschutz</Link>
        </div>
      </div>
      <style jsx global>{`
        .footer-link, .footer-link:visited, .footer-link:active {
          color: #fff !important;
          text-decoration: none !important;
        }
        .footer-link:hover {
          color: #a5b4fc !important;
        }
      `}</style>
    </footer>
  );
}
