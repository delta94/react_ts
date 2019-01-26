import * as act from '@/store/actions/actionTypes';
import {updateObject} from '@/store/utility';
import {DEFAULT_DATE_TIME_FORMAT} from '@/utils/store/global';
import {Moment} from 'moment';
import {Reducer} from 'redux';

export type DateRange = {
  startDate: Moment | null,
  endDate: Moment | null
}

export type SearchFilterState = {
  readonly guestsCount: number;
  readonly roomsCount: number;
  readonly bookingType: number;
  readonly startDate: string | undefined;
  readonly endDate: string | undefined;
}

export type SearchFilterAction = { type: 'ADD_VALUE', value: number, field: string }
  | { type: 'CHANGE_DATE', date: DateRange }
  | { type: 'SET_BOOKING_TYPE', bookingType: number }

const init: SearchFilterState = {
  guestsCount: 1,
  roomsCount: 1,
  bookingType: 1,
  startDate: undefined,
  endDate: undefined,
};

const changeCount = (state: SearchFilterState | any, action: SearchFilterAction) => {
  if (action.type === 'ADD_VALUE') {
    let name: any          = action.field;
    let obj: any           = {};
    let totalValue: number = state[name] + action.value;
    obj[name]              = (totalValue > 0) ? totalValue : 1;
    return updateObject(state, obj);
  }
  return state;
};

const changeDate = (state: SearchFilterState, action: SearchFilterAction) => {
  if (action.type === 'CHANGE_DATE') {
    const {date} = action;

    let startDate = date!.startDate!.format(DEFAULT_DATE_TIME_FORMAT);
    let endDate   = date!.endDate
      ? date!.endDate!.format(DEFAULT_DATE_TIME_FORMAT)
      : date!.startDate!.format(DEFAULT_DATE_TIME_FORMAT);

    return updateObject(state, {
      startDate,
      endDate,
    });
  }
  return state;
};

const reducer: Reducer<SearchFilterState, any> = (state: SearchFilterState = init, action: SearchFilterAction): SearchFilterState => {
  switch (action.type) {
    case 'ADD_VALUE':
      return changeCount(state, action);
    case 'CHANGE_DATE':
      return changeDate(state, action);
    case 'SET_BOOKING_TYPE':
      return updateObject(state, {
        bookingType: action.bookingType,
      });
    default:
      return state;
  }
};

export default reducer;
