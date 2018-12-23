import {ThemeCustom} from '@/components/Theme/Theme';
import RoomListingDetails from '@/views/Rooms/RoomListingDetails';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment} from 'react';
import {compose} from 'recompose';
import FilterLeftBar from '@/components/Rooms/FilterLeftBar';
import Hidden from '@material-ui/core/Hidden/Hidden';
import TabFilter from '@/views/Rooms/Filter/TabFilter';
import ListFilterTop from '@/views/Rooms/Filter/ListFilterTop';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {
    marginTop: 30,
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
});

// @ts-ignore
const RoomListing: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  return (
    <Fragment>
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
            <Paper elevation = {1} className = {classes.filterLeft}>
              <FilterLeftBar />
            </Paper>
          </Grid>
        </Hidden>
        <Grid item lg = {9} md = {9} sm = {12}>
          <Grid container>
            <Hidden smDown>
              <Grid item sm = {12}>
                <ListFilterTop />
              </Grid>
            </Hidden>
            <Grid item sm = {12} className = {classes.margin15}>
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
