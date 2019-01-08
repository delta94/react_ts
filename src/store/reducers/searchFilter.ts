import * as act from '@/store/actions/actionTypes';
import {updateObject} from '@/store/utility';
import {DEFAULT_DATE_FORMAT} from '@/utils/store/global';
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
  readonly roomName: string;
  readonly startDate: string | undefined;
  readonly endDate: string | undefined;
}

export interface SearchFilterAction {
  type: string;
  value?: string | number;
  field?: string;
  date?: DateRange
}

const init: SearchFilterState = {
  roomName: '',
  guestsCount: 1,
  roomsCount: 1,
  bookingType: 1,
  startDate: undefined,
  endDate: undefined,
};

const changeCount = (state: SearchFilterState | any, action: SearchFilterAction) => {
  let name: any          = action.field;
  let obj: any           = {};
  let totalValue: number = state[name] + action.value;
  obj[name]              = (totalValue > 0) ? totalValue : 1;
  return updateObject(state, obj);
};

const changeDate = (state: SearchFilterState, action: SearchFilterAction) => {
  const {date} = action;

  let startDate = date!.startDate!.format(DEFAULT_DATE_FORMAT);
  let endDate   = date!.endDate
    ? date!.endDate!.format(DEFAULT_DATE_FORMAT)
    : date!.startDate!.clone().add(1, 'days').format(DEFAULT_DATE_FORMAT);

  return updateObject(state, {
    startDate,
    endDate,
  });
};

const reducer: Reducer = (state: SearchFilterState = init, action: SearchFilterAction): SearchFilterState => {
  switch (action.type) {
    case act.ADD_VALUE:
      return changeCount(state, action);
    case act.CHANGE_DATE:
      return changeDate(state, action);
    default:
      return state;
  }
};

export default reducer;
