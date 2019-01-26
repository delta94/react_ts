import {ThemeCustom} from '@/components/Theme/Theme';
import RoomListingDetails from '@/views/Rooms/RoomListingDetails';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useContext, useEffect} from 'react';
import {compose} from 'recompose';
import FilterLeftBar from '@/components/Rooms/FilterLeftBar';
import Hidden from '@material-ui/core/Hidden/Hidden';
import TabFilter from '@/views/Rooms/Filter/TabFilter';
import ListFilterTop from '@/views/Rooms/Filter/ListFilterTop';
import MapVector from '@/assets/map-vector.svg';
import classNames from 'classnames';
import Button from '@material-ui/core/Button/Button';
import Maps from '@/components/Maps/Maps';
import {RoomMapContext, IRoomMapContext} from '@/store/context/Room/RoomMapContext';
import ScrollTopButton from '@/components/Rooms/ScrollTopButton';
import {RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import qs from 'query-string';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {
    marginTop: 30,
    [theme!.breakpoints!.between!('xs', 'sm')]: {
      marginTop: 5,
    },
  },
  margin15: {
    marginTop: 15,
  },
  ul: {
    listStyleType: 'none',
    marginBlockStart: '0px',
    paddingInlineStart: '1rem',
    paddingBlockStart: '0.5rem',
  },
  filterLeft: {
    padding: 14,
  },
  checkboxRoot: {
    padding: 5,
  },
  mapPaper: {
    cursor: 'pointer',
  },
});

// @ts-ignore
const RoomListing: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  const {dispatch: mapDispatch} = useContext<IRoomMapContext>(RoomMapContext);

  const mapClick = () => {
    mapDispatch({
      type: 'setMapOpen',
      status: true,
    });
  };



  return (
    <Fragment>
      <ScrollTopButton />
      <Maps />
      <Hidden smDown>
        <Grid container spacing = {0} className = {classes.root}>
          <Grid item sm = {6}>
            <TabFilter />
          </Grid>
        </Grid>
      </Hidden>
      <Grid container spacing = {16} className = {classes.root}>
        <Hidden smDown>
          <Grid item sm = {3}>
            <Paper elevation = {1} onClick = {mapClick} classes = {{
              root: classes.mapPaper,
            }}>
              <img src = {MapVector} alt = 'map-vector' />
              <Button
                variant = 'text'
                fullWidth
              >Xem bản đồ</Button>
            </Paper>
            <Paper elevation = {1} className = {classNames(
              classes.margin15, classes.filterLeft,
            )}>
              <FilterLeftBar />
            </Paper>
          </Grid>
        </Hidden>
        <Grid item lg = {9} md = {9} sm = {12} xs = {12}>
          <Grid container>
            <Hidden smDown>
              <Grid item sm = {12}>
                <ListFilterTop />
              </Grid>
            </Hidden>
            <Grid item sm = {12} xs = {12} className = {classes.margin15}>
              <RoomListingDetails />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(RoomListing);
