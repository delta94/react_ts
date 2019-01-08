import * as act from '@/store/actions/actionTypes';
import {ReducersType} from '@/store/reducers';
import {BookingState, BookingAction, DateRange} from '@/store/reducers/booking';
import moment from 'moment';
import React, {useState, useEffect, ComponentType} from 'react';
import {DateRangePicker, FocusedInputShape} from 'react-dates';
import 'react-dates/initialize';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Dispatch} from 'redux';

interface IProps {
  book: BookingState

  updateDate(date: DateRange): any
}

const DateRangeSingle: ComponentType<IProps> = (props: IProps) => {
  const {book, updateDate} = props;

  useEffect(() => {
    let checkbook = !book.startDate && !book.endDate;
    let oldDate     = moment(book.startDate) < moment();

    if (checkbook || oldDate) {
      updateDate({
        startDate: moment(),
        endDate: moment().add(7, 'days'),
      });

    }

  }, []);

  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);
  return (
    <DateRangePicker
      numberOfMonths={1}
      startDateId = 'startDate'
      endDateId = 'endDate'
      startDate = {book.startDate ? moment(book.startDate) : null}
      endDate = {book.endDate ? moment(book.endDate) : null}
      onDatesChange = {({startDate, endDate}) => {
        updateDate({startDate, endDate});
      }}
      focusedInput = {focusedInput}
      onFocusChange = {focusedInput => {
        setFocusedInput(focusedInput);
      }}
      minimumNights = {0}
      noBorder = {true}
      displayFormat = 'ddd, DD/MM/YYYY'
      readOnly
    />
  );
};

const mapStateToProps = (state: ReducersType) => {
  return {
    book: state.bookingReq,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<BookingAction>) => {
  return {
    updateDate: (date: DateRange) => dispatch({
      type: act.CHANGE_DATE,
      date: date,
    }),
  };
};

export default compose<IProps, any>(
  connect(mapStateToProps, mapDispatchToProps),
)(DateRangeSingle);
