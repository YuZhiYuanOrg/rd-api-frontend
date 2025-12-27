// src/services/update/typings.d.ts
/* eslint-disable */
declare namespace API {
  // 设备信息
  interface DeviceInfo {
    id?: string;
    os: string;
    os_version: string;
    arch: string;
    id: string;
    typ: string;
    request_time?: string; // 发送时间
  }

  // 软件下载地址
  interface SoftwareDownload {
    id?: string;
    os: string;
    os_version: string;
    arch: string;
    typ: string;
    download_url: string;
    description?: string;
    updated_at?: string;
  }

  // 审查记录
  interface ReviewRecord {
    id?: string;
    id: string;
    download_url: string;
    response_time: string;
    os: string;
    os_version: string;
    arch: string;
    typ: string;
  }

  // 分页结果
  interface PageResult<T> {
    success?: boolean;
    errorMessage?: string;
    data?: {
      list: T[];
      total: number;
      current: number;
      pageSize: number;
    };
  }
}
