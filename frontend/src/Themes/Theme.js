import { createTheme } from '@mui/material/styles';

const font = "'Noto Sans TC', sans-serif";

const globalPalette = createTheme({
  status: {
    danger: '#FF2E00',
  },
  palette: {
    primary: {
      main: '#00D1FF',
      500: '#00D1FF', // main
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#00FFC2',
      500: '#00FFC2',
      contrastText: '#ffffff'
    },
    black: {
      main: '#000000',
      500: '#000000',
      contrastText: '#ffffff'
    },
    white: {
      main: '#ffffff',
      500: '#ffffff',
      contrastText: '#000000'
    },
    grey: {
      main: '#5C5C5C',
      300: '#DBDBDB',
      500: '#CCCCCC',
      700: '#5C5C5C',
    },    
    warning: {
      main: '#FF2E00',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#FF2E00',
      contrastText: '#FFFFFF'
    },
    OCEAN_O: {
      main: '#4FC1E8',
      500: '#4FC1E8'
    },
    OCEAN_C: {
      main: '#AC92EB',
      500: '#AC92EB'
    },
    OCEAN_E: {
      main: '#FFCE54',
      500: '#FFCE54'
    },
    OCEAN_A: {
      main: '#A0D568',
      500: '#A0D568'
    },
    OCEAN_N: {
      main: '#ED5564',
      500: '#ED5564'
    }
  },
  typography: {
    fontFamily: font,
    h1: {
      fontSize: '48px',
      fontWeight: '600',
      lineHeight: 1.4,
    },
    h2: {
      fontSize: '24px',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '18px',
      fontWeight: '600',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '18px',
      lineHeight: 1.5,
    },
    button: {
      color: "#000000",
      fontSize: '12px',
      lineHeight: '1.5',
    },
    caption: {
      fontSize: '12px',
      lineHeight: 1.5,
    }
  },
})

const theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            borderRadius: '16px',
            height: '64px',
            backgroundColor: globalPalette.palette.primary.main,
            "&:hover":{
              backgroundColor: globalPalette.palette.primary[300],
            },
            "&:active":{
              backgroundColor: globalPalette.palette.primary[300],
            },
            "&:focus":{
              backgroundColor: globalPalette.palette.primary.main,
            },
            "&:disabled":{
              backgroundColor: globalPalette.palette.grey[300],
            }
          },
          
        },
        {
          props: { variant: 'secondary' },
          style: {
            borderRadius: '45px',
            height: '48px',
            backgroundColor: globalPalette.palette.secondary.main,
            "&:hover":{
              backgroundColor: globalPalette.palette.secondary[300],
            },
            "&:active":{
              backgroundColor: globalPalette.palette.secondary[300],
            },
            "&:focus":{
              backgroundColor: globalPalette.palette.secondary.main,
            },
          },
        },
        {
          props: { variant: 'secondary2' },
          style: {
            borderRadius: '33px',
            height: '48px',
            backgroundColor: "#ffffff",
            "&:hover":{
              backgroundColor: globalPalette.palette.primary[300],
            },
            "&:active":{
              backgroundColor: globalPalette.palette.primary[300],
            },
            "&:focus":{
              backgroundColor: "#ffffff",
            },
          },
        },
        {
          props: { variant: 'secondary3' },
          style: {
            color: globalPalette.palette.error.main,
            borderRadius: '33px',
            height: '48px',
            backgroundColor: "#ffffff",
            "&:hover":{
              backgroundColor: globalPalette.palette.error.main,
              color: globalPalette.palette.error.contrastText,
            },
            "&:active":{
              backgroundColor: globalPalette.palette.error.main,
              color: globalPalette.palette.error.contrastText,
            },
          },
        },
        {
          props: { variant: 'secondary4' },
          style: {
            color: globalPalette.palette.secondary[700],
            borderRadius: '33px',
            height: '48px',
            backgroundColor: globalPalette.palette.secondary[100],
            "&:hover":{
              backgroundColor: globalPalette.palette.secondary[100],
            },
            "&:active":{
              backgroundColor: globalPalette.palette.secondary[700],
              color: globalPalette.palette.secondary[100],
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            color: globalPalette.palette.primary.main,
            backgroundColor: "#fff",
            borderRadius: '16px',
            height: '64px',
          },
        },
        {
          props: { variant: 'toggle' },
          style: {
            borderRadius: '8px',
            height: '28px',
            width: '28px',
            backgroundColor: 'transparent',
            "&:disabled":{
              backgroundColor: 'transparent',
            },
          },
        },
      ],
    },
  },
}, globalPalette);

export default theme;