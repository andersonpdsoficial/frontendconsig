'use client'
import {  Typography, Button, Grid, Box } from "@mui/material";
import React from "react";
import { useRouter } from 'next/navigation';
import CustomizedList from "@/shared/components/menu-lateral/Demo";
import FloatingSearchButton from "@/shared/components/buttons/FloatingSearchButton";
import CookiesBanner from "@/shared/components/cookiesBanner/CookiesBanner";


const Movimentos: React.FC = () => {

    const router = useRouter(); 

    const handleconsignacaoMensalClick = () => {
        router.push('/movimentos/exportacao/consignacaoMensal');
      };

    return (
        <Box sx={{ display: 'flex'  ,backgroundColor: '#E0F2F1',}}>
                  <CustomizedList />
                  <FloatingSearchButton />
                  <CookiesBanner />
      
                  <Box sx={{ flexGrow: 1,   backgroundColor: '#E0F2F1'}}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' , padding: 4 }}>
                Exportação de Consignação Mensal
              </Typography>
              </Box>
              <Grid item xs={3}>
                          <Button
                            variant="contained"
                            fullWidth
                            
                            sx={{ height: 100, borderRadius: 2, backgroundColor: '#0D7B52' }}
                            onClick={handleconsignacaoMensalClick}
                          >
                            Consignações mensais
                          </Button>
                        </Grid>
          </Box>        
          )
}
export default Movimentos

