import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, useContext} from 'react';
import {compose} from 'recompose';
import Tabs from '@material-ui/core/Tabs/Tabs';
import Tab from '@material-ui/core/Tab/Tab';
import Paper from '@material-ui/core/Paper/Paper';
import {RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import qs from 'query-string';
import {updateObject} from '@/store/utility';
import {newRoomLocation, IRoomIndexContext, RoomIndexContext} from '@/views/Rooms/Context/RoomIndexContext';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({});

// @ts-ignore
const ListFilterTop: ComponentType<IProps> = (props: IProps) => {
  const {classes}               = props;
  const [tabFocus, setTabFocus] = useState<number>(0);

  const {history, location} = useContext<IGlobalContext>(GlobalContext);
  const {dispatch} = useContext<IRoomIndexContext>(RoomIndexContext);

  const tabFocusChange = (value: number) => {
    if (value !== tabFocus) {
      const params: RoomUrlParams  = qs.parse(location.search!);
      const instant: RoomUrlParams = {
        most_popular: (value === 0) ? null : undefined,
        lowest_price: (value === 1) ? null : undefined,
        most_review: (value === 2) ? null : undefined,
        deal_hot: (value === 3) ? null : undefined,
      };

      const newParams  = updateObject(params, instant);
      const locationTo = newRoomLocation(newParams);

      dispatch({
        type: 'setRooms',
        rooms: null,
      });

      setTabFocus(value);
      history.push(locationTo);
    }
  };

  return (
    <Fragment>
      <Paper square elevation = {1}>
        <Tabs
          fullWidth
          value = {tabFocus}
          indicatorColor = 'primary'
          textColor = 'primary'
          onChange = {(e, value) => tabFocusChange(value)}
        >
          <Tab label = 'Best Match' />
          <Tab label = 'Lowest Price' />
          <Tab label = 'Most Review' />
          <Tab label = 'Deal Hot' />
        </Tabs>
      </Paper>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
)(ListFilterTop);
