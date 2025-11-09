// src/services/update/DeviceController.ts
import { request } from '@umijs/max';

/** 查询设备信息列表 */
export async function queryDeviceList(
  params: {
    current?: number;
    pageSize?: number;
    os?: string;
    device_id?: string;
    typ?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.PageResult<API.DeviceInfo>>('/api/v1/device', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 删除设备信息 */
export async function deleteDevice(
  params: {
    id: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result>('/api/v1/device', {
    method: 'DELETE',
    params,
    ...(options || {}),
  });
}
