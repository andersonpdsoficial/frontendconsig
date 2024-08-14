'use client';
import { createTheme } from "@mui/material";
import { green,cyan } from "@mui/material/colors";
export  const LightTheme =createTheme( {
    palette:{
        primary:{
            main: green[700],
            dark: green[800],
            light: green[500] ,
            contrastText:' #ffffff' ,
        },
        secondary:{
            main: cyan[500] ,
            dark: cyan[400],
            light: cyan[300] ,
            contrastText:' #ffffff' ,
        },
        background:{
            default: '#f7f6f3', /* Esse vai ser um cinza claro no fundo como de padão pr aplicação */
            paper: '#ffffff', /* vai ser um destaque no card */
        }
    }
 })
