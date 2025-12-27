// src/pages/update/device/index.tsx
import services from '@/services/update';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';

const { queryDeviceList, deleteDevice } = services.DeviceController;

const handleRemove = async (selectedRows: API.DeviceInfo[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows || selectedRows.length === 0) return true;
  try {
    for (const row of selectedRows) {
      if (row.id) {
        await deleteDevice({ id: row.id });
      }
    }
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const DeviceList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRows, setSelectedRows] = useState<API.DeviceInfo[]>([]);

  const columns = [
    {
      title: '设备ID',
      dataIndex: 'id',
      search: true,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      search: true,
    },
    {
      title: '系统版本',
      dataIndex: 'os_version',
    },
    {
      title: '架构',
      dataIndex: 'arch',
    },
    {
      title: '类型',
      dataIndex: 'typ',
      search: true,
    },
    {
      title: '请求时间',
      dataIndex: 'request_time',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="delete"
          onClick={async () => {
            const success = await handleRemove([record]);
            if (success && actionRef.current) {
              actionRef.current.reload();
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer title="设备信息管理">
      <ProTable<API.DeviceInfo>
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={async (params) => {
          const { data } = await queryDeviceList(params);
          return {
            data: data?.list || [],
            total: data?.total || 0,
            success: true,
          };
        }}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        toolBarRender={() => [
          <Button
            danger
            onClick={async () => {
              const success = await handleRemove(selectedRows);
              if (success && actionRef.current) {
                actionRef.current.reload();
                setSelectedRows([]);
              }
            }}
            key="batch-delete"
          >
            批量删除
          </Button>,
        ]}
      />
      {selectedRows.length > 0 && (
        <FooterToolbar>已选择 {selectedRows.length} 项</FooterToolbar>
      )}
    </PageContainer>
  );
};

export default DeviceList;
