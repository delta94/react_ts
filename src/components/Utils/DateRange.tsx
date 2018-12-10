import * as act from '@/store/actions/actionTypes';
import {ReducersType} from '@/store/reducers';
import {SearchFilterState, SearchFilterAction, DateRange} from '@/store/reducers/searchFilter';
import Event from '@material-ui/icons/Event';
import moment from 'moment';
import React, {useState, useEffect, ComponentType} from 'react';
import {DateRangePicker, FocusedInputShape} from 'react-dates';
import 'react-dates/initialize';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Dispatch} from 'redux';

interface IProps {
  filter: SearchFilterState

  updateDate(date: DateRange): any
}

const DateRangePK: ComponentType<IProps> = (props: IProps) => {
  const {filter, updateDate} = props;

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

  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);
  return (
    <DateRangePicker
      startDateId = 'startDate'
      endDateId = 'endDate'
      startDate = {filter.startDate ? moment(filter.startDate) : null}
      endDate = {filter.endDate ? moment(filter.endDate) : null}
      onDatesChange = {({startDate, endDate}) => {
        updateDate({startDate, endDate});
      }}
      focusedInput = {focusedInput}
      onFocusChange = {focusedInput => {
        setFocusedInput(focusedInput);
      }}
      showDefaultInputIcon = {true}
      minimumNights = {0}
      customInputIcon = {<Event />}
      noBorder = {true}
      displayFormat = 'ddd, DD/MM/YYYY'
      readOnly
    />
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
)(DateRangePK);
