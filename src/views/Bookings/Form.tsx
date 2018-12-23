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
import React, {Fragment, FunctionComponent, useEffect, useReducer} from 'react';
import {RouteProps, RouterProps} from 'react-router';
import {compose} from 'recompose';

interface IProps extends RouteProps, RouterProps {
  classes: any;
}

export type IBookingFormReducer = {
  readonly room: object | null;
  readonly coupon: string;
  readonly discount: number;
}

export interface IAction {
  type: 'setRoom' | 'setCoupon' | 'removeCoupon';
  value?: any;
  discount?: number;
  coupon?: string;
}

interface IParams {
  checkin: string;
  checkout: string;
  checkin_hour: number;
  checkout_hour: number;
  checkout_minute: number;
  checkin_minute: number;
  hosting_id: number;
  number_guests: number;
  booking_type: number;
}

const styles: any = (theme: ThemeCustom) => createStyles({
  marginContainer: {
    marginTop: 20,
  },
});

/**
 * Calculate prices of the room when user go to booking form
 * @param {IParams} params
 * @param {IBookingFormReducer} state
 * @returns {Promise<any>}
 */
const priceCalculator = async (params: IParams, state: IBookingFormReducer): Promise<any> => {
  let additional_fee = 0;
  let discount= 0;
  let CI = '';
  let CO = '';
  try {
    CI = formatTime(params.checkin, params.checkin_hour, params.checkin_minute);
    CO = formatTime(params.checkout, params.checkout_hour, params.checkout_minute);
  } catch (e) {
    console.error(e);
  }

  const data: BookingPriceCalculatorReq = {
    room_id: params.hosting_id,
    checkin: CI,
    checkout: CO,
    additional_fee: additional_fee,
    number_of_guests: params.number_guests,
    booking_type: params.booking_type,
    price_discount: discount,
  };

  const response: AxiosRes<BookingPriceCalculatorRes> = await axios.post('bookings/price-calculator', data);

  const info: AxiosRes<RoomIndexRes> = await axios.get(`rooms/${params.hosting_id}?include=details`);

  return updateObject<BookingPriceCalculatorRes, any>(response.data.data, {
    details: info.data.data.details.data[0],
    all: info.data.data,
  });
};

const reducer = (state: IBookingFormReducer, action: IAction): IBookingFormReducer => {
  switch (action.type) {
    case 'setRoom':
      return updateObject<IBookingFormReducer>(state, {
        room: action.value,
      });
    case 'setCoupon':
      return updateObject<IBookingFormReducer>(state, {
        coupon: action.coupon,
        discount: action.discount,
      });
    case 'removeCoupon':
      return updateObject<IBookingFormReducer>(state, {
        coupon: '',
        discount: 0,
      });
    default:
      return state;
  }
};

const Form: FunctionComponent<IProps> = props => {
  const {
          classes,
          location,
        } = props;

  const initState: IBookingFormReducer = {
    room: null,
    coupon: '',
    discount: 0,
  };
  const params: IParams | any = qs.parse(location!.search);
  const [state, dispatch]     = useReducer<IBookingFormReducer, IAction>(reducer, initState);

  useEffect(() => {
    priceCalculator(params, state).then(res => {
      console.log(res);
      dispatch({
        type: 'setRoom',
        value: res,
      });
    }).catch(err => {
      // history.push('/error');
    });

  }, [location]);

  return (
    <Fragment>
      <NavTop />
      <GridContainer xs = {10} sm = {11} xl = {6}>
        <Grid container spacing = {16} className = {classes.marginContainer}>
          <Grid item lg = {8} md = {6} xs = {12}>
            <BookingForm room = {state.room} state = {state} />
          </Grid>
          <Grid item lg = {4} md = {6} xs = {12}>
            <BookingInfoDetail dispatch = {dispatch} room = {state.room} state = {state} />
          </Grid>
        </Grid>
      </GridContainer>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(Form);
