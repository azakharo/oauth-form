import {CSSProperties} from 'react';
import {TypographyOptions} from '@mui/material/styles/createTypography';

export const fontFamilyMain = 'Futura PT';
export const fontFamilyAdditional = 'Futura PT Book';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h1: CSSProperties;
    h2: CSSProperties;
    h3: CSSProperties;
    h3bold: CSSProperties;
    button: CSSProperties;
    b1regular: CSSProperties;
    b1semibold: CSSProperties;
    b2regular: CSSProperties;
    b2semibold: CSSProperties;
    b3regular: CSSProperties;
    b3semibold: CSSProperties;
    bigBalance: CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h1?: CSSProperties;
    h2?: CSSProperties;
    h3?: CSSProperties;
    h3bold?: CSSProperties;
    button?: CSSProperties;
    b1regular?: CSSProperties;
    b1semibold?: CSSProperties;
    b2regular?: CSSProperties;
    b2semibold?: CSSProperties;
    b3regular?: CSSProperties;
    b3semibold?: CSSProperties;
    bigBalance?: CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    ///////////////////////////////////////////////
    // disable most of builtin variants
    h4: false;
    h5: false;
    h6: false;
    body1: false;
    body2: false;
    subtitle1: false;
    subtitle2: false;
    caption: false;
    overline: false;
    // disable most of builtin variants
    ///////////////////////////////////////////////

    //=============================================
    // Variants from Figma
    h1: true;
    h2: true;
    h3: true;
    h3bold: true;
    button: true;
    b1regular: true;
    b1semibold: true;
    b2regular: true;
    b2semibold: true;
    b3regular: true;
    b3semibold: true;
    bigBalance: true;
    // Variants from Figma
    //=============================================
  }
}

export const typographyOptions: TypographyOptions = {
  fontFamily: `${fontFamilyMain}, ${fontFamilyAdditional}, sans-serif`,
  ///////////////////////////////////////////////
  // disable most of builtin variants
  h4: undefined,
  h5: undefined,
  h6: undefined,
  body1: undefined,
  body2: undefined,
  subtitle1: undefined,
  subtitle2: undefined,
  caption: undefined,
  overline: undefined,
  // disable most of builtin variants
  ///////////////////////////////////////////////

  //=============================================
  // Variants from Figma
  h1: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: '36px',
  },
  h2: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: '28px',
  },
  h3: {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '28px',
  },
  h3bold: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '28px',
  },
  button: {
    textTransform: 'none',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '23px',
  },
  b1regular: {
    fontSize: 17,
    fontWeight: 500,
    lineHeight: '24px',
  },
  b1semibold: {
    fontSize: 17,
    fontWeight: 700,
    lineHeight: '24px',
  },
  b2regular: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: '22px',
  },
  b2semibold: {
    fontSize: 15,
    fontWeight: 700,
    lineHeight: '22px',
  },
  b3regular: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: '18px',
  },
  b3semibold: {
    fontSize: 13,
    fontWeight: 700,
    lineHeight: '18px',
  },
  // Variants from Figma
  //=============================================
};

export default typographyOptions;
