import {ThemeCustom} from '@/components/Theme/Theme';
import GuestSelect from '@/components/Utils/GuestSelect';
import {ReducersType} from '@/store/reducers';
import {SearchFilterState} from '@/store/reducers/searchFilter';
import appC from '@/styles/App.module.scss';
import {FormikProps} from '@/types/Interface/Formik';
import {AddExtraType} from '@/types/Requests/ResponseTemplate';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Gray from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import {createStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import People from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';
import {Formik, FormikActions} from 'formik';
import {LocationDescriptorObject} from 'history';
import qs from 'query-string';
import React, {FunctionComponent, useState} from 'react';
import Loadable from 'react-loadable';
import {connect} from 'react-redux';
import {RouterProps} from 'react-router';
import {withRouter, RouteProps} from 'react-router-dom';
import {compose} from 'recompose';
import {Dispatch} from 'redux';
import * as Yup from 'yup';
import {RoomIndexGetParams, RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';

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
  name: Yup.string()
    .required('Please enter name'),
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
    height: '30px',
    width: '85%',
    border: 'none',
    fontSize: '1.2em',
    fontWeight: 300,
    outline: 'none',
  },
  paperSize: {
    height: 80,
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
});

const SearchHome: FunctionComponent<IProps | any> = (props: IProps) => {
  const {
          classes,
          filter,
          history,
        }
                                      = props;
  const [type, setType]               = useState<number>(3);
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  return (
    <Grid item lg = {6} md = {7} xs = {12}>
      <Typography variant = 'h4' className = {classes.heading} color = 'secondary' gutterBottom>
        Best homestay for you
      </Typography>
      <Typography variant = 'subtitle1' color = 'secondary' className = {classes.fontSize}>
        Get the best prices for your trip
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
            // rent_type: type,
          };

          const location: LocationDescriptorObject = {
            pathname: 'rooms',
            search: `?${qs.stringify(pushQuery)}`,
          };
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
          }: FormikProps<FormikValues>) => {
          // Open modal if search field is empty
          if (errors.name && !modalStatus && isSubmitting) {
            setModalStatus(true);
          }

          return (
            <form onSubmit = {handleSubmit}>
              <Grid container spacing = {16}>
                <Grid item md = {12} xs = {12}>
                  <Paper elevation = {4} className = {classes.paperSize} square>
                    <SearchIcon className = {appC['ml-25']} fontSize = 'large' />
                    <input type = 'text'
                           name = 'name'
                           onChange = {handleChange}
                           onBlur = {handleBlur}
                           value = {values.name}
                           className = {
                             classNames(classes.inputSearch, appC['ml-20'])
                           }
                           placeholder = 'Enter a destination or property' />
                  </Paper>
                </Grid>
                <Grid item md = {12} xs = {12}>
                  <Paper elevation = {4}
                         className = {classes.paperSize}
                         square>
                    <DatePicker />
                  </Paper>
                </Grid>
                <Grid item md = {8} xs = {12} sm = {12}>
                  <Paper elevation = {4} className = {classes.paperSize} square>
                    <People className = {appC['ml-25']} fontSize = 'large' />
                    <Grid container spacing = {8}>
                      <Grid item lg = {12}>
                        <div className = {appC['ml-20']}>
                          <Typography variant = 'body2'>
                            <span>{filter.guestsCount}</span>&nbsp;
                            <span>guest{(filter.guestsCount > 1) ? 's' : ''}</span>
                          </Typography>
                          <Typography variant = 'body2' className = {classes.grayLighten1}>
                            {(type === 2) ? 'By days' : 'By hours'}
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
                            className = {classes.searchButton}
                            disabled = {isSubmitting}
                            type = 'submit'>
                      {isSubmitting ? <CircularProgress className = {classes.spinner} /> : 'Search'}
                    </Button>
                  </Paper>
                </Grid>
                <GuestSelect />
                <Modal
                  disableAutoFocus
                  open = {modalStatus}
                  onClose = {() => setModalStatus(false)}
                >
                  <Paper className = {classes.modal} elevation = {10} square>
                    <Typography variant = 'h6' id = 'modal-title'>
                      {errors.name}
                    </Typography>
                  </Paper>
                </Modal>
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
)(SearchHome);

export const style = styles;
