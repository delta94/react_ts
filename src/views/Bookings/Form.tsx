import BookingForm from '@/components/Bookings/BookingForm';
import BookingInfoDetail from '@/components/Bookings/BookingInfoDetail';
import {ThemeCustom} from '@/components/Theme/Theme';
import NavTop from '@/components/ToolBar/NavTop';
import GridContainer from '@/layouts/Grid/Container';
import {updateObject} from '@/store/utility';
import {BookingPriceCalculatorReq} from '@/types/Requests/Booking/BookingRequests';
import {BookingPriceCalculatorRes} from '@/types/Requests/Booking/BookingResponses';
import {AxiosRes} from '@/types/Requests/ResponseTemplate';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {axios} from '@/utils/axiosInstance';
import {formatTime} from '@/utils/mixins';
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
  BookingFormReducer, BookingFormStateInit, priceCalculator, IBookingFormParams,
} from '@/store/context/Booking/BookingFormContext';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';

interface IProps extends RouteProps, RouterProps {
  classes: any;
}

const styles: any = (theme: ThemeCustom) => createStyles({
  marginContainer: {
    marginTop: 20,
  },
});


const Form: FunctionComponent<IProps> = props => {
  const {
          classes,
          location,
        } = props;

  const params: IBookingFormParams | any = qs.parse(location!.search);
  const [state, dispatch]     = useReducer<BookingFormState, BookingFormAction>(BookingFormReducer, BookingFormStateInit);
  const {history} = useContext<IGlobalContext>(GlobalContext);

  useEffect(() => {
    priceCalculator(params, state).then(res => {
      dispatch({
        type: 'setRoom',
        value: res,
      });
    }).catch(err => {
      history.push('/error');
    });

  }, [location]);

  return (
    <Fragment>
      <NavTop />
      <BookingFormContext.Provider value={{state, dispatch}}>
      <GridContainer xs = {10} sm = {11} xl = {6}>
        <Grid container spacing = {16} className = {classes.marginContainer}>
          <Grid item lg = {8} md = {6} xs = {12}>
            <BookingForm state={state} />
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
