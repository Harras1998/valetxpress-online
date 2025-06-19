import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Hintergrundbild + Overlay */}
      <div className="hero-bg">
        <Image
          src="/images/Flugzeug2.png"
          alt="Flughafen München"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="hero-overlay" />
      </div>
      {/* Inhalt */}
      <div className="hero-content">
        <h1>
          Sicher & komfortabel<br />
          am Flughafen München parken
        </h1>
        <p>
          ValetXpress bietet Ihnen erstklassigen Service für sorgenfreies Parken – Fahrzeugübergabe direkt am Terminal, sichere Abstellung und Wunschreinigung.
        </p>
        <a href="/buchen" className="hero-btn">Parkplatz buchen</a>
      </div>
      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100vw;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
          box-sizing: border-box;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100%;
          z-index: 0;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: rgba(30, 40, 60, 0.60);
        }
        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          text-align: center;
          padding: 90px 20px 100px 20px;
          min-height: 440px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .hero-content h1 {
          font-size: 3rem;
          font-weight: bold;
          color: #1db954;
          margin-bottom: 22px;
          line-height: 1.13;
          text-shadow: 0 3px 12px rgba(0,0,0,0.15);
        }
        .hero-content p {
          font-size: 1.45rem;
          color: #fff;
          margin-bottom: 38px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.13);
          max-width: 600px;
        }
        .hero-btn {
          display: inline-block;
          background: #1db954;
          color: #fff;
          font-weight: bold;
          font-size: 1.5rem;
          border-radius: 12px;
          padding: 18px 48px;
          text-decoration: none;
          box-shadow: 0 4px 18px 0 rgba(32,180,84,0.09);
          transition: background 0.2s;
        }

        /* MOBILE OPTIMIERUNG */
        @media (max-width: 900px) {
          .hero-content {
            padding: 40px 8vw 44px 8vw;
            min-height: 300px;
          }
          .hero-content h1 {
            font-size: 2.4rem; /* jetzt größer */
          }
          .hero-content p {
            font-size: 1.15rem; /* jetzt größer */
          }
          .hero-btn {
            font-size: 1.23rem; /* jetzt größer */
            padding: 16px 30px;
          }
        }
        @media (max-width: 540px) {
          .hero-content {
            padding: 28px 3vw 28px 3vw;
            min-height: 160px;
          }
          .hero-content h1 {
            font-size: 1.45rem;  /* größer als vorher! */
            margin-bottom: 15px;
          }
          .hero-content p {
            font-size: 1.06rem;  /* größer als vorher! */
            margin-bottom: 20px;
          }
          .hero-btn {
            font-size: 1.11rem;  /* größer als vorher! */
            padding: 12px 16px;
            border-radius: 7px;
          }
        }
      `}</style>
    </section>
  );
}
