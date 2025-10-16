import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        {/* Additiv: bindet das CSS-Override aus /public ein */}
        <link rel="stylesheet" href="/vx-edit-override.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
