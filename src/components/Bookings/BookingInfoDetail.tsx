import BG from '@/assets/agriculture-alone-barn-259618.jpg';
import CouponForm from '@/components/Bookings/BookingCouponForm';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import {ThemeCustom} from '@/components/Theme/Theme';
import {formatMoney} from '@/utils/mixins';
import {withStyles, createStyles} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid/Grid';
import Grow from '@material-ui/core/Grow/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper/Popper';
import Typography from '@material-ui/core/Typography';
import Arrow from '@material-ui/icons/ArrowForward';
import Calendar from '@material-ui/icons/CalendarToday';
import People from '@material-ui/icons/People';
import moment from 'moment';
import React, {Fragment, useRef, useState, Dispatch, ComponentType, MouseEvent, useContext} from 'react';
import Loadable from 'react-loadable';
import {compose} from 'recompose';
import {BookingFormContext, IBookingFormContext} from '@/store/context/Booking/BookingFormContext';
import InfoHeader from '@/components/Bookings/InfoHeader';

export interface IProps {
  classes?: any;
}

const SimpleLoading = Loadable({
  loader: (): Promise<any> => import('@/components/Loading/SimpleLoader'),
  loading: () => null,
});

const styles: any = (theme: ThemeCustom) => createStyles({
  paperCustom: {
    padding: '1rem',
  },
  card: {
    display: 'flex',
    borderRadius: '2px',
  },
  cover: {
    [theme.breakpoints!.down!('sm')]: {
      width: 180,
    },
    [theme.breakpoints!.up!('md')]: {
      width: 130,
    },
    [theme.breakpoints!.up!('lg')]: {
      width: 100,
    },
    height: 80,
    objectFit: 'cover',
  },
  dividerMargin: {
    marginTop: 15,
    marginBottom: 15,
  },
  gridInfo: {
    position: 'sticky',
    top: 0,
  },
  flexCenter: {
    display: 'flex',
  },
  fontLow: {
    fontSize: '0.9rem',
  },
  spaceTop: {
    marginTop: 8,
  },
});

const BookingInfoDetail: ComponentType<IProps> = props => {
  const {
          classes,
        } = props;

  const {state, dispatch} = useContext<IBookingFormContext>(BookingFormContext);

  const {room, price} = state;

  const [isCouponPanelOpen, setCouponPanelStatus] = useState<boolean>(false);
  const couponRef                                 = useRef(null);

  const couponHandle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCouponPanelStatus(!isCouponPanelOpen);
  };

  const removeCoupon = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch({
      type: 'removeCoupon',
    });
  };

  return (
    <Fragment>
      <Grid container spacing = {24} className = {classes.gridInfo}>
        <Grid item xs = {12}>
          <Paper className = {classes.paperCustom} square>
            <Grid container spacing = {16}>
              {room ? (
                <InfoHeader room = {room} />
              ) : ''}
            </Grid>
            <Divider className = {classes.dividerMargin} />
            {!!price ? (
              <Grid container spacing = {16}>
                <Grid item xs = {12}>
                  <Grid container spacing = {16}>
                    <Grid container item xs = {12}>
                      <Grid item xs = {6} className = {classes.fontLow}>Ngày nhận phòng</Grid>
                      <Grid container item xs = {6} className = {classes.fontLow} justify = 'flex-end'>{
                        moment.unix(price!.checkin).format('Y/MM/DD')
                      }</Grid>
                    </Grid>
                    <Grid container item xs = {12}>
                      <Grid item xs = {6} className = {classes.fontLow}>Ngày trả phòng</Grid>
                      <Grid container item xs = {6} className = {classes.fontLow} justify = 'flex-end'>{
                        moment.unix(price!.checkout).format('Y/MM/DD')
                      }</Grid>
                    </Grid>
                    <Grid container item xs = {12}>
                      <Grid item xs = {6} className = {classes.fontLow}>Số khách</Grid>
                      <Grid container item xs = {6} className = {classes.fontLow}
                            justify = 'flex-end'>{price!.number_of_guests} người</Grid>
                    </Grid>
                  </Grid>
                  <Divider className = {classes.spaceTop} />
                  <Grid container spacing = {16} className = {classes.spaceTop}>
                    <Grid container item xs = {12}>
                      <Grid item xs = {6} className = {classes.fontLow}>Giá</Grid>
                      <Grid container item xs = {6} className = {classes.fontLow}
                            justify = 'flex-end'>{`${formatMoney(price!.price_original)}đ`}</Grid>
                    </Grid>
                    <Grid container item xs = {12}>
                      <Grid item xs = {6} className = {classes.fontLow}>Phí dịch vụ</Grid>
                      <Grid container item xs = {6} className = {classes.fontLow}
                            justify = 'flex-end'>{`${formatMoney(price!.additional_fee)}đ`}</Grid>
                    </Grid>
                    {price!.price_discount > 0 ? (
                      <Grid container item xs = {12}>
                        <Grid item xs = {6} className = {classes.fontLow}>Giảm giá</Grid>
                        <Grid container item xs = {6} className = {classes.fontLow}
                              justify = 'flex-end'>{`${formatMoney(price!.price_discount)}đ`}</Grid>
                      </Grid>
                    ) : ''}
                  </Grid>
                  <Divider className = {classes.spaceTop} />
                  <Grid container spacing = {16} className = {classes.spaceTop}>
                    <Grid container item xs = {12}>
                      <Grid item xs = {6} className = {classes.fontLow}>
                        <Typography variant = 'h6'>Tổng cộng:</Typography>
                      </Grid>
                      <Grid container item xs = {6} className = {classes.fontLow} justify = 'flex-end'>
                        <Typography variant = 'h6'>{`${formatMoney(price!.total_fee)}đ`}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : ''}
            <Divider className = {classes.dividerMargin} />
            <Grid container spacing = {16}>
              <Grid container item xs = {12} alignContent = 'center' alignItems = 'center'>
                {/*Coupon Section*/}
                <Grid container item xs = {12} justify = 'flex-end'>
                  {price
                    ? (!state.coupon
                        ? <button onClick = {couponHandle} ref = {couponRef}>Have a coupon?</button>
                        : <button onClick = {removeCoupon}>Remove coupon</button>
                    )
                    : <SimpleLoader />
                  }
                  <Popper
                    open = {isCouponPanelOpen}
                    anchorEl = {couponRef.current}
                    placement = 'bottom-end'
                    transition>
                    {({TransitionProps, placement}) => (
                      <ClickAwayListener onClickAway = {() => setCouponPanelStatus(false)}>
                        <Grow
                          {...TransitionProps}
                          style = {{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                          }}
                        >
                          {price ? <CouponForm {...props} openHandle = {setCouponPanelStatus} /> : ''}
                        </Grow>
                      </ClickAwayListener>
                    )}
                  </Popper>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(BookingInfoDetail);
