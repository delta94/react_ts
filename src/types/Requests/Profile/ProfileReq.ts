import {TransformerInclude} from "@/types/Requests/ResponseTemplate";

export interface ProfileInfoReq {
  uuid: string
  name: string
  email: string
  gender: number
  birthday: string | null
  address?: string | null
  phone: string
  account_number?: number | null
  avatar?: string | null
  avatar_url?: string
  subcribe?: number
  settings?: TransformerInclude<SettingProfile>
}

export interface SettingProfile {
  sea_view: number
  mountain_view: number
  city_view: number
  clean: number
  free_wifi: number
  television: number
  free_gym: number
  swimming_pool: number
  free_parking: number
  near_hopping_center: number
  trip_purpose: number
}
