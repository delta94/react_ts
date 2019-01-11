import {ThemeCustom} from '@/components/Theme/Theme';
import Grid from '@material-ui/core/Grid/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useContext, useEffect, useState} from 'react';
import {compose} from 'recompose';
import RoomCard from '@/components/Rooms/RoomCard';
import {RoomIndexContext, IRoomIndexContext, getRooms, loadMoreRooms} from '@/store/context/Room/RoomIndexContext';
import _ from 'lodash';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';
import InfiniteScroll from 'react-infinite-scroller';
import classNames from 'classnames';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {
    [theme!.breakpoints!.between!('xs', 'sm')]: {
      marginBottom: '10vh',
    },
  },
});

// @ts-ignore
const RoomListingDetails: ComponentType<IProps> = (props: IProps) => {
  const {classes}               = props;
  const [isEmpty, setIsEmpty]   = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {location}              = useContext<IGlobalContext>(GlobalContext);
  const {state, dispatch}       = useContext<IRoomIndexContext>(RoomIndexContext);

  const {rooms, meta, isLoadMore} = state;

  const lazyLoadRooms = () => {
    if (isLoadMore && rooms.length > 0) loadMoreRooms(state, dispatch);
  };

  useEffect(() => {
    setLoading(true);
    getRooms(location).then((data) => {
      const roomData   = data.data;
      const pagination = data.meta;
      setLoading(false);
      dispatch({
        type: 'setRooms',
        rooms: roomData,
        meta: pagination,
      });
    }).catch(err => {
      console.error(err);
    });
  }, [location]);

  useEffect(() => {
    setIsEmpty((meta !== null) && (rooms.length === 0) && !isLoading);
  }, [rooms, isLoading]);

  useEffect(() => {
    let isLoadMore = !!(rooms && meta);

    dispatch({
      type: 'setLoadMore',
      isLoadMore,
    });
  }, [!!meta]);

  return (
    <Fragment>
      <InfiniteScroll
        loadMore = {lazyLoadRooms}
        hasMore = {isLoadMore && !isLoading}
        loader = {<SimpleLoader key = {1} height = {200} width = {300} />}
      >
        <Grid container spacing = {16} justify = 'center' className = {classNames({
          [classes.root]: !isLoadMore,
        })}>
          {rooms.length !== 0 ? _.map(rooms, (room) => (
            <Grid key = {room.id} item lg = {12}>
              <RoomCard room = {room} />
            </Grid>
          )) : (!isEmpty ? (
            <SimpleLoader height = {200} width = {300} />
          ) : '')}
          {isEmpty ? 'No match result found' : ''}
        </Grid>
      </InfiniteScroll>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(RoomListingDetails);
