import React, {ComponentType, Fragment, useContext} from 'react';
import {compose} from 'recompose';
import {createStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridContainer from '../../layouts/Grid/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import imgRoomDemo from '@/assets/room_demo.jpeg';
import fb from '@/assets/facebook.png';
import gg from '@/assets/google.png';
import twt from '@/assets/twitter.png';
import Location from '@material-ui/icons/LocationOnOutlined';
import StarRatings from 'react-star-ratings';
import {ThemeCustom} from '@/components/Theme/Theme';
import {IProfileContext, ProfileContext} from "@/store/context/Profile/ProfileContext";
import _ from 'lodash';
import SimpleLoader from "@/views/DetailsPage/BoxDetails";
import moment from 'moment';
import {formatMoney} from "@/utils/mixins";

const styles:any = (theme:ThemeCustom) => createStyles ({
  bookingCompleted: {
    margin: '20px auto',
    padding: 8,
  },
  imageRoom: {
    width: '100%',
  },
  txtAddress: {
    color: '#008489',
    fontSize: 14,
  },
  iconLocation: {
    verticalAlign: 'bottom',
    fontSize: 20,
  },
  rowMargin: {
    marginBottom: 8,
  },
  spanViews: {
    fontSize: 10,
    color: 'grey',
    paddingLeft: 5,
  },
  imgSocial: {
    width: 17,
    height: 17,
    padding: 5,
  },
  borLeft: {
    borderLeft: '1px solid #eee',
    padding: 3,
    textAlign: 'center',
  },
  timeBooking: {
    padding: '3px 5px 3px 3px',
    textAlign: 'center',
  },
  fontTime: {
    fontSize: 13,
  },
  typoTotal: {
    padding: '55px 5px 0 0',
  },
  bookAgain: {
    padding: 8,
  },
  button: {
    padding: '8px 14px',
  },
  rowBottom: {
    paddingTop: 8,
  },
});

interface IBookingCompleted {
    classes?:any;
}

const BookingCompleted:ComponentType<IBookingCompleted> = (props:IBookingCompleted) =>{
  const {classes} = props;
  const {state} = useContext<IProfileContext>(ProfileContext);

  const {bookings} = state;
  if (bookings == null) {return <SimpleLoader/>}

  const mapBookings = _.map(bookings,i =>{
    const room = i.room.data;
    return (
      <GridContainer xs = {11} key={i.id}>
        <Paper square className = {classes.bookingCompleted}>
          <Grid container spacing = {16} direction = 'row' justify = 'center'>
            <Grid item sm = {3}>
              <img alt = 'image room' src = {imgRoomDemo} className = {classes.imageRoom} />
            </Grid>
            <Grid item sm = {6}>
              <Grid container direction = 'column'
                    justify = 'center'
                    alignItems = 'flex-start'>
                <Grid item>
                  <Typography variant = 'h6'>{room!.details.data[0].name}</Typography>
                </Grid>
                <Grid item className = {classes.rowMargin}>
                  <StarRatings
                    rating = {room!.avg_rating}//index rating
                    starDimension = '20px'
                    starSpacing = '1px'
                    starRatedColor = '#FFC412'
                  />
                  <span className = {classes.spanViews}>{room!.total_review} views</span>
                </Grid>
                <Grid item className = {classes.rowMargin}>
                      <span className = {classes.txtAddress}>
                        <Location className = {classes.iconLocation} />
                        {room!.details.data[0].address}
                      </span>
                </Grid>
                <Grid item>
                  <img alt = 'fb social' src = {fb} className = {classes.imgSocial} />
                  <img alt = 'gg social' src = {gg} className = {classes.imgSocial} />
                  <img alt = 'tw social' src = {twt} className = {classes.imgSocial} />
                </Grid>
                <Grid item className = {classes.rowMargin}>
                  <Button variant = 'outlined' color = 'primary' size = 'small'>
                    Reviews
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm = {3} container direction = 'row' justify = 'space-around'>
              <Grid item sm = {12} container spacing = {0}>
                <Grid item sm>
                  <Grid item className = {classes.timeBooking}>
                    <Typography variant = 'button'>From</Typography>
                    <Divider />
                  </Grid>
                  <Grid item container className = {classes.timeBooking}>
                    <Grid item xs>
                      <Typography variant = 'h4'>{moment(i.checkin).format('DD')}</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography className = {classes.fontTime}>{moment(i.checkin).format('dddd')}</Typography>
                      <Typography className = {classes.fontTime}>
                        <span>{moment(i.checkin).format('MMM')}</span>
                        <span> {moment(i.checkin).format('YYYY')}</span></Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm>
                  <Grid item className = {classes.borLeft}>
                    <Typography variant = 'button'>To</Typography>
                    <Divider />
                  </Grid>
                  <Grid item container className = {classes.borLeft}>
                    <Grid item xs>
                      <Typography variant = 'h4'>{moment(i.checkout).format('DD')}</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography className = {classes.fontTime}>{moment(i.checkout).format('dddd')}</Typography>
                      <Typography className = {classes.fontTime}>
                        <span>{moment(i.checkout).format('MMM')}</span>
                        <span> {moment(i.checkout).format('YYYY')}</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm = {12}>
                <Typography variant = 'h6' align = 'right' className = {classes.typoTotal}>
                  <span>Total :</span><span> {formatMoney(i.total_fee)} </span><span>VND</span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing = {16} direction = 'row' justify = 'center'>
            <Grid item sm = {9}>
              <div className = {classes.rowBottom}>
                <Button color = 'primary' className = {classes.button}>
                  Book Again
                </Button>
                <Button color = 'primary' className = {classes.button}>
                  Send Receipt
                </Button>
              </div>
            </Grid>
            <Grid item container justify = 'flex-end' sm = {3}>
              <div className = {classes.rowBottom}>
                <Button variant = 'contained' color = 'primary'>
                  Details
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </GridContainer>
    )
  });

  return (
        <Fragment>
          {mapBookings}
        </Fragment>
    );
};

export default compose<IBookingCompleted,any>(
  withStyles(styles)
)(BookingCompleted);
