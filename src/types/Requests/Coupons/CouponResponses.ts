export interface CouponDiscountCalculateRes {
  message: string;
  price_discount: number;
  price_remain: number;
}

export interface CouponIndexRes {
  id: number;
  code: string;
  discount: number;
  max_discount: number;
  usable: number;
  used: number;
  status: number;
  status_txt: number;
  all_day: number | null;
  all_day_txt: string;
  settings: {
    bind: Array<string>;
    rooms: Array<number>;
    cities: Array<number>;
    districts: Array<number>;
    days: Array<string>;
    booking_type: number;
    booking_create: [];
    booking_stay: Array<string>;
    merchants: Array<number>;
    users: Array<number>
    days_of_week: Array<number>;
    room_type: Array<number>;
    min_price: number
  };
  promotion_id: number
}
