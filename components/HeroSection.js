import Image from "next/image";

export default function HeroSection() {
  return (
    <section style={{
      width: "100vw",       // GANZE Breite
      minHeight: "80vh",
      height: "auto",
      position: "relative",
      left: "50%",
      right: "50%",
      marginLeft: "-50vw",  // GANZE Breite aus dem Flow
      marginRight: "-50vw",
      overflow: "hidden",
      background: "#000",   // Fallback
    }}>
      {/* Hintergrundbild über gesamte Breite */}
      <div style={{
        position: "absolute",
        inset: 0,
        width: "100vw",
        height: "100%",
        zIndex: 0,
      }}>
        <Image
          src="/images/Flugzeug.jpg"
          alt="Flughafen München"
          fill
          style={{
            objectFit: "cover",
          }}
          priority
        />
        {/* Overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: "rgba(30,40,60,0.52)",
        }} />
      </div>

      {/* Inhalt immer mittig und maxWidth */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "1300px",
          margin: "0 auto",
          textAlign: "center",
          padding: "90px 20px 100px 20px",
          minHeight: 440,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#1db954",
          marginBottom: 22,
          lineHeight: 1.13,
          textShadow: "0 3px 12px rgba(0,0,0,0.15)"
        }}>
          Sicher & komfortabel<br />
          am Flughafen München parken
        </h1>
        <p style={{
          fontSize: "1.45rem",
          color: "#fff",
          marginBottom: 38,
          textShadow: "0 2px 12px rgba(0,0,0,0.13)"
        }}>
          ValetXpress bietet Ihnen erstklassigen Service für sorgenfreies Parken – Fahrzeugübergabe direkt am Terminal, sichere Abstellung und Wunschreinigung.
        </p>
        <a
          href="/buchen"
          style={{
            display: "inline-block",
            background: "#1db954",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.5rem",
            borderRadius: 12,
            padding: "18px 48px",
            textDecoration: "none",
            boxShadow: "0 4px 18px 0 rgba(32,180,84,0.09)",
            transition: "background 0.2s",
          }}
        >
          Parkplatz buchen
        </a>
      </div>
    </section>
  );
}
