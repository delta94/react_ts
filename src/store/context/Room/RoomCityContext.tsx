import {createContext, Dispatch, useEffect} from 'react';
import {RoomIndexRes, NumberRoomCity} from '@/types/Requests/Rooms/RoomResponses';
import {LocationDescriptorObject} from 'history';
import qs from 'query-string';
import {AxiosRes, Pagination, BaseResponse, TypeSelect} from '@/types/Requests/ResponseTemplate';
import {axios} from '@/utils/axiosInstance';
import {updateObject} from '@/store/utility';
import {RoomIndexGetParams, RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import {Range} from 'react-input-range';
import _ from 'lodash';
import {ComfortIndexGetParams} from '@/types/Requests/Comforts/ComfortRequests';
import {ComfortIndexRes} from '@/types/Requests/Comforts/ComfortResponses';
import {AxiosResponse} from 'axios';

export const RoomCityContext = createContext<IRoomCityContext | any>(null);

export interface IRoomCityContext {
  state: RoomCityState,
  dispatch: Dispatch<RoomCityAction>,
}

export type RoomCityAction = { type: 'setRoomCities', rooms: NumberRoomCity[], meta?: Pagination | null }
  | { type: 'setMeta', meta: Pagination }

export type RoomCityState = {
  readonly rooms: NumberRoomCity[]
  readonly sorts: any
  readonly meta: Pagination | null
}

export const RoomCityStateInit: RoomCityState = {
  rooms: [],
  sorts: null,
  meta: null,
};

export const RoomCityReducer = (state: RoomCityState, action: RoomCityAction): RoomCityState => {
  switch (action.type) {
    case 'setRoomCities':
      return updateObject<RoomCityState>(state, {
        rooms: action.rooms,
        meta: action.meta || null,
      });
    case 'setMeta':
      return updateObject<RoomCityState>(state, {
        meta: action.meta,
      });
    default:
      return state;
  }
};

export const getRoomCity = async () => {
  const res: AxiosRes<NumberRoomCity[]> = await axios.get(`rooms/number-room-by-city`);
  
  return res.data;
};
