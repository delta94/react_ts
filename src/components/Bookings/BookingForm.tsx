import {ThemeCustom} from '@/components/Theme/Theme';
import {FormikProps} from '@/types/Interface/Formik';
import {BookingCreateReq} from '@/types/Requests/Booking/BookingRequests';
import {axios} from '@/utils/axiosInstance';
import {scrollDefault} from '@/utils/elementInteraction';
import {
  AVAILABLE,
  DEFAULT_DATE_TIME_FORMAT,
  INTERNET_BANKING,
  PENDING,
  WEBSITE_SRC,
  ONLINE,
} from '@/utils/store/global';
import {withStyles, createStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Gray from '@material-ui/core/colors/grey';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import classNames from 'classnames';
import {withFormik, FormikBag} from 'formik';
import moment from 'moment';
import React, {Fragment, useEffect, useRef, useState, ChangeEvent, ComponentType} from 'react';
import Loadable from 'react-loadable';
import {compose} from 'recompose';
import * as Yup from 'yup';
import {StringSchema} from 'yup';
import {BookingFormState} from '@/store/context/Booking/BookingFormContext';
import {AxiosRes} from '@/types/Requests/ResponseTemplate';
import {BookingIndexRes} from '@/types/Requests/Booking/BookingResponses';
import {withRouter, RouteComponentProps} from 'react-router';

interface IFormikValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: number;
  guestName: string;
  isSomeOneElse: boolean;
  additionalNote: string;
  additionalServices: Array<number>;
}

interface IProps {
  classes?: any;
  state: BookingFormState;
}

interface ILocalProps extends IProps, FormikProps<IFormikValues>, RouteComponentProps {

}

const FormValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Vui lòng điền tên')
    .min(2, 'Phải có ít nhất 2 ký tự')
    .max(50, 'Tối đa 50 ký tự'),
  lastName: Yup.string()
    .required('Vui lòng điền họ')
    .min(2, 'Phải có ít nhất 2 ký tự')
    .max(50, 'Tối đa 50 ký tự'),
  email: Yup.string()
    .required('Vui lòng điền địa chỉ email')
    .email('Email không hợp lệ'),
  phone: Yup.string()
    .required('Vui lòng điền số điện thoại')
    .min(10, 'Số điện thoại phải từ 10 đến 11 số')
    .max(11, 'Số điện thoại phải từ 10 đến 11 số')
    .test('checkNaN', 'Không được nhập chữ và các kí hiệu đặc biệt', value => !isNaN(value))
  ,
  country: Yup.number()
    .required('Vui lòng chọn thành phố')
    .min(1, 'Vui lòng chọn thành phố'),
  isSomeOneElse: Yup.boolean(),
  guestName: Yup.string().when('isSomeOneElse', (status: boolean, schema: StringSchema) => {
    return status
      ? schema.required('Vui lòng điền tên')
        .min(2, 'Phải có ít nhất 2 ký tự')
        .max(50, 'Tối đa 50 ký tự')
      : schema;
  }),
});

const styles: any = (theme: ThemeCustom) => createStyles({
  paperCustom: {
    padding: 25,
  },
  grayPaper: {
    backgroundColor: Gray[100],
  },
  margin24: {
    marginTop: 24,
  },
  dividerMargin: {
    marginTop: 15,
    marginBottom: 15,
  },
});

const SimpleLoading = Loadable({
  loader: (): Promise<any> => import('@/components/Loading/SimpleLoader'),
  loading: () => null,
});

const prefer: Array<any> = [
  {
    id: 1, value: `I'd like to rent a bike`, options: '',
  }, {
    id: 2, value: `I'd like an airport transfer`, options: '',
  }, {
    id: 3, value: `I'd like to have a ride`, options: '',
  }, {
    id: 4, value: `I'd like candy`, options: 'Additional charges may apply',
  }, {
    id: 5, value: `I'd like something`, options: '',
  },
];

