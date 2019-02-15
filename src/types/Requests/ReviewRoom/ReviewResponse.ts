export interface RoomReviewInfoRes{
  id: number
  price_day: number
  price_hour: number
  avg_avg_rating: number
  room_type: number
  name: string
  image: string
  room_type_text: string
  booking_id: number
}

export interface RoomReviewInfoReq{
  cleanliness: number
  quality: number
  service: number
  valuable: number
  avg_rating:number
  comment: string
  like?: number
  recommend?: number
  booking_id:number
}
