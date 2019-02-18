import {ThemeCustom} from '@/components/Theme/Theme';
import {withStyles} from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import React, {ComponentType, useState, Fragment, ChangeEvent, useContext, memo, useMemo} from 'react';
import {compose} from 'recompose';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import Divider from '@material-ui/core/Divider/Divider';
import Typography from '@material-ui/core/Typography';
import '@/styles/date-picker.scss';
import Select from '@material-ui/core/Select/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import FormControl from '@material-ui/core/FormControl/FormControl';
import Button from '@material-ui/core/Button/Button';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import {IRoomDetailsContext, RoomDetailsContext} from '@/store/context/Room/RoomDetailsContext';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';
import {connect} from 'react-redux';
import {ReducersType} from '@/store/reducers';
import {Dispatch} from 'redux';
import {DateRange} from '@/store/reducers/booking';
import * as act from '@/store/actions/actionTypes';
import qs from 'query-string';
import {LocationDescriptorObject} from 'history';
import {SearchFilterState, SearchFilterAction} from '@/store/reducers/searchFilter';
import moment from 'moment';
import {momentRange} from '@/store/utility';
import _ from 'lodash';
import {BOOKING_TYPE_HOUR, BOOKING_TYPE_DAY, DEFAULT_DATE_FORMAT} from '@/utils/store/global';
import TimePicker, {TimeRange} from 'material-ui-time-picker';
import SnackbarContent from '@material-ui/core/SnackbarContent/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import Red from '@material-ui/core/colors/red';
import {IBookingFormParams, priceCalculate} from '@/store/context/Booking/BookingFormContext';
import {formatMoney} from '@/utils/mixins';
import DateRangeSingle from '@/components/Utils/DateRangeSingle';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';
import classNames from 'classnames';

interface IProps {
  classes?: any,
  filter?: SearchFilterState
}

