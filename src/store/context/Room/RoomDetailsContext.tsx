import {createContext, Dispatch} from 'react';
import {RoomIndexRes, RoomScheduleRes} from '@/types/Requests/Rooms/RoomResponses';
import {updateObject} from '@/store/utility';
import {AxiosRes} from '@/types/Requests/ResponseTemplate';
import {axios} from '@/utils/axiosInstance';
import {History} from 'history';
import _ from 'lodash';
import {BookingPriceCalculatorRes} from '@/types/Requests/Booking/BookingResponses';

export const RoomDetailsContext = createContext<IRoomDetailsContext | any>(null);

export interface IRoomDetailsContext {
  state: RoomDetailsState,
  dispatch: Dispatch<RoomDetailsAction>,
}

export type RoomDetailsState = {
  readonly room: RoomIndexRes | null,
  readonly roomPosition: RoomIndexRes | null
  readonly schedule: string[]
  readonly bookingType: number
  readonly price?: BookingPriceCalculatorRes
}

export type RoomDetailsAction = { type: 'setDetails', room: RoomIndexRes, schedule: string[] }
  | { type: 'setBookingType', bookingType: number }
  | { type: 'setPrice', price: BookingPriceCalculatorRes }

export const RoomDetailsStateInit: RoomDetailsState = {
  room: null,
  roomPosition: null,
  schedule: [],
  bookingType: 2,
};

export const RoomDetailsReducer = (state: RoomDetailsState, action: RoomDetailsAction): RoomDetailsState => {
  switch (action.type) {
    case 'setDetails':
      return updateObject<RoomDetailsState>(state, {
        room: action.room,
        schedule: action.schedule,
      });
    case 'setBookingType':
      return updateObject<RoomDetailsState>(state, {
        bookingType: action.bookingType,
      });
    case 'setPrice':
      return updateObject(state, {
        price: action.price,
      });
    default:
      return state;
  }
};

const getRoom = async (idRoom: number) => {
  const res: AxiosRes<RoomIndexRes> = await axios.get(`rooms/${idRoom}?include=details,user,comforts.details,media,district,city`);
  return res.data.data;
};

const getRoomSchedule = async (id: number) => {
  const res: AxiosRes<RoomScheduleRes> = await axios.get(`rooms/schedule/${id}`);
  return res.data;
};

export const getData = (id: number, dispatch: Dispatch<RoomDetailsAction>, history: History) => {
  if (isNaN(id)) history.push('/');

  Promise.all([
    getRoom(id),
    getRoomSchedule(id),
  ]).then(res => {
    const [room, schedule] = res;
    dispatch({
      type: 'setDetails',
      room: room,
      schedule: _.sortBy(schedule.data.blocks),
    });
  }).catch(err => {
    history.push('/404');
  });
};
