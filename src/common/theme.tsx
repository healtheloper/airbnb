import { createTheme } from '@mui/material/styles';

import color from '@constants/color';
import fontSize from '@constants/fontSize';

export const theme = createTheme({
  palette: {
    info: {
      main: color.white,
    },
    primary: {
      main: color.primary,
    },
    secondary: {
      main: color.secondary,
    },
  },
  typography: {
    input1: {
      color: color.grey2,
      fontSize: fontSize.fontDefault,
    },
    input2: {
      color: color.grey3,
      fontSize: fontSize.fontSmall,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: fontSize.fontDefault,
        },
        h6: {
          fontSize: fontSize.fontSmall,
          fontWeight: 900,
        },
      },
    },
  },
});
