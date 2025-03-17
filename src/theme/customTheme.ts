import { createTheme, ThemeOptions } from '@mui/material/styles';

// Extend the default theme to include custom color options
declare module '@mui/material/styles' {
  interface Palette {
    outlineColor: {
      color: {
        main: string;
      };
      name: string;
    };
    customSuccess: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
  
  interface PaletteOptions {
    outlineColor?: {
      color: {
        main: string;
      };
      name: string;
    };
    customSuccess?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#607d8b',  // Tennis ball green
    },
    secondary: {
      main: '#fff',  // White for contrast
    },
    text: {
      primary: '#212529',  // Darker text for readability
      secondary: '#607d8b',  // Lighter text for secondary elements
    },
    outlineColor: {
      color: {
        main: "pink"
      },
      name: "outlineColor"
    },
    customSuccess: {
      main: '#5cb85c',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
  typography: {
    fontFamily: "Libre Franklin, sans-serif",
    h6: {
      fontWeight: 500,  // Slightly bolder heading
      lineHeight: 1.25,  // Increased line height for better spacing
    },
    button: {
      textTransform: 'none',  // Avoid all uppercase for a less aggressive look
    },
  },
  components: {
    MuiCssBaseline: { // Load the font using @font-face
      styleOverrides: `
        @font-face {
          font-family: 'Libre Franklin';
          font-style: normal;
          font-display: swap;
          font-weight: 400; // Regular weight
        }
      `,
    },
  },
};

export const customTheme = createTheme(themeOptions);