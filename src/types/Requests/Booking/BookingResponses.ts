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
  checkin: string
  checkout: string
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
  created_at: string
  updated_at: string
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
