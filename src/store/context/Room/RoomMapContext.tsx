import {Dispatch, createContext} from 'react';
import {updateObject} from '@/store/utility';

export const RoomMapContext = createContext<IRoomMapContext | any>(null);

export interface IRoomMapContext {
  state: RoomMapState,
  dispatch: Dispatch<RoomMapAction>
}

export type RoomMapAction = { type: 'setRoomId', id: number }
  | { type: 'setMapOpen', status: boolean }

export type RoomMapState = {
  readonly id: number
  readonly isMapOpen: boolean
}

export const RoomMapStateInit: RoomMapState = {
  id: 0,
  isMapOpen: false,
};

export const RoomMapReducer = (state: RoomMapState, action: RoomMapAction) => {
  switch (action.type) {
    case 'setRoomId':
      return updateObject<RoomMapState>(state, {
        id: action.id,
      });
    case 'setMapOpen':
      return updateObject<RoomMapState>(state, {
        isMapOpen: action.status,
      });
    default:
      return state;
  }
};
