import {createContext, Dispatch} from 'react';
import {RoomIndexRes, RoomScheduleRes} from '@/types/Requests/Rooms/RoomResponses';
import {updateObject} from '@/store/utility';
import {AxiosRes} from '@/types/Requests/ResponseTemplate';
import {axios} from '@/utils/axiosInstance';
import {History} from 'history';
import _ from 'lodash';

export const RoomDetailsContext = createContext<IRoomDetailsContext | any>(null);

export interface IRoomDetailsContext {
  state: RoomDetailsState,
  dispatch: Dispatch<RoomDetailsAction>,
}

export type RoomDetailsState = {
  readonly rooms: RoomIndexRes | null,
  readonly roomPosition: RoomIndexRes | null
  readonly schedule: string[]
}

export type RoomDetailsAction = { type: 'setDetails', room: RoomIndexRes, schedule: string[]}

export const RoomDetailsStateInit: RoomDetailsState = {
  rooms: null,
  roomPosition: null,
  schedule: []
};

export const RoomDetailsReducer = (state: RoomDetailsState, action: RoomDetailsAction): RoomDetailsState => {
  switch (action.type) {
    case 'setDetails':
      return updateObject<RoomDetailsState>(state, {
        rooms: action.room,
        schedule: action.schedule
      });
    default:
      return state;
  }
};

const getRoom = async (idRoom: number) => {
  const res: AxiosRes<RoomIndexRes> = await axios.get(`rooms/${idRoom}?include=details,user,comforts,media`);
  return res.data.data;
};

const getRoomSchedule = async (id: number) => {
  const res: AxiosRes<RoomScheduleRes> = await axios.get(`rooms/schedule/${id}`);
  return res.data;
}

export const getData = (id: number, dispatch: Dispatch<RoomDetailsAction>, history: History) => {
  if (isNaN(id)) history.push('/');

  Promise.all([
    getRoom(id),
    getRoomSchedule(id)
  ]).then(res => {
    const [room, schedule] = res;
    dispatch({
      type: 'setDetails',
      room: room,
      schedule: _.sortBy(schedule.data.blocks)
    })
  }).catch(err => {
    history.push('/404');
  })
}
