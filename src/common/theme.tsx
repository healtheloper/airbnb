import { createTheme } from '@mui/material/styles';
import React from 'react';

import color from '@constants/color';
import fontSize from '@constants/fontSize';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    input1: React.CSSProperties;
    input2: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    input1?: React.CSSProperties;
    input2?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    input1: true;
    input2: true;
  }
}

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
