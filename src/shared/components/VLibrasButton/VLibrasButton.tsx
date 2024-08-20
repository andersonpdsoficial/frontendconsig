'use client'

import type { NextPage } from "next";
import Script from "next/script";


const VLibrasNext: NextPage = () => {
  return (
    <>
      <div vw="true" className="enabled">
            <div vw-access-button="true" className="active" />
            <div vw-plugin-wrapper="true">
              <div className="vw-plugin-top-wrapper" />
            </div>
          </div>
          <Script src="https://vlibras.gov.br/app/vlibras-plugin.js"></Script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                new window.VLibras.Widget('https://vlibras.gov.br/app');
              `,
            }}
          />
          </>

  );
};

export default VLibrasNext;
