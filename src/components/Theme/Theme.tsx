import {ThemeOptions} from '@material-ui/core/es/styles/createMuiTheme';
import {createMuiTheme} from '@material-ui/core/styles';
import {PaletteOptions} from '@material-ui/core/styles/createPalette';
import {FontStyleOptions, TypographyOptions} from '@material-ui/core/styles/createTypography';
import Blue from '@material-ui/core/colors/blue';
import Red from '@material-ui/core/colors/red';

interface PaletteExtra extends PaletteOptions {
  button: any;
}

export interface ThemeCustom extends ThemeOptions {
  palette?: PaletteExtra;
  typography?: TypographyOptions | FontStyleOptions
}

const options: ThemeCustom = {
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: Blue[600],
      // main: '#f5a623',
    },
    secondary: {
      main: '#fff',
    },
    error: {
      main: Red[600],
    },
    button: {
      nav: '64px',
    },
  },
};

const theme = createMuiTheme(options);

export default theme;
