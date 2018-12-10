import {AxiosResponse} from 'axios';

export interface BaseResponse<T = any> {
  code: number;
  status: string;
  data: T;
  message?: string;
  meta?: Pagination;
}

export interface TransformerInclude<T> {
  data: T | Array<T>;
}

export interface TypeSelect {
  id: number;
  value: string;
}

export interface ErrorValidate<E = any, T = Array<any>> {
  errors: PartialType<E, T>;
  error: string;
  exception: string;
}

/**
 * Pagination from response
 */
interface Pagination {
  pagination: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: {
      next: string;
      previous: string;
    } | Array<any>
  }
}

export interface AxiosRes<T> extends AxiosResponse<BaseResponse<T>> {

}

type PartialType<E, T = any> = {
  [P in keyof E]: T;
}
