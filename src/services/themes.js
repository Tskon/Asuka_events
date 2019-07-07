import {createMuiTheme} from "@material-ui/core"

export default {
  dark: createMuiTheme({
    typography: {
      fontFamily: [
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Arial',
        'sans-serif',
      ].join(','),
      useNextVariants: true,
    },
    palette: {
      type: 'dark',
      primary: { main: '#fdc073' },
      secondary: { main: '#498161' },
    },
  }),
  light: createMuiTheme({
    typography: {
      fontFamily: [
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Arial',
        'sans-serif',
      ].join(','),
      useNextVariants: true,
    },
    palette: {
      type: 'light',
    },
  })}
