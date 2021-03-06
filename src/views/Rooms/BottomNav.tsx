import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, useContext, useEffect, memo} from 'react';
import {compose} from 'recompose';
import BottomNavigation from '@material-ui/core/BottomNavigation/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction/BottomNavigationAction';
import List from '@material-ui/icons/List';
import Map from '@material-ui/icons/Map';
import {Filter} from 'mdi-material-ui';
import FilterDrawerM from '@/views/Rooms/Filter/FilterDrawerM';
import Dialog from '@material-ui/core/Dialog/Dialog';
import Slide from '@material-ui/core/Slide/Slide';
import {IRoomMapContext, RoomMapContext} from '@/store/context/Room/RoomMapContext';
import Zoom from '@material-ui/core/Zoom/Zoom';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    height: 60,
  },
});

export const FILTER   = 0;
export const TAB_LIST = 1;
export const MAP      = 2;

export const TransitionCustom = (props: any) => (
  <Slide direction = 'up' {...props} />
);

export const TransitionZoom = (props: any) => (
  <Zoom {...props} />
);

// @ts-ignore
const BottomNav: ComponentType<IProps> = (props: IProps) => {
  const {classes}                                = props;
  const [index, setIndex]                        = useState<number>(TAB_LIST);
  const {dispatch: mapDispatch, state: mapState} = useContext<IRoomMapContext>(RoomMapContext);

  const {isMapOpen} = mapState;

  useEffect(() => {
    if (index === MAP) {
      mapDispatch({
        type: 'setMapOpen',
        status: true,
      });
    }
  }, [index]);

  useEffect(() => {
    if (!isMapOpen) {
      setIndex(TAB_LIST);
    }
  }, [isMapOpen]);

  return (
    <Fragment>
      <BottomNavigation
        value = {index}
        onChange = {(e, value) => setIndex(value)}
        showLabels
        className = {classes.root}
      >
        <BottomNavigationAction label = 'Bộ lọc' icon = {<Filter />} />
        <BottomNavigationAction label = 'Phòng' icon = {<List />} />
        <BottomNavigationAction label = 'Bản đồ' icon = {<Map />} />
      </BottomNavigation>
      <Dialog
        fullScreen
        TransitionComponent = {TransitionCustom}
        scroll = 'paper'
        open = {index === FILTER}
        onClose = {() => setIndex(TAB_LIST)}
      >
        <FilterDrawerM setIndex = {setIndex} />
      </Dialog>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(BottomNav);

