import * as React from 'react';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const COOKIE_ACCEPTED = 'cookiesAccepted';

export default function CookiesBanner() {
  const [bannerOpen, setBannerOpen] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  React.useEffect(() => {
    const cookiesStatus = localStorage.getItem(COOKIE_ACCEPTED);
    if (!cookiesStatus) {
      setBannerOpen(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem(COOKIE_ACCEPTED, 'true');
    setBannerOpen(false);
  };

  const handleRejectCookies = () => {
    setShowConfirmation(true);
  };

  const handleContinueRejecting = () => {
    localStorage.setItem(COOKIE_ACCEPTED, 'rejected');
    setShowConfirmation(false);
    setBannerOpen(false);
  };

  const handleAcceptAfterReject = () => {
    localStorage.removeItem(COOKIE_ACCEPTED);
    handleAcceptCookies();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      
      <Modal
        open={bannerOpen && !showConfirmation}
        onClose={() => setBannerOpen(false)}
        aria-labelledby="cookie-banner"
        aria-describedby="cookie-banner-description"
      >
        <Fade in={bannerOpen}>
          <Paper
            role="dialog"
            aria-modal="true"
            aria-label="Cookie banner"
            square
            variant="outlined"
            tabIndex={-1}
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              m: 0,
              p: 2,
              borderWidth: 0,
              borderTopWidth: 1,
              borderColor: '#0D7B52',
              color: '#0D7B52',
              backgroundColor: '#F0F8F8',
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              gap={2}
            >
              <Box
                sx={{
                  flexShrink: 1,
                  alignSelf: { xs: 'flex-start', sm: 'center' },
                }}
              >
                <Typography fontWeight="bold">Este site utiliza cookies</Typography>
                <Typography variant="body2">
                  Utilizamos cookies para melhorar sua experiência e personalizar o conteúdo. Ao continuar a navegação, você concorda com nossa <a href='/shared/components/privacyPolicy/page' style={{ color: '#1aa2cc' }}>Política de Privacidade</a>.
                </Typography>
              </Box>
              <Stack
                gap={2}
                direction={{ xs: 'row-reverse', sm: 'row' }}
                sx={{
                  flexShrink: 0,
                  alignSelf: { xs: 'flex-end', sm: 'center' },
                }}
              >
                <Button size="small" onClick={handleAcceptCookies} variant="contained" sx={{ backgroundColor: '#0D7B52', color: '#FFF' }}>
                  Aceitar cookies
                </Button>
                <Button size="small" onClick={handleRejectCookies}>
                  Rejeitar cookies
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      </Modal>
      
      <Modal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        aria-labelledby="cookie-rejection-confirmation"
        aria-describedby="cookie-rejection-confirmation-description"
      >
        <Fade in={showConfirmation}>
          <Paper
            role="dialog"
            aria-modal="true"
            aria-label="Cookie rejection confirmation"
            square
            variant="outlined"
            tabIndex={-1}
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              m: 0,
              p: 2,
              borderWidth: 0,
              borderTopWidth: 1,
              borderColor: '#0D7B52',
              color: '#0D7B52',
              backgroundColor: '#F0F8F8',
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              gap={2}
            >
              <Box
                sx={{
                  flexShrink: 1,
                  alignSelf: { xs: 'flex-start', sm: 'center' },
                }}
              >
                <Typography fontWeight="bold">Para melhorar a sua experiência</Typography>
                <Typography variant="body2">
                  Para melhorar a sua experiência na plataforma e prover serviços personalizados, utilizamos cookies. Tem certeza que quer rejeitar?
                </Typography>
              </Box>
              <Stack
                gap={2}
                direction={{ xs: 'row-reverse', sm: 'row' }}
                sx={{
                  flexShrink: 0,
                  alignSelf: { xs: 'flex-end', sm: 'center' },
                }}
              >
                <Button size="small" onClick={handleContinueRejecting} variant="contained" sx={{ backgroundColor: '#FF4D4F', color: '#FFF' }}>
                  Continuar Rejeitando
                </Button>
                <Button size="small" onClick={handleAcceptAfterReject}>
                  Desejo Aceitar Cookies
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
