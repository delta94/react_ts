import {createContext, Dispatch} from 'react';
import {ProfileInfoRes} from '@/types/Requests/Profile/ProfileResponse';
import {BookingIndexRes} from '@/types/Requests/Booking/BookingResponses';
import {updateObject} from '@/store/utility';
import {AxiosRes, Pagination} from '@/types/Requests/ResponseTemplate';
import {axios} from '@/utils/axiosInstance';

export const ProfileContext = createContext<| any>(null);

export interface IProfileContext {
  state: ProfileState
  dispatch: Dispatch<ProfileAction>
}

export type ProfileAction = { type: 'setData', profile: ProfileInfoRes, bookings: BookingIndexRes[], meta?: Pagination }

export type ProfileState = {
  readonly profile: ProfileInfoRes | null
  readonly bookings: BookingIndexRes[]
  readonly metaBookings?: Pagination
}

export const ProfileStateInit: ProfileState = {
  profile: null,
  bookings: [],
};

export const ProfileReducer = (state: ProfileState, action: ProfileAction) => {
  switch (action.type) {
    case 'setData':
      return updateObject<ProfileState>(state, {
        profile: action.profile,
        bookings: action.bookings,
        metaBookings: action.meta,
      });
    default:
      return state;
  }
};

const getProfile = async () => {
  const res: AxiosRes<ProfileInfoRes> = await axios.get('profile');
  return res.data;
};

const getUserBookingList = async () => {
  const res: AxiosRes<BookingIndexRes[]> = await axios.get('bookings');
  return res.data;
};

export const getDataProfile = (dispatch: Dispatch<ProfileAction>) => {
  Promise.all([
    getProfile(),
    getUserBookingList(),
  ]).then(res => {
    const [profile, bookings] = res;
    dispatch({
      type: 'setData',
      profile: profile.data,
      bookings: bookings.data,
      meta: bookings.meta
    });
  }).catch(err => {

  });
};
