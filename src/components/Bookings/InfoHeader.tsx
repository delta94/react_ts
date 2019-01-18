import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import StarRatings from "react-star-ratings";
import classNames from 'classnames';
import mapMarker from '@/assets/SvgIcon/map-marker.svg';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import Divider from '@material-ui/core/Divider/Divider';

interface IProps {
  classes?: any
  room: RoomIndexRes
}

const styles: any = (theme: ThemeCustom) => createStyles({
  mapMarker: {
    width: '0.8rem',
  },
  verticalMid: {
    verticalAlign: 'middle',
  },
  imgSize: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
    width: '100%',
    height: 120,
    verticalAlign: 'middle',
  },
  address: {
    fontSize: '0.8rem',
    fontWeight: 500,
  },
});

// @ts-ignore
const InfoHeader: ComponentType<IProps> = (props: IProps) => {
  const {classes, room} = props;

  return (
    <Fragment>
      <Grid item xs = {12}>
        <Typography variant = 'subtitle2'>THÔNG TIN ĐƠN ĐẶT PHÒNG</Typography>
        <Divider />
      </Grid>
      <Grid item xs = {12}>
        <img src = {`http://westay.org/storage/rooms/${room!.media.data[0].image}`}
             className = {classes.imgSize} />
      </Grid>
      <Grid item xs = {12}>
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
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(InfoHeader);