// @ts-ignore
const BookingForm: ComponentType<IProps> = (props: ILocalProps) => {
  const {
          classes,
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValidating,
          setValues,
          state,
        } = props;

  const {room}                     = state;
  const [isRequest, toggleRequest] = useState<boolean>(false);
  const guestNameRef               = useRef<any>(null);

  useEffect(() => {
    if (values.isSomeOneElse) {
      scrollDefault('guest-name');
      guestNameRef.current.focus();
    }

  }, [values.isSomeOneElse]);

  useEffect(() => {
    if (isSubmitting && !isValidating) {
      errors.firstName ? scrollDefault('firstName') : (
        errors.lastName ? scrollDefault('lastName') : (
          errors.email ? scrollDefault('email-lists') : (
            errors.phone ? scrollDefault('phone-number') : (
              errors.country ? scrollDefault('country') : (
                errors.guestName && scrollDefault('guest-name')
              )
            )
          )
        )
      );
    }
  }, [isSubmitting && isValidating]);

  const setAdditionalServices = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    let value: number      = parseInt(e.target.value);
    let status: boolean    = e.target.checked;
    let services: number[] = values.additionalServices;

    // If checkbox ticked then pushed a value to services
    if (status) {
      services.push(value);
    }

    // Filter the services list
    let filtered: number[] = services.filter((val) => {
      return (value !== val && status);
    });

    setValues({
      ...values,
      additionalServices: filtered,
    });
  };

  return (
    <Fragment>
      <Paper square className = {classes.paperCustom}>
        <form onSubmit = {handleSubmit}>
          <Grid container spacing = {24}>
            <Grid item xs = {12}>
              <Typography variant = 'h6'>
                Thông tin đặt phòng
              </Typography>
            </Grid>
            <Grid item xs = {12} lg = {6}>
              <FormControl error = {!!(touched!.firstName && errors.firstName)} fullWidth>
                <InputLabel htmlFor = 'firstName'>Tên</InputLabel>
                <Input id = 'firstName'
                       name = 'firstName'
                       onChange = {handleChange}
                       onBlur = {handleBlur}
                       value = {values.firstName}
                />
                <FormHelperText>{touched.firstName ? errors.firstName : ''}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs = {12} lg = {6}>
              <FormControl error = {!!(touched!.lastName && errors.lastName)} fullWidth>
                <InputLabel htmlFor = 'lastName'>Họ</InputLabel>
                <Input id = 'lastName'
                       name = 'lastName'
                       onChange = {handleChange}
                       onBlur = {handleBlur}
                       value = {values.lastName}
                />
                <FormHelperText>{touched.lastName ? errors.lastName : ''}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs = {12}>
              <FormControl error = {!!(errors.email && touched.email)} fullWidth>
                <InputLabel htmlFor = 'email-booking'>Email</InputLabel>
                <Input id = 'email-booking'
                       name = 'email'
                       onChange = {handleChange}
                       onBlur = {handleBlur}
                       value = {values.email}
                />
                <FormHelperText>{touched.email ? errors.email : ''}</FormHelperText>
              </FormControl>
            </Grid>
            {/*<Grid item xs = {2}>*/}
            {/*<FormControl error = {!!(errors.country && touched!.country)} fullWidth>*/}
            {/*<InputLabel htmlFor = 'country'> </InputLabel>*/}
            {/*<Select id = 'country'*/}
            {/*name = 'country'*/}
            {/*onChange = {handleChange}*/}
            {/*onBlur = {handleBlur}*/}
            {/*value = {values.country}>*/}
            {/*<MenuItem value = {1}>VN</MenuItem>*/}
            {/*<MenuItem value = {2}>US</MenuItem>*/}
            {/*</Select>*/}
            {/*<FormHelperText>{touched.country ? errors.country : ''}</FormHelperText>*/}
            {/*</FormControl>*/}
            {/*</Grid>*/}
            <Grid item xs = {12} sm = {6} md = {6}>
              <FormControl error = {!!(errors.phone && touched!.phone)} fullWidth>
                <InputLabel htmlFor = 'phone-number'>Số điện thoại</InputLabel>
                <Input id = 'phone-number'
                       name = 'phone'
                       onChange = {handleChange}
                       onBlur = {handleBlur}
                       value = {values.phone}
                />
                <FormHelperText>{touched.phone ? errors.phone : ''}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs = {12}>
              <FormControl>
                <FormControlLabel
                  control = {
                    <Checkbox
                      id = 'booking-for-someone'
                      name = 'isSomeOneElse'
                      onChange = {handleChange}
                      onBlur = {handleBlur}
                      checked = {values.isSomeOneElse}
                      value = '1'
                      color = 'primary'
                    />
                  }
                  label = 'Tôi đặt phòng cho người khác' />
              </FormControl>
            </Grid>
            {/*Booking for another one section*/}
            <Grid item xs = {12}>
              <Collapse in = {values.isSomeOneElse}>
                <Paper className = {
                  classNames(classes.paperCustom, classes.grayPaper)
                }
                       elevation = {0} square>
                  <Grid container spacing = {16}>
                    <Grid item xs = {12}>
                      <Typography variant = 'h6'>
                        Thông tin người nhận
                      </Typography>
                    </Grid>
                    <Grid item xs = {12}>
                      <FormControl error = {!!(errors.guestName && touched.guestName)} fullWidth>
                        <InputLabel htmlFor = 'guest-name'>Họ và tên</InputLabel>
                        <Input id = 'guest-name'
                               name = 'guestName'
                               inputRef = {guestNameRef}
                               onChange = {handleChange}
                               onBlur = {handleBlur}
                               value = {values.guestName}
                        />
                        <FormHelperText>{touched.guestName ? errors.guestName : ''}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </Collapse>
            </Grid>
            <Grid item xs = {12}>
              <Button name = 'addition-services' color = 'primary' style = {{paddingLeft: 0}}
                      onClick = {() => toggleRequest(!isRequest)}>
                {isRequest ? <RemoveIcon /> : <AddIcon />}
                Yêu cầu thêm dịch vụ
              </Button>
            </Grid>
            <Grid item xs = {12}>
              <Collapse in = {isRequest}>
                <Grid container spacing = {24}>
                  <Grid item xs = {12}>
                    {/*<Paper className = {*/}
                    {/*classNames(classes.paperCustom, classes.grayPaper)*/}
                    {/*}*/}
                    {/*elevation = {0} square>*/}
                    {/*<Grid container spacing = {16}>*/}
                    {/*{prefer.map((req, i) => (*/}
                    {/*<Grid item md = {6} xs = {4} key = {i}>*/}
                    {/*<FormControl>*/}
                    {/*<FormControlLabel*/}
                    {/*control = {*/}
                    {/*<Checkbox*/}
                    {/*name = 'additional-request'*/}
                    {/*value = {req.id.toString()}*/}
                    {/*color = 'primary'*/}
                    {/*onChange = {setAdditionalServices}*/}
                    {/*/>*/}
                    {/*}*/}
                    {/*label = {req.value + (req.options ? ` (${req.options})` : '')} />*/}
                    {/*</FormControl>*/}
                    {/*</Grid>*/}
                    {/*))}*/}
                    {/*</Grid>*/}
                    {/*</Paper>*/}
                  </Grid>
                  <Grid item xs = {12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor = 'additional-note'>Ghi chú</InputLabel>
                      <Input id = 'additional-note'
                             name = 'additionalNote'
                             multiline
                             onChange = {handleChange}
                             onBlur = {handleBlur}
                             value = {values.additionalNote}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
            <Grid item xs = {12}>
              <Grid container justify = 'flex-end'>
                <Grid item>
                  <Button variant = 'contained'
                          name = 'confirm-information'
                          size = 'large'
                          color = 'primary'
                          disabled = {!room || isSubmitting}
                          type = 'submit'>
                    {(room && !isSubmitting) ? 'Xác nhận thông tin' : <SimpleLoading />}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs = {12}>
              <Grid container justify = 'flex-end'>
                <Grid item>
                  <Typography variant = 'subtitle2' style = {{color: '#b3b3b3'}}>
                    Bạn vẫn chưa phải thanh toán ở bước này
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Fragment>
  );
};

