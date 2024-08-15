// eslint-disable-next-line @next/next/no-document-import-in-page
import { Html,  NextScript, Main, Head } from "next/document";



export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head />
      <body>
        <Main />
        <NextScript />
  <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
  <script>
    new window.VLibras.Widget('https://vlibras.gov.br/app');
  </script>
      </body>
    </Html>
  );
}
