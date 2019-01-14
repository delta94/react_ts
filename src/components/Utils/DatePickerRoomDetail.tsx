import * as act from '@/store/actions/actionTypes';
import {ReducersType} from '@/store/reducers';
import {SearchFilterState, SearchFilterAction, DateRange} from '@/store/reducers/searchFilter';
import moment, {Moment} from 'moment';
import React, {useState, useEffect, ComponentType, Fragment, useContext} from 'react';
import {FocusedInputShape, DayPickerRangeController} from 'react-dates';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Dispatch} from 'redux';
import 'react-dates/initialize';
import '@/styles/date-picker.scss';
import '@/styles/Airbnb/date-picker-homepage.scss';
import _ from 'lodash';
import {RoomDetailsContext, IRoomDetailsContext} from '@/store/context/Room/RoomDetailsContext';

interface IProps {
  classes?: any
}

interface LocalProps extends IProps {
  filter: SearchFilterState

  updateDate(date: DateRange): any
}

// @ts-ignore
const DatePickerRoomDetail: ComponentType<IProps> = (props: LocalProps) => {
  const {filter, updateDate} = props;

  const [focusedInput, setFocusedInput] = useState<FocusedInputShape>('startDate');
  const [maxDate, setMaxDate]           = useState<string | undefined>(undefined);
  const [now]                           = useState<Moment>(moment());

  const {state}    = useContext<IRoomDetailsContext>(RoomDetailsContext);
  const {schedule} = state;

  const {startDate, endDate} = filter;

  const sd = startDate ? moment(startDate) : null;
  const ed = endDate ? moment(endDate) : null;

  const onDateChange = (startDate: Moment | null, endDate: Moment | null) => {
    if (focusedInput === 'startDate') {
      endDate = null;
    }
    updateDate({startDate, endDate});
  };

  const blockingDate = (day: Moment) => {
    let isBlocked = _.indexOf(schedule, day.format('YYYY-MM-DD')) !== -1;

    if (focusedInput === 'endDate' && !!sd) {
      let pastDayBlocked = day.diff(sd, 'days') < 0;
      let chainBlocked   = maxDate ? day.diff(moment(maxDate), 'days') > 0 : false;
      return pastDayBlocked || isBlocked || chainBlocked;
    }
    return isBlocked;
  };

  useEffect(() => {
    let checkFilter = !filter.startDate && !filter.endDate;
    let oldDate     = moment(filter.startDate) < moment();

    if (checkFilter || oldDate) {
      updateDate({
        startDate: moment(),
        endDate: moment().add(7, 'days'),
      });
    }
  }, []);

  useEffect(() => {
    let date = _.find(schedule, block => moment(block).diff(sd!) > 0);

    setMaxDate(date);
  }, [filter]);

  return (
    <Fragment>
      <button onClick={() => setFocusedInput('startDate')}>Clear</button>
      <DayPickerRangeController
        startDate = {sd}
        endDate = {ed}
        onDatesChange = {({startDate, endDate}) => {
          onDateChange(startDate, endDate);
        }}
        focusedInput = {focusedInput}
        onFocusChange = {focusedInput => {
          setFocusedInput(!!focusedInput ? focusedInput : 'startDate');
        }}
        numberOfMonths = {2}
        // verticalHeight = {400}
        noBorder
        enableOutsideDays = {false}
        isDayBlocked = {blockingDate}
        isOutsideRange = {(day: Moment) => day.diff(now, 'days') < 0}
        hideKeyboardShortcutsPanel
        initialVisibleMonth = {() => moment()}
      />
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
    updateDate: (date: DateRange) => dispatch({
      type: act.CHANGE_DATE,
      date: date,
    }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
)(DatePickerRoomDetail);
