import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useContext, useEffect} from 'react';
import {compose} from 'recompose';
import Paper from '@material-ui/core/Paper/Paper';
import {IPaymentContext, PaymentContext} from '@/store/context/Payment/PaymentContext';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import StarRatings from 'react-star-ratings';
import classNames from 'classnames';
import mapMarker from '@/assets/SvgIcon/map-marker.svg';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import moment from 'moment';
import {formatMoney} from '@/utils/mixins';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {
    padding: '1rem',
  },
  imgSize: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    width: '100%',
    height: 120,
    verticalAlign: 'middle',
  },
  mapMarker: {
    width: '0.8rem',
  },
  verticalMid: {
    verticalAlign: 'middle',
  },
  address: {
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  spaceTop: {
    marginTop: 8,
  },
});

// @ts-ignore
const PaymentInfo: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  const {state} = useContext<IPaymentContext>(PaymentContext);

  const {room, lists} = state;

  let checkInDate = lists ? moment(lists!.checkin) : moment();
  let checkOutDate = lists ? moment(lists!.checkout) : moment();


  return (
    <Fragment>
      <Grid item md = {12}>
        <Paper className = {classes.root}>
          <Grid container spacing = {16}>
            <Grid item md = {12}>
              <Typography variant = 'subtitle2'>THÔNG TIN ĐƠN ĐẶT PHÒNG</Typography>
              <Divider />
            </Grid>
            {room ? (
              <Fragment>
                <Grid item md = {12}>
                  <img src = {`http://westay.org/storage/rooms/${room!.media.data[0].image}`}
                       className = {classes.imgSize} />
                </Grid>
                <Grid item md = {12}>
                  <Typography variant = 'subtitle2'>{room!.details.data[0].name}</Typography>
                  <StarRatings
                    numberOfStars = {room!.standard_point}
                    starDimension = {`15px`}
                    starSpacing = {`1px`}
                    starEmptyColor = {'#ffb40b'}
                  /><br />
                  <img src = {mapMarker} className = {classNames(
                    classes.mapMarker, classes.verticalMid,
                  )} />&nbsp;
                  <span className = {classes.address}>
                {room!.details.data[0].address}
                </span>
                </Grid>
                <Grid item md = {12}>
                  <Grid container spacing = {16}>
                    <Grid container item md = {12}>
                      <Grid item md = {6}>Ngày nhận phòng</Grid>
                      <Grid container item md = {6} justify = 'flex-end'>{
                        checkInDate.format('Y/MM/DD')
                      }</Grid>
                    </Grid>
                    <Grid container item md = {12}>
                      <Grid item md = {6}>Ngày trả phòng</Grid>
                      <Grid container item md = {6} justify = 'flex-end'>{
                        checkOutDate.format('Y/MM/DD')
                      }</Grid>
                    </Grid>
                    <Grid container item md = {12}>
                      <Grid item md = {6}>Số khách</Grid>
                      <Grid container item md = {6} justify = 'flex-end'>{lists!.number_of_guests} người</Grid>
                    </Grid>
                  </Grid>
                  <Divider className = {classes.spaceTop} />
                  <Grid container spacing = {16} className = {classes.spaceTop}>
                    <Grid container item md = {12}>
                      <Grid item md = {6}>Giá</Grid>
                      <Grid container item md = {6} justify = 'flex-end'>{`${formatMoney(lists!.price_original)}đ`}</Grid>
                    </Grid>
                    <Grid container item md = {12}>
                      <Grid item md = {6}>Phí dịch vụ</Grid>
                      <Grid container item md = {6} justify = 'flex-end'>{`${formatMoney(lists!.additional_fee)}đ`}</Grid>
                    </Grid>
                    {lists!.price_discount > 0 ? (
                      <Grid container item md = {12}>
                        <Grid item md = {6}>Giảm giá</Grid>
                        <Grid container item md = {6} justify = 'flex-end'>{`${formatMoney(lists!.price_discount)}đ`}</Grid>
                      </Grid>
                    ): ''}
                  </Grid>
                  <Divider className = {classes.spaceTop} />
                  <Grid container spacing = {16} className = {classes.spaceTop}>
                    <Grid container item md = {12}>
                      <Grid item md = {6}>
                        <Typography variant = 'h6'>Tổng cộng:</Typography>
                      </Grid>
                      <Grid container item md = {6} justify = 'flex-end'>
                        <Typography variant = 'h6'>{`${formatMoney(lists!.total_fee)}đ`}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Fragment>
            ) : <SimpleLoader />}
          </Grid>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(PaymentInfo);
