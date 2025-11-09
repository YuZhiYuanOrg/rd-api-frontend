// src/services/update/ReviewController.ts
import { request } from '@umijs/max';

/** 查询审查记录列表 */
export async function queryReviewList(
  params: {
    current?: number;
    pageSize?: number;
    device_id?: string;
    start_time?: string;
    end_time?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.PageResult<API.ReviewRecord>>('/api/v1/review', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
