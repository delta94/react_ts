import {ThemeCustom} from '@/components/Theme/Theme';
import AppBar from '@material-ui/core/AppBar';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import React, {ChangeEvent, ComponentType, Fragment, useState} from 'react';
import {compose} from 'recompose';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import GridContainer from '@/layouts/Grid/Container';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import appC from '@/styles/App.module.scss';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Loadable from 'react-loadable';
import '@/styles/date-picker.scss';
import '@/styles/Airbnb/date-picker-NavSearch.scss';

interface IProps {
  classes?: any,
}

const DatePicker = Loadable({
  loader: (): Promise<any> => import('@/components/Utils/DateRange'),
  loading: () => null,
});

const styles: any = (theme: ThemeCustom) => createStyles({
  barSearch: {
    backgroundColor: 'rgba(39, 55, 64, 1)',
    zIndex: 10,
  },
  inputSearch: {
    height: '30px',
    width: '85%',
    border: 'none',
    fontSize: '1.5vw',
    fontWeight: 300,
    outline: 'none',
    backgroundColor: 'transparent',
  },
  paperSize: {
    height: 50,
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  formControl: {
    height: 50,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  inputOutline: {
    border: 'none',
  },
  btSearch: {
    height: '100%',
    minWidth: '100%',
  },
  dayHour: {
    fontSize: '1.5vw',
  },
  searchIcon: {
    fontSize: '28px',
    width: '28px',
    height: '28px',
  },
});

const NavSearch: ComponentType<IProps> = (props: IProps) => {
  const {classes}       = props;
  const [time, setTime] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTime(event.target.value);
  };
  return (
    <Fragment>
      <AppBar position = 'sticky' elevation = {0} classes = {{root: classes.barSearch}}>
        <Toolbar>
          <GridContainer xs = {12} sm = {12} md = {11} lg = {10}>
            <Grid container spacing = {16}>
              <Grid item xs = {3} sm = {4} md = {4}>
                <Paper elevation = {4} className = {classes.paperSize} square>
                  <SearchIcon color = 'disabled' className = {classNames(classes.searchIcon, appC['ml-10'])} />
                  <input type = 'text'
                         name = 'name'
                         defaultValue = ''
                         className = {
                           classNames(classes.inputSearch, appC['ml-10'])
                         }
                         placeholder = 'Enter a destination or property' />
                </Paper>
              </Grid>
              <Grid item xs = {1} sm = {2} md = {2}>
                <FormControl variant = 'outlined' className = {classes.formControl}>
                  <Select
                    displayEmpty
                    value = {time}
                    onChange = {handleChange}
                    input = {
                      <OutlinedInput
                        notched = {false}
                        labelWidth = {0}
                        name = 'time'
                        id = 'outlined-time-simple'
                        classes = {{notchedOutline: classes.inputOutline}}
                      />
                    }
                  >
                    <MenuItem value = '' disabled>
                      <Typography className = {classes.dayHour} color = 'textSecondary'>Theo ngày/giờ</Typography>
                    </MenuItem>
                    <MenuItem value = 'Day'>Theo ngày</MenuItem>
                    <MenuItem value = 'Hour'>Theo giờ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs = {5} sm = {5} md = {4}>
                <Paper elevation = {4}
                       className = {classes.paperSize}
                       square>
                  <DatePicker />
                </Paper>
              </Grid>
              <Grid item xs = {1} sm = {1} md = {2}>
                <Button variant = 'contained' color = 'primary' fullWidth className = {classes.btSearch}>
                  <Hidden mdUp>
                    <SearchIcon className = {classes.searchIcon} />
                  </Hidden>
                  <Hidden smDown>
                    Tìm kiếm
                  </Hidden>
                </Button>
              </Grid>
            </Grid>
          </GridContainer>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(NavSearch);
