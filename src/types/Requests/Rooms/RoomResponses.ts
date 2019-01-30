import {TransformerInclude} from '@/types/Requests/ResponseTemplate';
import {ComfortIndexRes} from '@/types/Requests/Comforts/ComfortResponses';
import {MediaIndexRes} from '@/types/Requests/Media/MediaIndexResponse';

export interface RoomIndexRes<T = any> {
  id: number;
  merchant_id: number;
  room_type: number;
  room_type_txt: string;
  max_guest: number;
  max_additional_guest: number;
  number_bed: number;
  number_room: number;
  city_id: number;
  district_id: number;
  checkin: string;
  checkout: string;
  price_day: number;
  price_hour: number;
  price_after_hour: number;
  price_charge_guest: number;
  cleaning_fee: number;
  standard_point: number;
  is_manager: number;
  manager: number;
  manager_txt: string;
  hot: number;
  new: number;
  latest_deal: number;
  latest_deal_txt: string;
  rent_type: number;
  rent_type_txt: string;
  longitude: string;
  latitude: string;
  status: number,
  cleanliness: number | null,
  quality: number | null,
  service: number | null,
  valuable: number | null,
  avg_rating: number,
  total_review: number,
  total_recommend: number | null,
  avg_rating_txt:string,
  details: TransformerInclude<RoomDetails[]>;
  user: TransformerInclude<User>;
  comforts: TransformerInclude<ComfortIndexRes[]>;
  media: TransformerInclude<MediaIndexRes[]>
}

export interface RoomDetails<T=any> {
  name: string,
  address: string,
}

export interface RoomScheduleRes {
  blocks: string[]
}

export interface User {
  name: string,
  avatar_url: string,
  vip_txt:string,
}

export interface NumberRoomCity {
  city_id: number,
  name_city: string,
  image: string,
  total_rooms: string,
}
