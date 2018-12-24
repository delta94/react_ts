import {ThemeCustom} from '@/components/Theme/Theme';
import Grid from '@material-ui/core/Grid/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useContext, useEffect, useState} from 'react';
import {compose} from 'recompose';
import RoomCard from '@/components/Rooms/RoomCard';
import {RoomIndexContext, IRoomIndexContext, getRooms} from '@/store/context/Room/RoomIndexContext';
import _ from 'lodash';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({});

// @ts-ignore
const RoomListingDetails: ComponentType<IProps> = (props: IProps) => {
  const {classes}             = props;
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const {location}            = useContext<IGlobalContext>(GlobalContext);
  const {state, dispatch}     = useContext<IRoomIndexContext>(RoomIndexContext);

  const {rooms} = state;

  useEffect(() => {
    getRooms(location).then(data => {
      dispatch({
        type: 'setRooms',
        rooms: data,
      });
    }).catch(err => {
      console.error(err);
    });
  }, [location]);

  useEffect(() => {
    setIsEmpty((rooms !== null && (rooms.length === 0)));
  }, [rooms]);

  return (
    <Fragment>
      <Grid container spacing = {16} justify = 'center'>
        {rooms ? _.map(rooms, (room) => (
          <Grid key = {room.id} item lg = {12}>
            <RoomCard room = {room} />
          </Grid>
        )) : <SimpleLoader height = {200} width = {300} />}
        {isEmpty ? 'No match result found' : ''}
      </Grid>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(RoomListingDetails);
