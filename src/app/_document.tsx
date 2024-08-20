import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        {/* Adicionando o script do VLibras no Head para garantir que ele está disponível */}
        <script src="https://vlibras.gov.br/app/vlibras-plugin.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div vw="true" className="enabled">
          <div vw-access-button="true" className="active" />
          <div vw-plugin-wrapper="true">
            <div className="vw-plugin-top-wrapper" />
          </div>
        </div>
        {/* Injetando o script inline após o carregamento do script externo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              new window.VLibras.Widget('https://vlibras.gov.br/app');
            `,
          }}
        />
      </body>
    </Html>
  );
}
