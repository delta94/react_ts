import {Moment} from 'moment';
import {Reducer} from 'redux';
import {DEFAULT_DATE_FORMAT} from '@/utils/store/global';
import {updateObject} from '@/store/utility';
import * as act from '@/store/actions/actionTypes';

export type DateRange = {
  startDate: Moment | null,
  endDate: Moment | null
}

export type BookingState = {
  readonly roomID: number | null,
  readonly numberOfGuest: number;
  readonly bookingType: number;
  readonly startDate: string | undefined;
  readonly endDate: string | undefined;
  readonly checkInHour: string | undefined;
  readonly checkOutHour: string | undefined;
  readonly checkOutMinute: string | undefined;
}

export interface BookingAction {
  type: string;
  value?: string | number;
  field?: string;
  date?: DateRange
}

const init: BookingState = {
  roomID: null,
  numberOfGuest: 1,
  bookingType: 1,
  startDate: undefined,
  endDate: undefined,
  checkInHour: undefined,
  checkOutHour: undefined,
  checkOutMinute: undefined,
};

const changeDate = (state: BookingState, action: BookingAction) => {
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

const reducer: Reducer = (state: BookingState = init, action: BookingAction): BookingState => {
  switch (action.type) {
    case act.CHANGE_DATE:
      return changeDate(state, action);
    default:
      return state;
  }
};

export default reducer;
