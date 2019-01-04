import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useContext, useEffect, useState} from 'react';
import {compose} from 'recompose';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IRoomIndexContext, RoomIndexContext, getRooms} from '@/store/context/Room/RoomIndexContext';
import {TransitionCustom} from '@/views/Rooms/BottomNav';
import Typography from '@material-ui/core/Typography/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton/IconButton';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Grid from '@material-ui/core/Grid/Grid';
import GoogleMapReact, {MapOptions, Coords} from 'google-map-react';
import _ from 'lodash';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import RoomCardMap from '@/components/Rooms/RoomCardMap';
import MapMarker from '@/components/Rooms/MapMarker';
import {RoomMapContext, IRoomMapContext} from '@/store/context/Room/RoomMapContext';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {animateScroll as scroll} from 'react-scroll';
import {ReactScrollLinkProps} from 'react-scroll/modules/components/Link';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';
import Slider, {Settings} from 'react-slick';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  list: {
    [theme!.breakpoints!.up!('lg')]: {
      maxHeight: '83vh',
    },
    [theme!.breakpoints!.between!('sm', 'md')]: {
      maxHeight: '47vh',
      order: 1,
      marginTop: 10,
    },
    [theme!.breakpoints!.only!('xs')]: {
      maxHeight: '47vh',
      order: 1,
      marginTop: 10,
    },
    overflow: 'auto',
  },
  mapContainer: {
    [theme!.breakpoints!.up!('lg')]: {
      minHeight: '82vh',
    },
    [theme!.breakpoints!.between!('sm', 'md')]: {
      minHeight: '46vh',
    },
    [theme!.breakpoints!.only!('xs')]: {
      minHeight: '46vh',
    },
  },
  roomList: {
    [theme!.breakpoints!.only!('xs')]: {
      maxWidth: 'calc(93vw - 4px)',
    }
  }
});

// @ts-ignore
const Maps: ComponentType<IProps> = (props: IProps) => {
  const {classes}                   = props;
  const [page, setPage]             = useState<number>(1);
  const [roomChunks, setRoomChunks] = useState<RoomIndexRes[]>([]);
  const [center, setCenter]         = useState<Coords>({
    lat: 0,
    lng: 0,
  });

  const {location, width}                        = useContext<IGlobalContext>(GlobalContext);
  const {state, dispatch}                        = useContext<IRoomIndexContext>(RoomIndexContext);
  const {state: mapState, dispatch: mapDispatch} = useContext<IRoomMapContext>(RoomMapContext);

  const {rooms, meta} = state;
  const {isMapOpen}   = mapState;
  const xsMode = width === 'xs';

  const settings: Settings = {
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    arrows: false
  };

  const mapOptions: MapOptions = {
    gestureHandling: 'greedy',
    zoomControl: !xsMode
  };

  const pageChange = (current: number, pageSize: number) => {
    setPage(current);

    let effect: Partial<ReactScrollLinkProps> = {
      containerId: 'room-map-list',
      smooth: 'easeInOutQuad',
      duration: 400,
    };

    scroll.scrollToTop(effect);
  };

  const mapClose = () => {
    mapDispatch({
      type: 'setMapOpen',
      status: false,
    });
  };

  const hoverAction = (key: number) => {
    mapDispatch({
      type: 'setRoomId',
      id: key,
    });
  };

  const focusRoomLocation = (room: RoomIndexRes) => {
    setCenter({
      lat: parseFloat(room.latitude),
      lng: parseFloat(room.longitude),
    });
  };

  useEffect(() => {
    if (rooms.length > 0) {
      setCenter({
        lat: parseFloat(rooms[0].latitude),
        lng: parseFloat(rooms[0].longitude),
      });
    }
  }, [rooms.length > 0]);

  useEffect(() => {
    if (isMapOpen) {
      setRoomChunks([]);
      getRooms(location, page).then(res => {
        const rooms = res.data;
        setRoomChunks(rooms);
      });
    }
  }, [page, isMapOpen]);

  /**
   * Room List switch between mobile and desktop mode
   */
  const RoomList = () => (
    !xsMode ? (
      <Fragment>
        {roomChunks.length > 0 ? _.map(roomChunks, room => (
          <Grid key = {room.id} id = {`room-${room.id}`} item xs = {12} onClick = {() => focusRoomLocation(room)}>
            <RoomCardMap room = {room} />
          </Grid>
        )) : <SimpleLoader height = {200} width = {200} />}
        <Grid container item xs = {12} justify = 'flex-end'>
          {roomChunks.length > 0 ? (
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
          {roomChunks.length > 0 ? _.map(roomChunks, room => (
            <Grid key = {room.id} id = {`room-${room.id}`} item xs = {12} onClick = {() => focusRoomLocation(room)}>
              <RoomCardMap room = {room} />
            </Grid>
          )) : <SimpleLoader height = {100} width = {200} />}
        </Slider>
      </Grid>
    )
  );

  return (
    <Fragment>
      <Dialog
        fullScreen
        open = {isMapOpen}
        onClose = {mapClose}
        TransitionComponent = {TransitionCustom}
      >
        <DialogTitle disableTypography>
          <Typography variant = 'h6'>Map for developer</Typography>
          <IconButton
            className = {classes.closeButton}
            onClick = {mapClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing = {0}>
            <Grid container item xs = {12} lg = {5} spacing = {xsMode ? 0 : 16} className = {classes.list} id = 'room-map-list'
                  justify = 'center'>
              <RoomList />
            </Grid>
            <Grid item xs = {12} lg = {7} className = {classes.mapContainer}>
              <GoogleMapReact
                options = {mapOptions}
                bootstrapURLKeys = {{
                  key: process.env.REACT_APP_GOOGLE_MAP_KEY || '',
                }}
                defaultCenter = {{lat: 21.02, lng: 105.83}}
                center = {center}
                defaultZoom = {10}
                hoverDistance = {40}
                onChildMouseEnter = {hoverAction}
                onChildMouseLeave = {h => hoverAction(0)}
              >
                {_.map(roomChunks, room => (
                  <MapMarker
                    room = {room}
                    key = {room.id}
                    lat = {room.latitude}
                    lng = {room.longitude}
                  />
                ))}
              </GoogleMapReact>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(Maps);
