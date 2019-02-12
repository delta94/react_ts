import {ThemeCustom} from '@/components/Theme/Theme';
import AppBar from '@material-ui/core/AppBar';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import React, {ChangeEvent, ComponentType, Fragment, useState, useContext, useEffect, memo} from 'react';
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
import {useSearchHomeSuggestionHook} from '@/layouts/Main/SearchHome';
import MenuItemSelectWithIcon from '@/components/Custom/MenuItemSelectWithIcon';
import AsyncSelect from 'react-select/lib/Async';
import {StylesConfig} from 'react-select/lib/styles';
import {SearchSuggestRes} from '@/types/Requests/Search/SearchResponse';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';
import {RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import {ReducersType} from '@/store/reducers';
import {connect} from 'react-redux';
import {SearchFilterState} from '@/store/reducers/searchFilter';
import {newRoomLocation} from '@/store/context/Room/RoomIndexContext';

interface IProps {
  classes?: any,
}

interface LocalProps extends IProps {
  filter: SearchFilterState
}

const DatePicker = Loadable({
  loader: (): Promise<any> => import('@/components/Utils/DateRange'),
  loading: () => null,
});

const styles: any = (theme: ThemeCustom) => createStyles({
  barSearch: {
    backgroundColor: '#455A64',
    zIndex: 10,
  },
  inputSearch: {
    // height: '30px',
    width: '85%',
    border: 'none',
    fontWeight: 300,
    outline: 'none',
    backgroundColor: 'transparent',
  },
  paperSize: {
    height: 40,
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  formControl: {
    height: 40,
    width: '100%',
    borderRadius: 4,
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
    fontSize: '1rem',
  },
  searchIcon: {
    fontSize: '28px',
    width: '28px',
    height: '28px',
  },
  toolbar: {
    [theme!.breakpoints!.up!('md')]: {
      padding: 0,
      minHeight: 50,
    },
    [theme!.breakpoints!.only!('sm')]: {
      paddingLeft: 32,
      paddingRight: 32,
    },
  },
});

const searchStylesHome: StylesConfig = {
  control: (styles) => ({
    ...styles,
    border: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
  }),
  container: (styles) => ({
    ...styles,
    padding: 0,
  }),
  indicatorSeparator: (styles) => ({
    display: 'none',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#BDBDBD',
    fontWeight: 400,
  }),
  menu: (styles) => ({
    ...styles,
    width: 'calc(100% + 30vw)',
    left: '-5vw',
  }),
};

// @ts-ignore
const NavSearch: ComponentType<IProps> = (props: LocalProps) => {
  const {classes, filter} = props;
  const [time, setTime] = useState<number>(0);
  const [searchText, setSearchText] = useState('');
  const {history} = useContext<IGlobalContext>(GlobalContext);

  const {inputText, onSearch, optionSearchLabel, suggestEvent} = useSearchHomeSuggestionHook();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let type = parseInt(event.target.value);
    setTime(type);
  };

  const setSearchValue = (value: SearchSuggestRes | any) => {
    setSearchText(value.name);
  };

  const onButtonSearchClick = () => {
    const pushQuery: RoomUrlParams = {
      name: searchText,
      number_of_rooms: filter.roomsCount,
      check_in: filter.startDate,
      check_out: filter.endDate,
      number_of_guests: filter.guestsCount,
      most_popular: null,
      rent_type: time !== 0 ? time : undefined,
    };

    const location = newRoomLocation(pushQuery);
    history.push(location);
  };

  useEffect(() => {
    if (!!inputText) {
      setSearchText(inputText);
    }
  }, [inputText]);

  return (
    <Fragment>
      <AppBar position = 'sticky' elevation = {0} classes = {{root: classes.barSearch}}>
        <Toolbar classes = {{
          root: classes.toolbar,
        }}>
          <GridContainer xs = {12} sm = {12} md = {11} lg = {10} xl = {9}>
            <Grid container spacing = {8}>
              <Grid item xs = {3} sm = {4} md = {4}>
                <Paper elevation = {4} className = {classes.paperSize}>
                  <SearchIcon color = 'disabled' className = {classNames(classes.searchIcon, appC['ml-10'])} />
                  <AsyncSelect
                    name = 'search-bar'
                    defaultInputValue = ''
                    components = {{Option: MenuItemSelectWithIcon}}
                    cacheOptions
                    defaultOptions
                    getOptionLabel = {optionSearchLabel}
                    getOptionValue = {optionSearchLabel}
                    inputValue = {inputText}
                    loadOptions = {suggestEvent}
                    onInputChange = {onSearch}
                    placeholder = 'Thành phố, quận huyện, tên căn hộ, ...'
                    className = {
                      classNames(classes.inputSearch, appC['ml-20'])
                    }
                    onChange = {setSearchValue}
                    styles = {searchStylesHome}
                  />
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
                    <MenuItem value = {0}>
                      <Typography className = {classes.dayHour}>Ngày/giờ</Typography>
                    </MenuItem>
                    <MenuItem value = {2}>Theo ngày</MenuItem>
                    <MenuItem value = {1}>Theo giờ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs = {5} sm = {5} md = {4}>
                <Paper elevation = {4}
                       className = {classes.paperSize}
                >
                  <DatePicker />
                </Paper>
              </Grid>
              <Grid item xs = {1} sm = {1} md = {2}>
                <Button
                  name = 'search-navbar'
                  variant = 'contained'
                  color = 'primary'
                  fullWidth
                  onClick = {onButtonSearchClick}
                  className = {classes.btSearch}
                >
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

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter,
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps),
  withStyles(styles),
  memo,
)(NavSearch);
