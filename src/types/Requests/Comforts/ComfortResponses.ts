import {TransformerInclude} from '@/types/Requests/ResponseTemplate';

export interface ComfortIndexRes {
  id: number,
  icon: string,
  details: TransformerInclude<ComfortTranslatesRes[]>
}

export interface ComfortTranslatesRes {
  id: number
  comfort_id: number
  name: string
}