const styles: any = (theme: ThemeCustom) => createStyles({
  boxPadding: {
    padding: '8px 16px',
  },
  rowMargin: {
    margin: '8px 0 8px 0',
  },
  PaperDatePick: {
    border: '1px solid #e4e4e4',
  },
  price: {
    fontSize: 20,
    fontWeight: 600,
    color: '#484848',
  },
  priceNotByHour: {
    fontSize: 17,
    fontWeight: 600,
    color: '#484848',
  },
  perTime: {
    fontSize: 13,
  },
  pricePerHour: {
    textAlign: 'center',
  },
  pricePerDay: {
    textAlign: 'center',
    borderRight: '1px solid #e0e0e0',
  },
  formControl: {
    height: 50,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  inputOutline: {
    border: 'none',
  },
  title: {
    overflowWrap: 'break-word',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '1.28571em',
    color: 'rgb(72, 72, 72)',
    margin: 0,
  },
  iconHelp: {
    verticalAlign: 'sub',
    fontSize: 'initial',
    paddingLeft: 5,
  },
  menuSelect: {
    maxHeight: 'calc(100% - 60%)',
  },
  spaceTop: {
    marginTop: 8,
  },
  fontLow: {
    fontSize: '0.9rem',
  },
  marginTop: {
    marginTop: 10,
  },
  timeInput: {
    textAlign: 'center',
  },
  errorSnack: {
    backgroundColor: Red[600],
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  striker: {
    color: 'grey',
    position: 'relative',
    fontSize: 11,
    display: 'table',
    marginLeft: 5,
    '&::before': {
      content: '" "',
      position: 'absolute',
      right: 0,
      top: '50%',
      width: '100%',
      borderTop: '1px solid grey',
      transform: 'rotate(10deg)',
      WebkitTransform: 'rotate(10deg)',
    },
  },
});

const BoxBooking: ComponentType<IProps> = (props: IProps) => {
  const {classes, filter}               = props;
  const [guest, setGuest]               = useState<number>(1);
  const [isDateValid, setIsDateValid]   = useState<boolean>(true);
  const [timeError, setTimeError]       = useState<string>('');
  const [priceProcess, setPriceProcess] = useState({
    pending: false,
    error: '',
  });
  const [time, setTime]                 = useState<TimeRange>({
    start: moment().toDate(),
    end: moment().add(4, 'hours').toDate(),
  });

  const {state, dispatch} = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const {history, width}  = useContext<IGlobalContext>(GlobalContext);

  const {room, schedule, bookingType, price} = state;

  const isWide = width === 'xl' || width === 'lg';

  if (room === null) {
    return <ContentPlaceHolder />;
  }

  const bookingProcessor = useMemo(() => {
    let isPass    = true;
    let error     = '';
    let startDate = moment(filter!.startDate);
    let endDate   = moment(filter!.endDate);
    let st        = moment(time.start);
    let et        = moment(time.end);

    let isBookHour = bookingType === BOOKING_TYPE_HOUR;
    let range      = momentRange.range(startDate, endDate);

    let overLap = _.find(schedule, (day) => {
      let mD = moment(day);
      return range.contains(mD);
    });

    let isDateEqual = startDate.format(DEFAULT_DATE_FORMAT) === endDate.format(DEFAULT_DATE_FORMAT);

    if ((isBookHour && !isDateEqual) || (bookingType === BOOKING_TYPE_DAY && isDateEqual)) {
      isPass = false;
    }

    if (isBookHour) {
      if (st.get('hours') >= 20 || et.diff(st, 'hours') < 4) {
        error  = 'Vui lòng đặt tối thiểu 4 giờ';
        isPass = false;
      }
    }

    const queryString: IBookingFormParams = {
      checkin: startDate.format('YYYY-MM-DD'),
      checkout: endDate.format('YYYY-MM-DD'),
      hosting_id: room!.id,
      checkin_hour: isBookHour ? st.get('hours') : 14,
      checkout_hour: isBookHour ? et.get('hours') : 12,
      checkin_minute: isBookHour ? st.get('minutes') : undefined,
      checkout_minute: isBookHour ? et.get('minutes') : undefined,
      number_guests: guest,
      booking_type: bookingType,
    };

    setPriceProcess({
      error: '',
      pending: true,
    });
    priceCalculate(queryString).then(res => {
      setPriceProcess({
        error: '',
        pending: false,
      });
      dispatch({
        type: 'setPrice',
        price: res.data,
      });
    }).catch(err => {
      setPriceProcess({
        error: 'Vui lòng chọn ngày phù hợp để giá hiển thị chính xác nhất',
        pending: false,
      });
    });

    return {
      queryString, isPass, overLap, error,
    };
  }, [filter, time, bookingType, room, guest]);

  const handleBooking = () => {
    const {isPass, overLap, queryString, error} = bookingProcessor;

    if (!isPass) {
      setTimeError(error);
      setIsDateValid(false);
      return;
    }

    if (!overLap) {
      setIsDateValid(true);

      const location: LocationDescriptorObject = {
        pathname: '/payments/book',
        search: `?${qs.stringify(queryString)}`,
      };

      history.push(location);
    } else {
      setIsDateValid(false);
    }
  };

  const changeBookingType = (e: ChangeEvent<HTMLInputElement>) => {
    let bookingType = e.target.checked ? BOOKING_TYPE_HOUR : BOOKING_TYPE_DAY;
    dispatch({
      type: 'setBookingType',
      bookingType,
    });
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setGuest(parseInt(event.target.value));
  };

  const arrMenuItem = (x: number, y: number) => {
    let i   = 1;
    let arr = [];
    let z = x + y;
    while (i <= z) {
      arr.push(<MenuItem key = {i} value = {i}>{i} khách</MenuItem>);
      i++;
    }
    return arr;
  };

  const onPickTimeStart = (date: Date) => {
    const st = moment(date);
    
    if (st.get('hours') >= 20) {
      setTimeError('Vui lòng đặt tối thiểu 4 giờ');
      // return
    }

    setTime({
      start: st.toDate(),
      end: st.add(4, 'hours').toDate(),
    });
  };

  const onPickTimeEnd = (date: Date) => {
    const et = moment(date);
    const st = moment(time.start);

    if (et.diff(st, 'hours') < 4) {
      setTimeError('Giờ checkout phải lớn hơn giờ checkin tối thiểu 4 giờ');
      // return;
    }

    setTime({
      ...time,
      end: et.toDate(),
    });
  };

  return (
    <Fragment>
      <div className = {classes.boxPadding}>
        <Grid container className = {classes.rowMargin}>
          <Grid item xs = {6}>
            {room.is_discount === 1 ? (
              <div className = {classes.pricePerDay}>
                <span className = {classNames({
                  [classes.striker]: true,
                })}>
                  {`${formatMoney(room.price_day, 0)}`}
                  <sub className = {classes.perTime}>đ/ngày</sub>
                </span>
                <span className = {classes.price}>{formatMoney(room!.price_day_discount)} <sup>&#8363;</sup></span>
                <sub className = {classes.perTime}>/ngày</sub>
              </div>
            ) : (
              <div className = {classes.pricePerDay}>
                <span className = {classes.price}>{formatMoney(room!.price_day)} <sup>&#8363;</sup></span>
                <sub className = {classes.perTime}>/ngày</sub>
              </div>
            )}
          </Grid>
          <Grid item xs = {6}>
            {room!.price_hour > 0 ? (
              room.is_discount === 1 ? (
                <div className = {classes.pricePerHour}>
                     <span className = {classNames({
                       [classes.striker]: true,
                     })}>
                        {`${formatMoney(room.price_hour, 0)}`}
                       <sub className = {classes.perTime}>đ/4 giờ</sub>
                      </span>
                  <span className = {classes.price}>{formatMoney(room!.price_hour_discount)} <sup>&#8363;</sup></span>
                  <sub className = {classes.perTime}>/4 giờ</sub>
                </div>
              ) : (
                <div className = {classes.pricePerHour}>
                  <span className = {classes.price}>{formatMoney(room!.price_hour)} <sup>&#8363;</sup></span>
                  <sub className = {classes.perTime}>/4 giờ</sub>
                </div>
              )
            ) : (
              <div className = {classes.pricePerHour}>
                <span className = {classes.priceNotByHour}>Không cho thuê theo giờ</span>
              </div>
            )
            }
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs = {12}>
            {room!.price_hour ? (<FormGroup>
              <FormControlLabel
                control = {
                  <Checkbox
                    name = ''
                    checked = {bookingType === BOOKING_TYPE_HOUR}
                    onChange = {changeBookingType}
                    value = 'setHour'
                    color = 'primary'
                  />
                }
                label = 'Đặt theo giờ'
              />
            </FormGroup>) : ''}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs = {12} className = {classes.rowMargin}>
            <Typography className = {classes.title}>
              Ngày đặt phòng
            </Typography>
            <Paper square elevation = {0} className = {classes.PaperDatePick}>
              <DateRangeSingle minNights = {bookingType === BOOKING_TYPE_DAY ? 1 : 0} />
            </Paper>
            {!isDateValid ? (
              <Typography color = 'error'>
                Ngày đã chọn không hợp lệ
              </Typography>
            ) : ''}
            {bookingType === BOOKING_TYPE_HOUR ? (
              <Grid container className = {classes.marginTop}>
                <Grid item xs = {6}>
                  <TimePicker
                    okLabel = 'Xong'
                    cancelLabel = 'Hủy'
                    value = {time.start}
                    mode = '24h'
                    onChange = {onPickTimeStart}
                  />
                </Grid>
                <Grid item xs = {6}>
                  <TimePicker
                    okLabel = 'Xong'
                    cancelLabel = 'Hủy'
                    value = {time.end}
                    mode = '24h'
                    onChange = {onPickTimeEnd}
                  />
                </Grid>
              </Grid>
            ) : ''}
          </Grid>
          <Grid item xs = {12} className = {classes.rowMargin}>
            <Typography className = {classes.title}>
              Số Khách
            </Typography>
            <Paper square elevation = {0} className = {classes.PaperDatePick}>
              <FormControl variant = 'outlined' className = {classes.formControl}>
                <Select
                  MenuProps = {{
                    classes: {paper: classes.menuSelect},
                  }}
                  displayEmpty
                  value = {guest}
                  onChange = {handleChangeSelect}
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
                  {arrMenuItem(room!.max_guest, room!.max_additional_guest)}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          {room ? (
            <Fragment>
              <Grid item xs = {12}>
                <Divider />
                <Grid container spacing = {16} className = {classes.spaceTop}>
                  {!!priceProcess.error ? (
                    <Grid item xs = {12}>
                      <Typography color = 'error'>
                        {priceProcess.error}
                      </Typography>
                    </Grid>
                  ) : ''}
                  {price && !priceProcess.pending ? (
                    <Fragment>
                      <Grid container item xs = {12}>
                        <Grid item xs = {6} className = {classes.fontLow}>Giá</Grid>
                        <Grid container item xs = {6} className = {classes.fontLow}
                              justify = 'flex-end'>{`${formatMoney(price.price_original)}đ`}</Grid>
                      </Grid>
                      <Grid container item xs = {12}>
                        <Grid item xs = {6} className = {classes.fontLow}>Phí dịch vụ</Grid>
                        <Grid container item xs = {6} className = {classes.fontLow}
                              justify = 'flex-end'>{`${formatMoney(price.service_fee + price.additional_fee)}đ`}</Grid>
                      </Grid>
                      <Grid container item xs = {12}>
                        <Grid item xs = {6} className = {classes.fontLow}>
                          Phụ thu thêm khách
                          <span className={classes.title}>
                            <Tooltip title={`Phụ thu ${formatMoney(room!.price_charge_guest)} mỗi người kể từ người thứ ${(room!.max_guest + 1)}`} placement='top'>
                              <HelpOutline className={classes.iconHelp} />
                            </Tooltip>
                          </span>
                        </Grid>
                        <Grid container item xs = {6} className = {classes.fontLow}
                          justify='flex-end'>{`${formatMoney(price.charge_additional_guest)}đ`}</Grid>
                      </Grid>
                      <Grid container item xs = {12}>
                        <Grid item xs = {6} className = {classes.fontLow}>
                          Phụ thu thêm giờ
                          <span className={classes.title}>
                            <Tooltip title={`Phụ thu ${formatMoney(room!.price_after_hour)} mỗi giờ sau 4 giờ đầu`} placement='top'>
                              <HelpOutline className={classes.iconHelp} />
                            </Tooltip>
                          </span>
                        </Grid>
                        <Grid container item xs = {6} className = {classes.fontLow}
                          justify='flex-end'>{`${formatMoney(price.charge_additional_hour)}đ`}</Grid>
                      </Grid>
                      <Grid container item xs = {12}>
                        <Grid item xs = {6} className = {classes.fontLow}>Giảm giá</Grid>
                        <Grid container item xs = {6} className = {classes.fontLow}
                              justify = 'flex-end'>{`${formatMoney(price.price_discount)}đ`}</Grid>
                      </Grid>
                    </Fragment>
                  ) : <SimpleLoader />}
                </Grid>
                {price && !priceProcess.pending ? (
                  <Fragment>
                    <Divider className = {classes.spaceTop} />
                    <Grid container spacing = {16} className = {classes.spaceTop}>
                      <Grid container item xs = {12}>
                        <Grid item xs = {6} className = {classes.fontLow}>
                          <Typography variant = 'h6'>Tổng cộng:</Typography>
                        </Grid>
                        <Grid container item xs = {6} className = {classes.fontLow} justify = 'flex-end'>
                          <Typography variant = 'h6'>{`${formatMoney(price.total_fee)}đ`}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Fragment>
                ) : <SimpleLoader />}
              </Grid>
            </Fragment>
          ) : <SimpleLoader />}
          <Grid item xs = {12} className = {classes.rowMargin}>
            <Button variant = {'contained'} color = {'primary'}
                    fullWidth className = {classes.btSearch} size = {'large'}
                    onClick = {handleBooking}>
              Đặt phòng
            </Button>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs>
            <span className = {classes.title}>Phòng này có thể không còn trống với lịch của bạn
              <Tooltip title = 'Điều này xảy ra khi chủ nhà muốn biết bạn là ai' placement = 'top'>
                <HelpOutline className = {classes.iconHelp} />
              </Tooltip>
            </span>
            <Typography variant = 'caption'>
              Đừng lo, gửi một yêu cầu đặt phòng đến chủ nhà, họ sẽ phản hồi nếu phòng này còn trống cho bạn
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Snackbar
        anchorOrigin = {{
          vertical: isWide ? 'bottom' : 'top',
          horizontal: 'right',
        }}
        open = {!!timeError}
        onClose = {() => setTimeError('')}
        autoHideDuration = {5000}
        ContentProps = {{
          'aria-describedby': 'time-picker',
        }}
      >
        <SnackbarContent
          className = {classes.errorSnack}
          aria-describedby = 'time-picker-snackbar'
          message = {
            <span id = 'time-picker-snackbar' className = {classes.message}>
              <WarningIcon />&nbsp;
              {timeError}
            </span>
          }
        />
      </Snackbar>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SearchFilterAction>) => {
  return {
    updateDate: (date: DateRange) => dispatch({
      type: act.CHANGE_DATE,
      date: date,
    }),
  };
};

export default compose<IProps, any>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  memo,
)(BoxBooking);
