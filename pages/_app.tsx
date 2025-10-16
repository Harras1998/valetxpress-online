import type { AppProps } from "next/app";
import Script from "next/script";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Additiv: lädt den robusten Aktivator aus /public nach Interaktivität */}
      <Script src="/vx-edit-activate.js" strategy="afterInteractive" />
      <Component {...pageProps} />
    </>
  );
}
