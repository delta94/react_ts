import loginInfo, {LoginInfoState, LoginInfoAction} from '@/store/reducers/loginInfo';
// ReducersType
import searchFilterRDC, {SearchFilterState, SearchFilterAction} from '@/store/reducers/searchFilter';
import V_animation, {AnimationState, AnimationAction} from '@/store/reducers/Visual/global-animation';
import {combineReducers, Reducer} from 'redux';

export type ReducersType = {
  searchFilter?: Reducer<SearchFilterState, SearchFilterAction>;
  loginInfo?: Reducer<LoginInfoState, LoginInfoAction>;
  v_animate?: Reducer<AnimationState, AnimationAction>;
}

export type ReducersList = {
  searchFilter: SearchFilterState;
  loginInfo: LoginInfoState;
  v_animate: AnimationState;
}

const reducers: ReducersType = {
  searchFilter: searchFilterRDC,
  loginInfo: loginInfo,
  v_animate: V_animation,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