const FormMilk = withFormik({
  mapPropsToValues: (props): IFormikValues => {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: 1,
      guestName: '',
      isSomeOneElse: false,
      additionalNote: '',
      additionalServices: [],
    };
  },

  handleSubmit: (values: IFormikValues, bags: FormikBag<ILocalProps, IFormikValues>) => {
    const {state, history} = bags.props;

    const {room, price} = state;

    const data: BookingCreateReq = {
      name: `${values.lastName} ${values.firstName}`,
      email: values.email,
      name_received: values.guestName,
      room_id: price!.room_id,
      coupon: state.coupon,
      checkin: moment.unix(price!.checkin).format(DEFAULT_DATE_TIME_FORMAT),
      checkout: moment.unix(price!.checkout).format(DEFAULT_DATE_TIME_FORMAT),
      booking_type: price!.booking_type,
      phone: values.phone.replace(/\s/g, ''),
      number_of_guests: price!.number_of_guests,
      note: values.additionalNote,
      payment_method: INTERNET_BANKING,
      payment_status: PENDING,
      source: WEBSITE_SRC,
      status: AVAILABLE,
      type: ONLINE,
    };
    axios.post('bookings', data).then((res: AxiosRes<BookingIndexRes>) => {
      const data = res.data.data;
      let url    = `/payment/invoice/${data.uuid}`;
      history.push(url);
      bags.setSubmitting(false);
    }).catch(e => {
      history.push('/404');
      bags.setSubmitting(false);
    });
  },

  validationSchema: () => FormValidationSchema,
  validateOnChange: false,
});

export default compose<IProps, any>(
  withRouter,
  FormMilk,
  withStyles(styles),
)(BookingForm);
