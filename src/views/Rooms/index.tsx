import {ThemeCustom} from '@/components/Theme/Theme';
import NavTop from '@/components/ToolBar/NavTop';
import GridContainer from '@/layouts/Grid/Container';
import RoomListing from '@/views/Rooms/RoomListing';
import TopBarFilter from '@/views/Rooms/TopBarFilter';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {useReducer, FunctionComponent} from 'react';
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

interface IProps extends RouteProps, RouterProps {
  classes: any;
}

const BottomNav = Loadable({
  loader: (): Promise<any> => import('@/views/Rooms/BottomNav'),
  loading: () => null,
});

const styles: any = (theme: ThemeCustom) => createStyles({});

const RoomIndex: FunctionComponent<IProps> = props => {
  const [state, dispatch] = useReducer<RoomIndexState, RoomIndexAction>(RoomIndexReducer, RoomIndexStateInit);
  const [mapState, mapDispatch] = useReducer<RoomMapState, RoomMapAction>(RoomMapReducer, RoomMapStateInit);

  return (
    <RoomIndexContext.Provider value = {{state, dispatch}}>
      <RoomMapContext.Provider value = {{
        state: mapState,
        dispatch: mapDispatch,
      }}>
      <NavTop />
      <GridContainer lg = {10} xs = {11} sm = {11}>
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
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(RoomIndex);
