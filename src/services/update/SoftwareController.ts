// src/services/update/SoftwareController.ts
import { request } from '@umijs/max';

/** 查询软件下载地址列表 */
export async function querySoftwareList(
  params: {
    current?: number;
    pageSize?: number;
    os?: string;
    arch?: string;
    typ?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.PageResult<API.SoftwareDownload>>('/api/v1/software', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 添加软件下载地址 */
export async function addSoftware(
  body: API.SoftwareDownload,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/v1/software', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新软件下载地址 */
export async function updateSoftware(
  params: {
    id: string;
  },
  body: API.SoftwareDownload,
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/api/v1/software/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除软件下载地址 */
export async function deleteSoftware(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/api/v1/software/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
