import { cyan, yellow } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const DarkTheme =createTheme( { 
    palette:{
        primary:{
            main: yellow[700] ,
            dark: yellow[800],
            light: yellow[500] ,
            contrastText:' #ffffff' ,
        },
        secondary:{
            main: cyan[500] ,
            dark: cyan[400],
            light: cyan[300] ,
            contrastText:' rgb(255, 255, 255)' ,
        },
        background:{
            default: '#303134', /* Esse vai ser um cinza claro no fundo como de padão pr aplicação */
            paper: '#202124', /* vai ser um destaque no card */
        }
    }
})
