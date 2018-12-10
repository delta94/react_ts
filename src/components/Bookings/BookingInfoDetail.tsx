import BG from '@/assets/agriculture-alone-barn-259618.jpg';
import CouponForm from '@/components/Bookings/BookingCouponForm';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import {ThemeCustom} from '@/components/Theme/Theme';
import {formatMoney} from '@/utils/mixins';
import {IAction, IBookingFormReducer} from '@/views/Bookings/Form';
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
import React, {Fragment, useRef, useState, Dispatch, ComponentType, MouseEvent} from 'react';
import Loadable from 'react-loadable';
import {compose} from 'recompose';

export interface IProps {
  classes?: any;
  dispatch(value: IAction): Dispatch<IAction>
  room: any;
  state: IBookingFormReducer;
}

const SimpleLoading = Loadable({
  loader: (): Promise<any> => import('@/components/Loading/SimpleLoader'),
  loading: () => null,
});

const styles: any = (theme: ThemeCustom) => createStyles({
  paperCustom: {
    padding: 20,
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
});

const BookingInfoDetail: ComponentType<IProps> = props => {
  const {
          classes,
          room,
          dispatch,
          state,
        } = props;

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
            <Grid container spacing = {24}>
              <Grid container item xs = {8} justify = 'flex-start'>
                <Typography variant = 'h6' style = {{fontSize: '1rem'}}>
                  {room
                    ? room.details.name
                    : <SimpleLoading />}
                </Typography>
                <Typography variant = 'subtitle2' color = 'textSecondary'>
                  {room
                    ? room.details.address
                    : <SimpleLoading />}
                </Typography>
              </Grid>
              <Grid container item xs = {4} justify = 'flex-end'>
                <img src = {BG} className = {classes.cover} alt = 'Cover' />
              </Grid>
            </Grid>
            <Divider className = {classes.dividerMargin} />
            <Grid container spacing = {16}>
              <Grid container item xs = {12} alignContent = 'center' alignItems = 'center'>
                <People />&nbsp;
                <span>{room
                  ? room.number_of_guests + ` ${(room.number_of_guests > 1) ? 'guests' : 'guest'}`
                  : <SimpleLoading />}</span>
              </Grid>
              <Grid container item xs = {12} alignContent = 'center' alignItems = 'center'>
                <Calendar />&nbsp;
                {room
                  ? (
                    <Fragment>
                      <span>{moment.unix(room.checkin).format('ddd, D/M/Y')}&emsp;</span>
                      <Arrow />
                      <span>&emsp;{moment.unix(room.checkout).format('ddd, D/M/Y')}</span>
                    </Fragment>
                  ) : <SimpleLoading />}
              </Grid>
            </Grid>
            <Divider className = {classes.dividerMargin} />
            <Grid container spacing = {16}>
              <Grid container item xs = {12} alignContent = 'center' alignItems = 'center'>
                <Grid item xs = {6}>
                  Night(s) / Hours(s)
                </Grid>
                <Grid container item xs = {6} justify = 'flex-end'>
                  {room
                    ? `${room.days || 0} ${room.days > 1 ? 'Nights' : 'Night'} /
                      ${room.hours || 0} ${room.hours > 1 ? 'Hours' : 'Hour'}`
                    : <SimpleLoading />}
                </Grid>
              </Grid>
              <Grid container item xs = {12} alignContent = 'center' alignItems = 'center'>
                <Grid item xs = {6}>
                  Original Prices
                </Grid>
                <Grid container item xs = {6} justify = 'flex-end'>
                  {room
                    ? `${formatMoney(room.price_original, 0)}đ`
                    : <SimpleLoading />}
                </Grid>
              </Grid>
              <Grid container item xs = {12} alignContent = 'center' alignItems = 'center'>
                <Grid item xs = {6}>
                  Services fee
                </Grid>
                <Grid container item xs = {6} justify = 'flex-end'>
                  {room
                    ? `${formatMoney(room.service_fee, 0)}đ`
                    : <SimpleLoading />}
                </Grid>
              </Grid>
              <Grid container item xs = {12} alignContent = 'center' alignItems = 'center'>
                <Grid item xs = {6}>
                  Cleaning fee
                </Grid>
                <Grid container item xs = {6} justify = 'flex-end'>
                  {room
                    ? `${formatMoney(room.service_fee, 0)}đ`
                    : <SimpleLoading />}
                </Grid>
              </Grid>
              {state.coupon &&
               <Grid container item xs = {12} alignContent = 'center' alignItems = 'center'>
                 <Grid item xs = {6}>
                   Discount ({state.coupon})
                 </Grid>
                 <Grid container item xs = {6} justify = 'flex-end'>
                   {room
                     ? `${formatMoney(state.discount, 0)}đ`
                     : <SimpleLoading />}
                 </Grid>
               </Grid>
              }
            </Grid>
            <Divider className = {classes.dividerMargin} />
            <Grid container spacing = {16}>
              <Grid container item xs = {12} alignContent = 'center' alignItems = 'center'>
                <Grid item xs = {6}>
                  Total fee
                </Grid>
                <Grid container item xs = {6} justify = 'flex-end'>
                  {room
                    ? `${formatMoney(room.total_fee - (state.discount ? state.discount : 0), 0)}đ`
                    : <SimpleLoading />}
                </Grid>
              </Grid>
              <Grid container item xs = {12} alignContent = 'center' alignItems = 'center'>
                {/*Coupon Section*/}
                <Grid container item xs = {12} justify = 'flex-end'>
                  {room
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
                          {room ? <CouponForm {...props} openHandle = {setCouponPanelStatus} /> : ''}
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
