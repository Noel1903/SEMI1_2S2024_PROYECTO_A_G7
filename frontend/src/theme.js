import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2ecc71', // Color principal (azul)
    },
    secondary: {
      main: '#f4d03f', // Color secundario (verde)
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;
