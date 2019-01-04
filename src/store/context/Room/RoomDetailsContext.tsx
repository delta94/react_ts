import {createContext} from 'react';
import {Dispatch} from 'redux';
import {RoomDetails, RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {updateObject} from '@/store/utility';
import {AxiosRes} from '@/types/Requests/ResponseTemplate';
import {axios} from '@/utils/axiosInstance';

export const RoomDetailsContext = createContext<IRoomDetailsContext | any>(null);

export interface IRoomDetailsContext {
  state: RoomDetailsState,
  dispatch: Dispatch<RoomDetailsAction>,
}

export type RoomDetailsState = {
  readonly rooms: RoomIndexRes | null,
  readonly roomPosition: RoomIndexRes | null
}

export type RoomDetailsAction = {
  type: 'setDetails',
  action: RoomIndexRes,
}
export const RoomDetailsStateInit: RoomDetailsState = {
  rooms: null,
  roomPosition: null,
};

export const RoomDetailsReducer = (state: RoomDetailsState, action: RoomDetailsAction): RoomDetailsState => {
  switch (action.type) {
    case 'setDetails':
      return updateObject<RoomDetailsState>(state, {
        rooms: action.action,
      });
    default:
      return state;
  }
};

export const getData = async () => {
  const res: AxiosRes<RoomIndexRes> = await axios.get('rooms/3143?include=details,user');
  return res.data.data;
};
