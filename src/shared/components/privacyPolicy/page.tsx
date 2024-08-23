'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const PrivacyPolicy = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Política de Privacidade
          </Typography>
          <Typography variant="body1" paragraph>
            Esta Política de Privacidade descreve como a Defensoria Pública de Rondônia coleta, usa e compartilha informações pessoais quando você utiliza nossos serviços. Ao utilizar nosso sistema, você concorda com a coleta e o uso das informações de acordo com esta política.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            1. Informações que Coletamos
          </Typography>
          <Typography variant="body1" paragraph>
            Coletamos informações pessoais que você fornece diretamente, como nome, e-mail, e outras informações necessárias para a prestação de nossos serviços. Também coletamos informações automaticamente através de cookies e tecnologias semelhantes.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            2. Como Usamos suas Informações
          </Typography>
          <Typography variant="body1" paragraph>
            Utilizamos suas informações para fornecer e melhorar nossos serviços, responder a suas solicitações e garantir a segurança de nossas operações. Podemos também utilizar suas informações para fins analíticos e de marketing.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            3. Compartilhamento de Informações
          </Typography>
          <Typography variant="body1" paragraph>
            Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para cumprir obrigações legais ou com seu consentimento explícito.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            4. Segurança
          </Typography>
          <Typography variant="body1" paragraph>
            Tomamos medidas razoáveis para proteger suas informações pessoais contra acesso não autorizado, uso indevido ou divulgação. No entanto, nenhum sistema de segurança é infalível e não podemos garantir a segurança absoluta de suas informações.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            5. Seus Direitos
          </Typography>
          <Typography variant="body1" paragraph>
            Você tem o direito de acessar, corrigir ou excluir suas informações pessoais, bem como de se opor ao tratamento de suas informações em determinadas circunstâncias. Para exercer esses direitos, entre em contato conosco.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            6. Alterações nesta Política
          </Typography>
          <Typography variant="body1" paragraph>
            Podemos atualizar esta Política de Privacidade periodicamente. Quaisquer alterações serão publicadas nesta página e a data da última atualização será revisada no topo da política.
          </Typography>
          <Typography variant="body1" paragraph>
            Se você tiver alguma dúvida sobre esta política, entre em contato conosco pelo e-mail <Link href="mailto:contato@defensoriapublica.ro.gov.br">contato@defensoriapublica.ro.gov.br</Link>.
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default PrivacyPolicy;
