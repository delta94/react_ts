import {ThemeCustom} from '@/components/Theme/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import React, {ComponentType, Fragment, useState, memo} from 'react';
import {compose} from 'recompose';
import Grid from '@material-ui/core/Grid/Grid';
import {Transition, animated} from 'react-spring';
import Blue from '@material-ui/core/colors/blue';
import Gray from '@material-ui/core/colors/grey';
import CountBar from '@/components/Utils/CountBar';
import NavigateNext from '@material-ui/icons/NavigateNext';
import {connect} from 'react-redux';
import {ReducersType} from '@/store/reducers';
import {Dispatch} from 'redux';
import Remove from '@material-ui/core/SvgIcon/SvgIcon';
import _ from 'lodash';
import {SearchFilterAction, DateRange, SearchFilterState} from '@/store/reducers/searchFilter';
import Button from '@material-ui/core/Button/Button';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Divider from '@material-ui/core/Divider/Divider';

interface IProps {
  classes?: any
}

interface LocalProps extends IProps {
  filter: SearchFilterState
  updateBookingType(type: number): void
}

interface BookingType {
  id: number
  label: string
}
const styles: any = (theme: ThemeCustom) => createStyles({
  textCount: {
    color: Gray[600],
  },
});

const bookingTypeList: BookingType[] = [
  {id: 0, label: 'Theo ngày và giờ'},
  {id: 1, label: 'Theo giờ'},
  {id: 2, label: 'Theo ngày'},
];

// @ts-ignore
const BookingTypeSelectBar: ComponentType<IProps> = (props: LocalProps) => {
  const {classes, filter, updateBookingType} = props;

  const [direction, setDirection] = useState(0);
  const {bookingType}             = filter;

  const changeTypeEvent = (num: number) => {
    setDirection(num);
    let next: number;
    switch ([bookingType, num].join(' ')) {
      case '0 -1':
        next = 2;
        break;
      case '2 1':
        next = 0;
        break;
      case '0 1':
      case '1 1':
      case '2 -1':
      case '1 -1':
      default:
        next = bookingType + num;
    }
    updateBookingType(next);
  };

  return (
    <Fragment>
      <Grid container spacing = {8} justify = 'center' alignItems = 'center'>
        <Grid item sm = {2} xs = {3}>
          <Button onClick = {() => changeTypeEvent(-1)}>
            <NavigateBefore />
          </Button>
        </Grid>
        <Grid container item sm = {8} xs = {6} justify = 'center'>
          <Transition
            items = {bookingTypeList}
            keys = {(item: BookingType) => item.id}
            from = {{transform: `translate3d(${direction === -1 ? -100 : 100}%,0,0)`, opacity: 0.4}}
            enter = {{transform: 'translate3d(0,0,0)', opacity: 1}}
            leave = {{transform: `translate3d(${direction === -1 ? 100 : -100}%,0,0)`, opacity: 0.4}}
          >
            {(item: BookingType) => {
              return item.id === bookingType && (props => (
                <animated.span style = {props} className = {classes.textCount}>{item.label}</animated.span>
              ));
            }}
          </Transition>
        </Grid>
        <Grid container item sm = {2} xs = {3} alignItems = 'flex-end'>
          <Button style = {{marginLeft: 'auto'}} onClick = {() => changeTypeEvent(1)}>
            <NavigateNext />
          </Button>
        </Grid>
        <Grid item xs = {12}>
          <Divider />
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    filter: state.searchFilter,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<SearchFilterAction>) => {
  return {
    updateBookingType: (type: number) => dispatch({
      type: 'SET_BOOKING_TYPE',
      bookingType: type,
    }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  memo
)(BookingTypeSelectBar);
