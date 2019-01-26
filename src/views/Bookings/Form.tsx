import BookingForm from '@/components/Bookings/BookingForm';
import BookingInfoDetail from '@/components/Bookings/BookingInfoDetail';
import {ThemeCustom} from '@/components/Theme/Theme';
import NavTop from '@/components/ToolBar/NavTop';
import GridContainer from '@/layouts/Grid/Container';
import {createStyles, withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid/Grid';
import qs from 'query-string';
import React, {Fragment, FunctionComponent, useEffect, useReducer, useContext} from 'react';
import {RouteProps, RouterProps} from 'react-router';
import {compose} from 'recompose';
import {
  BookingFormContext,
  BookingFormState,
  BookingFormAction,
  BookingFormReducer,
  BookingFormStateInit,
  IBookingFormParams,
  priceCalculate,
  getRoomBookingForm,
} from '@/store/context/Booking/BookingFormContext';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';
import Grey from '@material-ui/core/colors/grey';

interface IProps extends RouteProps, RouterProps {
  classes: any;
}

const styles: any = (theme: ThemeCustom) => createStyles({
  marginContainer: {
    marginTop: 20,
  },
  container: {
    minHeight: '100vh',
    backgroundColor: Grey[200],
  },
});

const Form: FunctionComponent<IProps> = props => {
  const {
          classes,
          location,
        } = props;

  const params: IBookingFormParams | any = qs.parse(location!.search);
  const [state, dispatch]                = useReducer<BookingFormState, BookingFormAction>(BookingFormReducer, BookingFormStateInit);
  const {history, width}                 = useContext<IGlobalContext>(GlobalContext);

  const isWide = width === 'lg' || width === 'xl' || width === 'md';
  const xsMode = width === 'xs';

  useEffect(() => {
    Promise.all([
      priceCalculate(params),
      getRoomBookingForm(params),
    ]).then(res => {
      const [price, room] = res;

      dispatch({
        type: 'setRoom',
        room: room.data,
        price: price.data,
      });

    }).catch(err => {
      history.push('/404');
    });

  }, [location]);

  return (
    <Fragment>
      <NavTop />
      <BookingFormContext.Provider value = {{state, dispatch}}>
        <GridContainer xs = {11} sm = {11} xl = {6} className = {classes.container} spacing = {0}>
          <Grid
            container
            spacing = {xsMode ? 0 : 8}
            className = {classes.marginContainer}
            direction = {isWide ? 'row' : 'column-reverse'}
          >
            <Grid item lg = {8} md = {6} xs = {12}>
              <BookingForm state = {state} />
            </Grid>
            <Grid item lg = {4} md = {6} xs = {12}>
              <BookingInfoDetail />
            </Grid>
          </Grid>
        </GridContainer>
      </BookingFormContext.Provider>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(Form);
