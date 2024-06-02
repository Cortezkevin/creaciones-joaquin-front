"use client";
import { createTheme } from '@mui/material/styles';
import { red, orange, brown, amber } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: brown[500],
      "600": brown[600],
      "700": brown[700],
      "800": brown[800],
      "900": brown[900]
    },
    secondary: {
      main: "#547b8a",
      "600": "#486c79",
      "700": "#3a5864",
      "800": "#2c454f",
      "900": "#1c3038"
    },
    warning: {
      main: amber[500]
    },
    error: {
      main: red[500]
    }
    /* 
    warning: {
      main: orange[400]
    },
    error: {
      main: red[300]
    },
    info: {
      main: '#fff'
    } */
  },
  components: {
   /*  MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    }, */
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      }
    },

    /* MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600
        },
        h2: {
          fontSize: 20,
          fontWeight: 400
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600
        }
      }
    }, */


    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 15,
          /* ":hover": {
            backgroundColor: 'rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease-in-out'
          } */
        }
      }
    },


    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        }
      }
    }
    
  }
});