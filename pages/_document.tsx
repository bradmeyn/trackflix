import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="flex min-h-screen grow flex-col bg-gradient-to-t from-slate-800 to-slate-900 ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
