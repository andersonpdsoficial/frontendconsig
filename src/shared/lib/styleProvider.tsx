import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'; // Slot nomeado
import { ThemeProvider } from '@mui/material/styles';
import theme from '../themes/theme';

interface Props {
    children: React.ReactNode;
}

export function StyleProvider({ children }: Props) {
    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline inicia uma base elegante, consistente e simples para construir. */}
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
