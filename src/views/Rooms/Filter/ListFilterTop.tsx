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
import {newRoomLocation, IRoomIndexContext, RoomIndexContext} from '@/store/context/Room/RoomIndexContext';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({});

const [MOST_POPULAR, LOWEST_PRICE, MOST_REVIEW, DEAL_HOT] = [0, 1, 2, 3];

// @ts-ignore
const ListFilterTop: ComponentType<IProps> = (props: IProps) => {
  const {classes}               = props;
  const [tabFocus, setTabFocus] = useState<number>(0);
  const {history, location}     = useContext<IGlobalContext>(GlobalContext);
  const {dispatch}              = useContext<IRoomIndexContext>(RoomIndexContext);

  const tabFocusChange = (value: number) => {
    if (value !== tabFocus) {
      const params: RoomUrlParams  = qs.parse(location.search!);
      const instant: RoomUrlParams = {
        most_popular: (value === MOST_POPULAR) ? null : undefined,
        lowest_price: (value === LOWEST_PRICE) ? null : undefined,
        most_review: (value === MOST_REVIEW) ? null : undefined,
        deal_hot: (value === DEAL_HOT) ? null : undefined,
      };

      const newParams  = updateObject(params, instant);
      const locationTo = newRoomLocation(newParams);

      dispatch({
        type: 'setRooms',
        rooms: [],
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
