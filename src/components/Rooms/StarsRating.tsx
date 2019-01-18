import RatingBar from '@/components/Custom/RatingBar';
import {ThemeCustom} from '@/components/Theme/Theme';
import Grid from '@material-ui/core/Grid/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import React, {ComponentType, useContext, useEffect} from 'react';
import {compose} from 'recompose';
import _ from 'lodash';
import {IRoomIndexContext, RoomIndexContext} from '@/store/context/Room/RoomIndexContext';
import {RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import qs from 'query-string';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  expandedMargin: {
    margin: '20px 0',
  },
});

const StarsRatingRoomIndex: ComponentType<IProps> = (props: IProps) => {
  const {classes}         = props;
  const {state, dispatch} = useContext<IRoomIndexContext>(RoomIndexContext);

  useEffect(() => {
    const params: RoomUrlParams   = qs.parse(location.search!);
    let list: number[] | string[] = params.rating ? _.split(params.rating, ',') : [];
    list                          = _.map(list, value => parseInt(value));

    dispatch({
      type: 'setRating',
      ratingLists: list,
    });
  }, []);

  const rateList = [
    {id: '5-star', value: 5},
    {id: '4-star', value: 4},
    {id: '3-star', value: 3},
    {id: '2-star', value: 2},
    {id: '1-star', value: 1},
    {id: '0-star', value: 0},
  ];

  return (
    <Grid container spacing = {8}>
      <Grid item sm = {12}>
        <Typography variant = 'subtitle2'>Chất lượng</Typography>
      </Grid>
      {_.map(rateList, (o) => {
        return (
          <Grid key = {o.id} item sm = {12}>
            <RatingBar id = {o.id} totalRate = {o.value} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(StarsRatingRoomIndex);
