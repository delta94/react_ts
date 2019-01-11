import loginInfo, {LoginInfoState, LoginInfoAction} from '@/store/reducers/loginInfo';
// ReducersType
import searchFilterRDC, {SearchFilterState, SearchFilterAction} from '@/store/reducers/searchFilter';
import V_animation, {AnimationState, AnimationAction} from '@/store/reducers/Visual/global-animation';
import BookingReq, {BookingState, BookingAction} from '@/store/reducers/booking';
import {combineReducers, Reducer} from 'redux';

export type ReducersType = {
  searchFilter?: Reducer<SearchFilterState, SearchFilterAction>;
  loginInfo?: Reducer<LoginInfoState, LoginInfoAction>;
  v_animate?: Reducer<AnimationState, AnimationAction>;
  bookingReq?: Reducer<BookingState, BookingAction>;
}

export type ReducersList = {
  searchFilter: SearchFilterState;
  loginInfo: LoginInfoState;
  v_animate: AnimationState;
  bookingReq:BookingState;
}

const reducers: ReducersType = {
  searchFilter: searchFilterRDC,
  loginInfo: loginInfo,
  v_animate: V_animation,
  bookingReq: BookingReq,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
