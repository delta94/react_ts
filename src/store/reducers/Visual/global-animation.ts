import * as _ from '@/store/actions/animationTypes';
import {updateObject} from '@/store/utility';

export type AnimationState = {
  readonly isLoginFormOpen: boolean;
  readonly isSignUpFormOpen: boolean;
}

export interface AnimationAction {
  status?: boolean;
  type: string;
}

const init: AnimationState = {
  isLoginFormOpen: false,
  isSignUpFormOpen: false,
};

const changeStatus = (state: AnimationState, action: AnimationAction) => {
  return updateObject<AnimationState>(state, {
    isLoginFormOpen: action.status,
  });
};

const reducer = (state: AnimationState = init, action: AnimationAction): AnimationState => {
  switch (action.type) {
    case _.LOGIN_BUTTON_CLICK:
      return updateObject<AnimationState>(state, {
        isSignUpFormOpen: false,
        isLoginFormOpen: action.status
      });
    case _.SIGN_UP_BUTTON_CLICK:
      return updateObject<AnimationState>(state, {
        isSignUpFormOpen: action.status,
        isLoginFormOpen: false
      });
    default:
      return state;
  }
};

export default reducer;
