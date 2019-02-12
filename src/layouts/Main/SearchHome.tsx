import {ThemeCustom} from '@/components/Theme/Theme';
import GuestSelect from '@/components/Utils/GuestSelect';
import {ReducersType} from '@/store/reducers';
import {SearchFilterState} from '@/store/reducers/searchFilter';
import appC from '@/styles/App.module.scss';
import {FormikProps} from '@/types/Interface/Formik';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Gray from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {createStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import People from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';
import {Formik, FormikActions} from 'formik';
import React, {FunctionComponent, useState, memo} from 'react';
import Loadable from 'react-loadable';
import {connect} from 'react-redux';
import {RouterProps} from 'react-router';
import {withRouter, RouteProps} from 'react-router-dom';
import {compose} from 'recompose';
import {Dispatch} from 'redux';
import * as Yup from 'yup';
import {RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import Hidden from '@material-ui/core/Hidden/Hidden';
import DatePickerHomeXsOnly from '@/views/Homepage/DatePicker/DatePickerHomeXsOnly';
import AsyncSelect from 'react-select/lib/Async';
import {InputActionMeta} from 'react-select/lib/types';
import {StylesConfig} from 'react-select/lib/styles';
import MenuItemSelectWithIcon from '@/components/Custom/MenuItemSelectWithIcon';
import {searchSuggest} from '@/store/context/searchSuggestion';
import {SearchSuggestRes} from '@/types/Requests/Search/SearchResponse';
import axiosBase from 'axios';
import {newRoomLocation} from '@/store/context/Room/RoomIndexContext';

const DatePicker = Loadable({
  loader: (): Promise<any> => import('@/components/Utils/DateRange'),
  loading: () => null,
});

interface IProps extends RouteProps, RouterProps {
  classes?: any;
  filter: SearchFilterState
}

type FormikValues = {
  name: string
}

const FormikInit: FormikValues = {
  name: '',
};

const FormValidationSchema = Yup.object().shape({
  name: Yup.string(),
});

const styles: any = (theme: ThemeCustom) => createStyles({
  heading: {
    textTransform: 'uppercase',
  },
  fontSize: {
    fontSize: '1.1rem',
  },
  button: {
    margin: theme.spacing!.unit,
  },
  modal: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '15%',
    width: '40%',
    padding: 40,
  },
  inputSearch: {
    [theme!.breakpoints!.only!('xs')]: {
      width: '75%',
    },
    // height: '30px',
    width: '85%',
    border: 'none',
    fontSize: '1.2em',
    fontWeight: 300,
    outline: 'none',
  },
  paperSize: {
    height: 60,
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  searchButton: {
    height: '100%',
    width: '100%',
    fontSize: '1.2rem',
  },
  grayLighten1: {
    color: Gray[600],
  },
  spinner: {
    width: '30px !important',
    height: '30px !important',
  },
  marginSearch: {
    marginLeft: 21,
  },
});

export const searchStylesHome: StylesConfig = {
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
    color: 'black',
  }),
  menu: (styles) => ({
    ...styles,
    width: 'calc(100% + 5vw)',
    left: '-5vw',
  }),
};

export const useSearchHomeSuggestionHook = () => {
  const [searchText, setSearchText] = useState('');

  const suggestEvent = (value: string, cb: (result: any[]) => void) => {
    if (!value) cb([]);
    searchSuggest(value).then(data => {
      cb(data);
    }).catch(err => {
      if (!axiosBase.isCancel(err)) {
        cb([{
          error: 'Có lỗi xảy ra. Vui lòng thử lại',
        }]);
      }
    });
  };

  const onSearch = (value: string, meta: InputActionMeta) => {
    let {action} = meta;
    if (action === 'menu-close' || action === 'input-blur') return;

    setSearchText(value);
    return value;
  };

  const optionSearchLabel = (option: SearchSuggestRes) => option.name;

  return {inputText: searchText, suggestEvent, onSearch, optionSearchLabel};
};

