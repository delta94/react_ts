import {ThemeCustom} from '@/components/Theme/Theme';
import AppBar from '@material-ui/core/AppBar';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Toolbar from '@material-ui/core/Toolbar';
import React, {ChangeEvent, ComponentType, Fragment, useState} from 'react';
import {compose} from 'recompose';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import GridContainer from "@/layouts/Grid/Container";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import appC from '@/styles/App.module.scss';
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Loadable from "react-loadable";
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
    zIndex: 999,
  },
  inputSearch: {
    height: '30px',
    width: '85%',
    border: 'none',
    fontSize: '1.2em',
    fontWeight: 300,
    outline: 'none',
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
  }
});

const NavSearch: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;
  const [time, setTime] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTime(event.target.value);
  };
  return (
    <Fragment>
      <AppBar position = 'sticky' elevation = {0} classes = {{root: classes.barSearch}}>
        <Toolbar>
          <GridContainer xs = {12} sm = {10} md = {10} lg = {10}>
            <Grid container spacing = {16}>
              <Grid item xs = {4}>
                <Paper elevation = {4} className = {classes.paperSize} square>
                  <SearchIcon fontSize = 'large' color = 'disabled' className = {appC['ml-10']} />
                  <input type = 'text'
                         name = 'name'
                         defaultValue = ''
                         className = {
                           classNames(classes.inputSearch, appC['ml-20'])
                         }
                         placeholder = 'Enter a destination or property' />
                </Paper>
              </Grid>
              <Grid item xs = {2}>
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
                      <Typography variant = 'body1' color = 'textSecondary'>Day/Hour</Typography>
                    </MenuItem>
                    <MenuItem value = {"Day"}>Day</MenuItem>
                    <MenuItem value = {"Hour"}>Hours</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs = {4}>
                <Paper elevation = {4}
                       className = {classes.paperSize}
                       square>
                  <DatePicker />
                </Paper>
              </Grid>
              <Grid item xs = {2}>
                <Button variant = {"contained"} color = {"primary"} fullWidth className = {classes.btSearch}
                        size = {'large'}>
                  Search
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
