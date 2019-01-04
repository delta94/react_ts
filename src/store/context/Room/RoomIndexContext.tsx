import {createContext} from 'react';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {LocationDescriptorObject} from 'history';
import {Dispatch} from 'redux';
import qs from 'query-string';
import {AxiosRes} from '@/types/Requests/ResponseTemplate';
import {axios} from '@/utils/axiosInstance';
import {BOOKING_TYPE_DAY} from '@/utils/store/global';
import {updateObject} from '@/store/utility';
import {RoomIndexGetParams, RoomUrlParams} from '@/types/Requests/Rooms/RoomRequests';
import {Range} from 'react-input-range';

export const MIN_PRICE  = 0;
export const MAX_PRICE  = 10000000;
export const STEP_PRICE = 10000;

export const RoomIndexContext = createContext<IRoomIndexContext | any>(null);

export interface IRoomIndexContext {
  state: RoomIndexState,
  dispatch: Dispatch<RoomIndexAction>,
}

export type RoomIndexAction = { type: 'setRooms', rooms: RoomIndexRes[] | null } | { type: 'setPrices', price: Range }

export type RoomIndexState = {
  readonly rooms: RoomIndexRes[] | null
  readonly sorts: any
  readonly price: Range,
  readonly ratingLists: number[]
  readonly amenities: number[]
}

export const RoomIndexStateInit: RoomIndexState = {
  price: {
    min: MIN_PRICE,
    max: MAX_PRICE,
  },
  rooms: null,
  amenities: [],
  ratingLists: [],
  sorts: null,
};

export const RoomIndexReducer = (state: RoomIndexState, action: RoomIndexAction): RoomIndexState => {
  switch (action.type) {
    case 'setRooms':
      return updateObject<RoomIndexState>(state, {
        rooms: action.rooms,
      });
    case 'setPrices':
      return updateObject<RoomIndexState>(state, {
        price: action.price,
      });
    default:
      return state;
  }
};

/**
 * Get list of rooms
 * @param {LocationDescriptorObject} location
 * @returns {Promise<RoomIndexRes>}
 */
export const getRooms = async (location: LocationDescriptorObject) => {
  const params: RoomUrlParams = qs.parse(location.search!);

  const query: Partial<RoomIndexGetParams> = {
    include: 'details,media,city,district,comforts',
    name: params.name,
    rent_type: params.rent_type || BOOKING_TYPE_DAY,
    check_in: params.check_in,
    check_out: params.check_out,
    number_guest: params.number_of_guests,
    most_popular: params.most_popular,
    price_day_from: params.price_day_from,
    price_day_to: params.price_day_to,
    manager: (typeof params.instant !== 'undefined') ? 1 : 0,
    sort_price_day: (params.lowest_price === null) ? 0 : 1,
  };

  const url = `rooms?${qs.stringify(query)}`;

  const res: AxiosRes<RoomIndexRes[]> = await axios.get(url);
  return res.data.data;
};

export const newRoomLocation = (params: RoomUrlParams): LocationDescriptorObject => {
  return {
    pathname: 'rooms',
    search: `?${qs.stringify(params)}`,
  };
};
