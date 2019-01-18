import {TransformerInclude} from '@/types/Requests/ResponseTemplate';
import {RoomIndexRes} from '@/types/Requests/Rooms/RoomResponses';
import {MediaIndexRes} from "@/types/Requests/Media/MediaIndexResponse";

export interface BookingIndexRes {
  id: number
  uuid: string
  code: string
  name: string
  sex: number
  sex_txt: string
  birthday: string
  phone: string
  email: string
  email_received: string;
  name_received: string
  phone_received: string;
  room_id: number
  checkin: number
  checkout: number
  number_of_guests: number
  price_original: number
  price_discount: number
  coupon_discount: number
  coupon: string
  coupon_txt: string
  note: string
  service_fee: number
  additional_fee: number
  total_fee: number
  payment_status: number
  payment_status_txt: string
  payment_method: number
  payment_method_txt: string
  status: number
  status_txt: string
  exchange_rate: number
  total_refund: number
  email_reminder: number
  email_reviews: number
  price_range: number
  created_at: string
  total_txt: string
  updated_at: string
  bank_list: any
  room: TransformerInclude<RoomIndexRes>
  media: TransformerInclude<MediaIndexRes[]>
}

export interface BookingPriceCalculatorRes {
  room_id: number
  checkin: number
  checkout: number
  additional_fee: number
  price_discount: number
  number_of_guests: number
  booking_type: number
  days?: number
  hours?: number
  price_original: number
  service_fee: number
  total_fee: number
}
