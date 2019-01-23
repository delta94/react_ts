import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, useContext, memo} from 'react';
import {compose} from 'recompose';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid/Grid';
import RoomCardMap from '@/components/Rooms/RoomCardMap';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import Pagination from 'rc-pagination';
import Slider, {Settings} from 'react-slick';
import {ReactScrollLinkProps} from 'react-scroll/modules/components/Link';
import {animateScroll as scroll} from 'react-scroll/modules';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {IRoomIndexContext, RoomIndexContext} from '@/store/context/Room/RoomIndexContext';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';

interface IProps {
  classes?: any
  rooms: RoomIndexRes[]
  page: number
  hoverAction(id: number): void
  hoverId: number
  focusRoomLocation(room: RoomIndexRes): void
  pageChange(current: number, pageSize: number): void
}

const styles: any = (theme: ThemeCustom) => createStyles({
  roomList: {
    [theme!.breakpoints!.only!('xs')]: {
      maxWidth: 'calc(93vw - 4px)',
    },
  },
});

// @ts-ignore
const MapRooms: ComponentType<IProps> = (props: IProps) => {
  const {classes, rooms, hoverId, hoverAction, focusRoomLocation, pageChange, page} = props;

  const {state} = useContext<IRoomIndexContext>(RoomIndexContext);
  const {width} = useContext<IGlobalContext>(GlobalContext);

  const xsMode = width === 'xs';
  const {meta} = state;

  const settings: Settings = {
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    arrows: false,
  };

  return (
    <Fragment>
      {!xsMode ? (
        <Fragment>
          {rooms.length > 0 ? _.map(rooms, room => (
            <Grid
              key = {room.id}
              id = {`room-${room.id}`}
              item xs = {12}
              onMouseEnter = {() => hoverAction(room.id)}
              onMouseLeave = {() => hoverAction(0)}
            >
              <RoomCardMap
                room = {room}
                isHover = {hoverId === room.id}
                focus = {focusRoomLocation} />
            </Grid>
          )) : <SimpleLoader height = {200} width = {200} />}
          <Grid container item xs = {12} justify = 'flex-end'>
            {rooms.length > 0 ? (
              <Pagination
                total = {meta ? meta!.pagination.total : 0}
                current = {page}
                onChange = {pageChange}
              />
            ) : ''}
          </Grid>
        </Fragment>
      ) : (
        <Grid item xs = {12} className = {classes.roomList}>
          <Slider {...settings}>
            {rooms.length > 0 ? _.map(rooms, room => (
              <Grid
                key = {room.id}
                id = {`room-${room.id}`}
                item xs = {12}
                onMouseEnter = {() => hoverAction(room.id)}
                onMouseLeave = {() => hoverAction(0)}
              >
                <RoomCardMap
                  room = {room}
                  isHover = {hoverId === room.id}
                  focus = {focusRoomLocation}
                />
              </Grid>
            )) : <SimpleLoader height = {100} width = {200} />}
          </Slider>
        </Grid>
      )}
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo,
)(MapRooms);
