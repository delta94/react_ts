export interface ProfileInfoRes {
  id: number
  uuid: string
  name: string
  email: string
  gender: number
  gender_txt: string
  birthday: string | null
  address: string | null
  phone: string
  account_number: number | null
  avatar: string | null
  avatar_url: string
  level: number
  level_txt: string
  vip: number
  vip_txt: string
  point: number
  money: number
  status: number
  status_txt: string
  type: number
  type_txt: string
}
