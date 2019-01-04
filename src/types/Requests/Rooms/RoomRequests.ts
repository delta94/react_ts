export interface RoomIndexGetParams {
  include?: string
  name?: string
  city?: string
  district?: string
  status?: string
  merchant?: string
  manager?: string | number
  hot?: string
  new?: string
  rooms?: number | string
  most_popular?: any
  sort_price_day?: number | string
  number_bed?: string
  number_guest?: string | number
  check_in?: string
  check_out?: string
  rent_type?: string | number
  room_type?: string
  latest_deal?: string
  comfort_lists?: string
  price_day_from?: string | number
  price_day_to?: string | number
  price_hour_from?: string
  price_hour_to?: string
  cleanliness?: string
  service?: string
  valuable?: string
  quality?: string
  avg_rating?: string | number
  recommend?: string
  limit?: string | number
  page?: number
}

export interface RoomUrlParams {
  name?: string
  number_of_rooms?: number
  rent_type?: number
  check_in?: string
  check_out?: string
  number_of_guests?: number
  price_day_from?: string
  price_day_to?: string
  instant?: string | number | null,
  most_popular?: string | number | null
  lowest_price?: string | number | null
  most_review?: string | number | null
  deal_hot?: string | number | null
  rating?: string | null
  view?: 'map' | 'list'
}

