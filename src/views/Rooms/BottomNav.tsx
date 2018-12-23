import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, useEffect, useContext} from 'react';
import {compose} from 'recompose';
import BottomNavigation from '@material-ui/core/BottomNavigation/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction/BottomNavigationAction';
import List from '@material-ui/icons/List';
import Map from '@material-ui/icons/Map';
import {RoomIndexContext, IRoomIndexContext} from '@/views/Rooms/Context/RoomIndexContext';
import {animateScroll as scroll} from 'react-scroll';
import {Filter} from 'mdi-material-ui';
import {GlobalContext, IGlobalContext} from '@/store/context/GlobalContext';
import FilterDrawerM from '@/views/Rooms/Filter/FilterDrawerM';
import Dialog from '@material-ui/core/Dialog/Dialog';
import Slide from '@material-ui/core/Slide/Slide';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    height: 58,
  },
});

const Transition = (props: any) => (
  <Slide direction = 'up' {...props} />
);

// @ts-ignore
const BottomNav: ComponentType<IProps> = (props: IProps) => {
  const {classes}                     = props;
  const [FILTER, TAB_LIST, MAP]       = [0, 1, 2];
  const [index, setIndex]             = useState<number>(TAB_LIST);
  const [endOfScroll, setEndOfScroll] = useState<boolean>(false);
  const [bodyHeight, setBodyHeight]   = useState<number>(document.body.offsetHeight);
  const {width}                       = useContext<IGlobalContext>(GlobalContext);
  const {state}                       = useContext<IRoomIndexContext>(RoomIndexContext);

  useEffect(() => {
    setBodyHeight(document.body.offsetHeight);
  }, [state, width]);

  useEffect(() => {
    window.onscroll = () => {
      let currentScroll = window.innerHeight + window.pageYOffset;
      if ((currentScroll >= bodyHeight) && !endOfScroll) {
        setEndOfScroll(true);
        scroll.scrollToBottom();
      } else if ((currentScroll < bodyHeight) && endOfScroll) {
        setEndOfScroll(false);
      }
    };
  });

  return (
    <Fragment>
      <BottomNavigation
        value = {index}
        style = {{position: endOfScroll ? 'relative' : 'fixed'}}
        onChange = {(e, value) => setIndex(value)}
        showLabels
        className = {classes.root}
      >
        <BottomNavigationAction label = 'Filter' icon = {<Filter />} />
        <BottomNavigationAction label = 'Lists' icon = {<List />} />
        <BottomNavigationAction label = 'Maps' icon = {<Map />} />
      </BottomNavigation>
      <Dialog
        fullScreen
        TransitionComponent = {Transition}
        scroll = 'paper'
        open = {index === FILTER}
        onClose = {() => setIndex(TAB_LIST)}
      >
        <FilterDrawerM setIndex ={setIndex} />
      </Dialog>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(BottomNav);