const SearchHome: FunctionComponent<IProps | any> = (props: IProps) => {
  const {classes, filter, history} = props;
  const {bookingType}              = filter;

  const {inputText, onSearch, optionSearchLabel, suggestEvent} = useSearchHomeSuggestionHook();

  return (
    <Grid item lg = {6} md = {7} xs = {12}>
      <Typography variant = 'h4' className = {classes.heading} color = 'secondary' gutterBottom>
        Homestay tốt nhất
      </Typography>
      <Typography variant = 'subtitle1' color = 'secondary' className = {classes.fontSize}>
        Giá luôn luôn tốt
      </Typography>
      <Formik
        initialValues = {FormikInit}
        validationSchema = {() => FormValidationSchema}
        validateOnChange = {false}
        // validateOnBlur = {false}
        onSubmit = {(values: FormikValues, actions: FormikActions<FormikValues>) => {

          const pushQuery: RoomUrlParams = {
            name: values.name,
            number_of_rooms: filter.roomsCount,
            check_in: filter.startDate,
            check_out: filter.endDate,
            number_of_guests: filter.guestsCount,
            most_popular: null,
            rent_type: bookingType !== 0 ? bookingType : undefined,
          };

          const location = newRoomLocation(pushQuery);
          history.push(location);
        }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }: FormikProps<FormikValues>) => {
          // Open modal if search field is empty
          const setSearchValue = (value: SearchSuggestRes | any) => {
            let name = value.name;
            setFieldValue('name', name);
          };

          return (
            <form onSubmit = {handleSubmit}>
              <Grid container spacing = {16}>
                <Grid item md = {12} xs = {12}>
                  <Paper elevation = {4} className = {classes.paperSize}>
                    <SearchIcon className = {classes.marginSearch} fontSize = 'large' />
                    <AsyncSelect
                      name = 'name'
                      components = {{Option: MenuItemSelectWithIcon}}
                      cacheOptions
                      defaultOptions
                      getOptionLabel = {optionSearchLabel}
                      getOptionValue = {optionSearchLabel}
                      inputValue = {inputText}
                      loadOptions = {suggestEvent}
                      onInputChange = {onSearch}
                      placeholder = 'Tìm kiếm'
                      className = {
                        classNames(classes.inputSearch, appC['ml-20'])
                      }
                      onChange = {setSearchValue}
                      styles = {searchStylesHome}
                    />
                  </Paper>
                </Grid>
                <Grid item md = {12} xs = {12}>
                  <Paper elevation = {4}
                         className = {classes.paperSize}
                  >
                    <Hidden xsDown>
                      <DatePicker />
                    </Hidden>
                    <Hidden smUp>
                      <DatePickerHomeXsOnly />
                    </Hidden>
                  </Paper>
                </Grid>
                <Grid item md = {8} xs = {12} sm = {12}>
                  <Paper elevation = {4} className = {classes.paperSize}>
                    <People className = {classes.marginSearch} fontSize = 'large' />
                    <Grid container spacing = {8}>
                      <Grid item lg = {12}>
                        <div className = {appC['ml-20']}>
                          <Typography variant = 'body2'>
                            <span>{filter.guestsCount}</span>&nbsp;
                            <span>khách</span>
                          </Typography>
                          <Typography variant = 'body2' className = {classes.grayLighten1}>
                            {(bookingType === 2) ? 'Theo ngày' : (
                              bookingType === 1 ? 'Theo giờ' : 'Theo ngày và giờ'
                            )}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item md = {4} xs = {12} sm = {12}>
                  <Paper elevation = {4} className = {classes.paperSize}>
                    <Button variant = 'contained'
                            color = 'primary'
                            name = 'search'
                            className = {classes.searchButton}
                            disabled = {isSubmitting}
                            type = 'submit'>
                      {isSubmitting ? <CircularProgress className = {classes.spinner} /> : 'Tìm kiếm'}
                    </Button>
                  </Paper>
                </Grid>
                <GuestSelect />
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Grid>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  memo,
)(SearchHome);

export const style = styles;
