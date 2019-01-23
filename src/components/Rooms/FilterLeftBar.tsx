import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, useEffect, useContext, ChangeEvent, memo} from 'react';
import {compose} from 'recompose';
import Typography from '@material-ui/core/Typography/Typography';
import _ from 'lodash';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Divider from '@material-ui/core/Divider/Divider';
import Blue from '@material-ui/core/colors/blue';
import {IRoomIndexContext, RoomIndexContext, newRoomLocation, loadFilter} from '@/store/context/Room/RoomIndexContext';
import {ComfortIndexRes} from '@/types/Requests/Comforts/ComfortResponses';
import SimpleLoader from '@/components/Loading/SimpleLoader';
import {arrayFilterCheckBoxEvent} from '@/utils/mixins';
import {IGlobalContext, GlobalContext} from '@/store/context/GlobalContext';
import {RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import qs from 'query-string';
import {updateObject} from '@/store/utility';

interface IProps {
  classes?: any
}

const styles: any = (theme: ThemeCustom) => createStyles({
  ul: {
    listStyleType: 'none',
    marginBlockStart: '0px',
    paddingInlineStart: '1rem',
    paddingBlockStart: '0.5rem',
    marginBlockEnd: 0,
  },
  checkboxRoot: {
    padding: 5,
  },
  limitItems: {},
  expandText: {
    fontSize: '0.8rem',
    color: Blue[400],
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  showMore: {
    textAlign: 'right',
    marginBlockStart: 0,
  },
  divider: {
    margin: '10px 0 10px 0',
  },
});

// @ts-ignore
const FilterLeftBar: ComponentType<IProps> = (props: IProps) => {
  const {classes} = props;

  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [list, setList]         = useState<ComfortIndexRes[]>([]);

  const {location, history} = useContext<IGlobalContext>(GlobalContext);
  const {state, dispatch}   = useContext<IRoomIndexContext>(RoomIndexContext);

  const {comforts, amenities, roomTypes, roomTypesFilter} = state;

  const comfortEvent = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    let listComforts = arrayFilterCheckBoxEvent(amenities, e, checked);

    listComforts = _.sortBy(listComforts);

    const params: RoomUrlParams = qs.parse(location.search!);

    const newParams  = updateObject(params, {
      amenities: _.join(listComforts, ','),
    });
    const locationTo = newRoomLocation(newParams);

    dispatch({
      type: 'setFilter',
      amenities: listComforts,
    });

    history.push(locationTo);
  };

  const roomTypeEvent = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    let roomTypeLists = arrayFilterCheckBoxEvent(roomTypesFilter, e, checked);

    roomTypeLists = _.sortBy(roomTypeLists);

    const params: RoomUrlParams = qs.parse(location.search!);

    const newParams  = updateObject(params, {
      room_type: _.join(roomTypeLists, ','),
    });
    const locationTo = newRoomLocation(newParams);

    dispatch({
      type: 'setFilter',
      roomTypesFilter: roomTypeLists,
    });

    history.push(locationTo);
  };

  useEffect(() => {
    if (comforts.length > 0) {
      const newList = isExpand ? comforts : _.slice(comforts, 0, 3);
      setList(newList);
    }
  }, [isExpand, comforts]);

  useEffect(() => {
    loadFilter(dispatch);
  }, []);

  return (
    <Fragment>
      {/* Room Type */}
      <Typography variant = 'subtitle2'>Kiểu nhà</Typography>
      {roomTypes.length > 0 ? (
        <Fragment>
          <ul className = {classes.ul}>
            {_.map(roomTypes, (o) => (
              <li key = {o.id}>
                <FormControlLabel
                  control = {<Checkbox
                    name = {o.id.toString()}
                    color = 'primary'
                    onChange = {roomTypeEvent}
                    value = {o.id.toString()}
                    classes = {{
                      root: classes.checkboxRoot,
                    }}
                  />}
                  label = {o.value}
                />
              </li>
            ))}
          </ul>
        </Fragment>
      ) : <SimpleLoader />}
      <Divider className = {classes.divider} />
      {/* Comforts Lists */}
      <Typography variant = 'subtitle2'>Tiện nghi phòng</Typography>
      {list.length > 0 ? (
        <Fragment>
          <ul className = {classes.ul}>
            {_.map(list, (o) => (
              <li key = {o.id}>
                <FormControlLabel
                  control = {<Checkbox
                    name = {o.id.toString()}
                    color = 'primary'
                    onChange = {comfortEvent}
                    value = {o.id.toString()}
                    classes = {{
                      root: classes.checkboxRoot,
                    }}
                  />}
                  label = {`${o.details.data[0].name}`}
                />
              </li>
            ))}
          </ul>
          <p className = {classes.showMore}>
        <span
          className = {classes.expandText}
          onClick = {() => setIsExpand(!isExpand)}
        >Show {isExpand ? 'less' : `${comforts.length - 3} more`}
        </span>
          </p>
        </Fragment>
      ) : <SimpleLoader />}
    </Fragment>
  );
};

export default compose<IProps, any>(
  withStyles(styles),
  memo
)(FilterLeftBar);
