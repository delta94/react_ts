export interface BaseGetRequestParams {
  include?: string,
  limit?: number
}

export interface PromiseCallBack<T = any> {
  callback: (...params: any[]) => Promise<T>,
  params: any[]
}
