import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';


export default async  function Home() {

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }} style={{
          alignItems: 'center'
        }}>
          
          
        </Typography>
        <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link>
        
      </Box>
    </Container>
  );
}
