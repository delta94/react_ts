import {ThemeCustom} from '@/components/Theme/Theme';
import NavTop from '@/components/ToolBar/NavTop';
import GridContainer from '@/layouts/Grid/Container';
import RoomListing from '@/views/Rooms/RoomListing';
import TopBarFilter from '@/views/Rooms/TopBarFilter';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {useReducer, FunctionComponent, Fragment, useEffect} from 'react';
import {compose} from 'recompose';
import {
  RoomIndexContext,
  RoomIndexState,
  RoomIndexAction,
  RoomIndexReducer,
  RoomIndexStateInit,
} from '@/store/context/Room/RoomIndexContext';
import {RouteProps, RouterProps} from 'react-router';
import Hidden from '@material-ui/core/Hidden/Hidden';
import Loadable from 'react-loadable';
import {
  RoomMapState,
  RoomMapAction,
  RoomMapReducer,
  RoomMapStateInit,
  RoomMapContext,
} from '@/store/context/Room/RoomMapContext';
import NavSearch from '@/components/ToolBar/NavSearch';
import {RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import qs from 'query-string';
import _ from 'lodash';

interface IProps extends RouteProps, RouterProps {
  classes: any;
}

const BottomNav = Loadable({
  loader: (): Promise<any> => import('@/views/Rooms/BottomNav'),
  loading: () => null,
});

const styles: any = (theme: ThemeCustom) => createStyles({});

const RoomIndex: FunctionComponent<IProps> = props => {
  const [state, dispatch]       = useReducer<RoomIndexState, RoomIndexAction>(RoomIndexReducer, RoomIndexStateInit);
  const [mapState, mapDispatch] = useReducer<RoomMapState, RoomMapAction>(RoomMapReducer, RoomMapStateInit);

  useEffect(() => {
    const params: RoomUrlParams = qs.parse(location.search!);

    const paramRoomTypes = (typeof params.room_type === 'string') ? params.room_type : '';
    const paramComforts  = (typeof params.amenities === 'string') ? params.amenities : '';

    const roomTypes = (!!paramRoomTypes) ? _.split(paramRoomTypes, ',') : [];
    const comforts  = (!!paramComforts) ? _.split(paramComforts, ',') : [];

    dispatch({
      type: 'setFilter',
      amenities: comforts.length > 0 ? _.map(comforts, v => parseInt(v)) : [],
      roomTypesFilter: roomTypes.length > 0 ? _.map(roomTypes, v => parseInt(v)) : [],
    });

  }, []);

  return (
    <Fragment>
      <NavTop />
      <Hidden xsDown>
        <NavSearch />
      </Hidden>
      <RoomIndexContext.Provider value = {{state, dispatch}}>
        <RoomMapContext.Provider value = {{
          state: mapState,
          dispatch: mapDispatch,
        }}>
          <GridContainer lg = {10} xs = {11} sm = {11} xl = {9}>
            <Hidden smDown>
              <TopBarFilter />
            </Hidden>
            <RoomListing />
          </GridContainer>
          <Hidden mdUp>
            <BottomNav />
          </Hidden>
        </RoomMapContext.Provider>
      </RoomIndexContext.Provider>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(RoomIndex);
