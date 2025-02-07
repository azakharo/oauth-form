import {colors} from '@mui/material';
import {ruRU} from '@mui/material/locale';
import {createTheme} from '@mui/material/styles';

import {
  COLOR__ERROR,
  COLOR__INFO,
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
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true,
        },
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained',
        },
        // styleOverrides: {
        //   root: ({ownerState}) => ({
        //     gap: theme.spacing(1),
        //     ...(ownerState.variant === 'contained' && {
        //       '&.Mui-disabled': {
        //         background: COLOR__BG_2,
        //         color: COLOR__BG_6,
        //       },
        //     }),
        //   }),
        //   sizeLarge: {
        //     padding: '16px 20px',
        //     // titleMedium typography variant
        //     fontSize: 15,
        //     fontWeight: 500,
        //     lineHeight: '20px',
        //   },
        //   sizeMedium: {
        //     padding: 12,
        //     // label2 typography variant
        //     fontSize: 14,
        //     fontWeight: 400,
        //     lineHeight: '16px',
        //   },
        // },
      },
      // MuiTextField: {
      //   variants: [
      //     {
      //       props: {variant: 'outlined'},
      //       style: {
      //         '& input': {
      //           padding: '14px 12px',
      //           fontSize: 15,
      //           fontWeight: 400,
      //           lineHeight: '20px',
      //         },
      //         '& input::placeholder': {
      //           color: COLOR__GRAY,
      //           fontSize: 15,
      //           fontWeight: 400,
      //           lineHeight: '20px',
      //           opacity: 1,
      //         },
      //         border: 'none',
      //         '& fieldset': {
      //           // Stuff necessary for placing label above TextField (outside)
      //           // https://github.com/mui/material-ui/issues/30379#issuecomment-1175806105
      //           top: 0,
      //           borderRadius: '4px',
      //           border: `1px solid ${COLOR__BG_5}`,
      //         },
      //         '&:hover fieldset': {
      //           border: `1px solid ${COLOR__BG_6} !important`,
      //         },
      //         '&:focus-within fieldset, &:focus-visible fieldset': {
      //           border: `2px solid ${COLOR__VIOLET_LIGHT} !important`,
      //         },
      //         '& .MuiInputBase-root.Mui-disabled': {
      //           backgroundColor: COLOR__BG_1,
      //         },
      //         // Stuff necessary for placing label above TextField (outside)
      //         // https://github.com/mui/material-ui/issues/30379#issuecomment-1175806105
      //         '& legend': {display: 'none'},
      //       },
      //     },
      //   ],
      // },
      // MuiInputLabel: {
      //   defaultProps: {
      //     shrink: true,
      //   },
      //   styleOverrides: {
      //     root: {
      //       color: `${COLOR__GRAY} !important`,
      //       fontSize: 14,
      //       fontWeight: 400,
      //       lineHeight: '16px',
      //     },
      //     // Stuff necessary for placing label above TextField (outside)
      //     // https://github.com/mui/material-ui/issues/30379#issuecomment-1175806105
      //     shrink: {
      //       transform: 'translate(0px, -20px) scale(1) !important',
      //     },
      //   },
      // },
      // MuiFormHelperText: {
      //   styleOverrides: {
      //     root: {
      //       marginLeft: 0,
      //       fontSize: 12,
      //       fontWeight: 400,
      //     },
      //   },
      // },
      MuiTypography: {
        defaultProps: {
          variant: 'b1regular',
        },
      },
    },
    typography,
  },
  ruRU,
);

export default theme;
