import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    input1: React.CSSProperties;
    input2: React.CSSProperties;
    footer1: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    input1?: React.CSSProperties;
    input2?: React.CSSProperties;
    footer1?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    input1: true;
    input2: true;
    footer1: true;
  }
}
