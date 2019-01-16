import {IProps as BookingInfoProps} from '@/components/Bookings/BookingInfoDetail';
import {FormikProps} from '@/types/Interface/Formik';
import {OK} from '@/types/Requests/Code';
import {CouponDiscountCalculateReq} from '@/types/Requests/Coupons/CouponRequests';
import {CouponDiscountCalculateRes} from '@/types/Requests/Coupons/CouponResponses';
import {AxiosValidateError, AxiosRes} from '@/types/Requests/ResponseTemplate';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {axios} from '@/utils/axiosInstance';
import {DEFAULT_DATE_FORMAT} from '@/utils/store/global';
import Button from '@material-ui/core/Button/Button';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import Grid from '@material-ui/core/Grid/Grid';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import OutlineInput from '@material-ui/core/OutlinedInput/OutlinedInput';
import Paper from '@material-ui/core/Paper/Paper';
import {AxiosError} from 'axios';
import {Formik, FormikActions} from 'formik';
import moment from 'moment';
import React, {ComponentType, useContext} from 'react';
import Loadable from 'react-loadable';
import * as Yup from 'yup';
import {IBookingFormContext, BookingFormContext} from '@/store/context/Booking/BookingFormContext';

interface IProps extends BookingInfoProps {
  openHandle(status: false): void;
}

interface IFormikValues {
  coupon: string;
}

const SimpleLoading = Loadable({
  loader: (): Promise<any> => import('@/components/Loading/SimpleLoader'),
  loading: () => null,
});

const FormValidationSchema = Yup.object().shape({
  coupon: Yup.string()
    .required('Coupon is required'),
});

const formikInit: IFormikValues = {
  coupon: '',
};

const BookingCouponForm: ComponentType<IProps> = props => {
  const {
          classes,
        } = props;

  const {state, dispatch} = useContext<IBookingFormContext>(BookingFormContext);

  const {room} = state;

  return (
    <Formik
      initialValues = {formikInit}
      validationSchema = {() => FormValidationSchema}
      validateOnChange = {false}
      onSubmit = {(values: IFormikValues, actions: FormikActions<IFormikValues>) => {
        const roomAll: RoomIndexRes            = room.all;
        const data: CouponDiscountCalculateReq = {
          coupon: values.coupon,
          price_original: room.price_original,
          room_id: roomAll.id,
          checkin: moment.unix(room.checkin).format(DEFAULT_DATE_FORMAT),
          checkout: moment.unix(room.checkout).format(DEFAULT_DATE_FORMAT),
          booking_type: room.booking_type,
          merchant_id: roomAll.merchant_id,
          room_type: room.rent_type,
          number_of_guest: room.number_of_guests,
          city_id: roomAll.city_id,
          district_id: roomAll.district_id,
          day: moment().format('Y-M-D'),
        };

        axios.post('coupons/calculate-discount', data)
          .then((res: AxiosRes<CouponDiscountCalculateRes>) => {
            const body = res.data.data;
            const code = body.code;
            if (code === OK) {
              props.openHandle(false);
              dispatch({
                type: 'setCoupon',
                coupon: values.coupon,
                discount: body.price_discount,
              });
            } else {
              actions.setFieldError('coupon', body.message);
            }
            actions.setSubmitting(false);
          })
          .catch((e: AxiosError) => {
            const response: AxiosValidateError<CouponDiscountCalculateReq> = e.response!;

            const errors = response.data.data.errors;
            const error  = response.data.data.error;

            if (errors && errors.coupon) {
              actions.setFieldError('coupon', errors.coupon[0]);
            } else if (error) {
              actions.setFieldError('coupon', error);
            }
            actions.setSubmitting(false);
          });
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
        }: FormikProps<IFormikValues>) => {
        return (
          <form onSubmit = {handleSubmit}>
            <Paper className = {classes.paperCustom} square elevation = {1}>
              <Grid container spacing = {8}>
                <Grid item xs = {8}>
                  <FormControl variant = 'outlined' error = {!!(errors.coupon && touched.coupon)} fullWidth>
                    <InputLabel
                      htmlFor = 'coupon'
                    >Coupon Code</InputLabel>
                    <OutlineInput id = 'coupon'
                                  name = 'coupon'
                                  value = {values.coupon.toUpperCase()}
                                  onChange = {handleChange}
                                  onBlur = {handleBlur}
                                  labelWidth = {100}
                    />
                    {(touched.coupon && errors.coupon) ? <FormHelperText>{errors.coupon}</FormHelperText> : ''}
                  </FormControl>
                </Grid>
                <Grid item xs = {4}>
                  <Button
                    type = 'submit'
                    color = 'primary'
                    disabled = {isSubmitting}
                    size = 'large'
                    variant = 'contained'
                    style = {{height: '100%', width: '100%'}}>{isSubmitting ? <SimpleLoading /> : 'Apply'}</Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        );
      }}
    </Formik>
  );
};

export default BookingCouponForm;
