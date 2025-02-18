// This import is necessary for theming mui/lab components
// noinspection ES6UnusedImports
import type {} from '@mui/lab/themeAugmentation';
import {CircularProgress, colors} from '@mui/material';
import {ruRU} from '@mui/material/locale';
import {createTheme} from '@mui/material/styles';

import {
  COLOR__BACK,
  COLOR__ERROR,
  COLOR__INFO,
  COLOR__LIGHT_GRAY,
  COLOR__LINE,
  COLOR__MAIN_BLACK,
  COLOR__PRIMARY,
  COLOR__SECONDARY,
  COLOR__SUCCESS,
  COLOR__TEXT_DISABLED,
  COLOR__TEXT_PRIMARY,
  COLOR__TEXT_SECONDARY,
  COLOR__WARNING,
} from './colors';
import typography from './typography';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    desktop: true;
  }
}

const theme = createTheme(
  {
    palette: {
      primary: {
        main: COLOR__PRIMARY,
        contrastText: COLOR__MAIN_BLACK,
      },
      secondary: {
        main: COLOR__SECONDARY,
        contrastText: colors.common.white,
      },
      error: {
        main: COLOR__ERROR,
      },
      warning: {
        main: COLOR__WARNING,
      },
      info: {
        main: COLOR__INFO,
        contrastText: colors.common.white,
      },
      success: {
        main: COLOR__SUCCESS,
      },
      text: {
        primary: COLOR__TEXT_PRIMARY,
        secondary: COLOR__TEXT_SECONDARY,
        disabled: COLOR__TEXT_DISABLED,
      },
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 768,
        desktop: 1440,
      },
    },
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true,
        },
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained',
          disableRipple: true,
        },
        styleOverrides: {
          root: ({ownerState}) => ({
            borderRadius: 15,
            ...(ownerState.variant === 'contained' && {
              '&:hover': {
                backgroundColor: '#FFA806',
              },
              '&:active': {
                backgroundColor: '#FFA806',
              },
              // Вариант из Фигмы закомментарен, т.к. меньше нравится
              // '&.Mui-disabled': {
              //   opacity: 0.2,
              //   backgroundColor: COLOR__LINE,
              //   color: COLOR__MAIN_BLACK,
              // },
            }),
            ...(ownerState.variant === 'outlined' && {
              backgroundColor: '#FFFAEC',
              color: '#FFA806',
              border: '1px solid transparent',
              '& span.MuiCircularProgress-root': {
                color: COLOR__PRIMARY,
              },
              '&.Mui-disabled': {
                backgroundColor: '#FFFAEC',
                color: '#FFE083',
                border: '1px solid transparent',
              },
            }),
          }),
          sizeMedium: {
            padding: '14px 32px',
          },
        },
      },
      MuiTextField: {
        variants: [
          {
            props: {variant: 'outlined'},
            style: {
              '& input': {
                padding: '10px 16px',
                lineHeight: '20.5px',
                color: COLOR__MAIN_BLACK,
              },
              '& input::placeholder': {
                color: COLOR__LIGHT_GRAY,
                lineHeight: '20.5px',
              },
              border: 'none',
              '& fieldset': {
                // Stuff necessary for placing label above TextField (outside)
                // https://github.com/mui/material-ui/issues/30379#issuecomment-1175806105
                top: 0,
                borderRadius: '10px',
                border: `1px solid ${COLOR__LINE}`,
              },
              '&:hover fieldset': {
                border: `1px solid ${COLOR__LIGHT_GRAY} !important`,
              },
              '&:focus-within fieldset, &:focus-visible fieldset': {
                border: `1px solid ${COLOR__PRIMARY} !important`,
              },
              '& .MuiInputBase-root.Mui-disabled': {
                backgroundColor: COLOR__BACK,
              },
              // Stuff necessary for placing label above TextField (outside)
              // https://github.com/mui/material-ui/issues/30379#issuecomment-1175806105
              '& legend': {display: 'none'},
              '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: -20,
              },
            },
          },
        ],
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
        styleOverrides: {
          root: {
            color: `${COLOR__MAIN_BLACK} !important`,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '18px',
          },
          // Stuff necessary for placing label above TextField (outside)
          // https://github.com/mui/material-ui/issues/30379#issuecomment-1175806105
          shrink: {
            transform: 'translate(0px, -24px) scale(1) !important',
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            // align v8n message to the left edge of input
            marginLeft: 0,
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '18px',
            color: '#E05225 !important',
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variant: 'b1light',
        },
      },
      MuiLoadingButton: {
        defaultProps: {
          variant: 'contained',
          loadingIndicator: (
            <CircularProgress size={20} sx={{color: COLOR__MAIN_BLACK}} />
          ),
        },
      },
    },
    typography,
  },
  ruRU,
);

export default theme;
