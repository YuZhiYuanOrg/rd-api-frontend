// src/pages/update/review/index.tsx
import services from '@/services/update';
import {
  PageContainer,
  ProFormDateRangePicker,
  ProTable,
} from '@ant-design/pro-components';
import { ActionType } from '@ant-design/pro-components/es/table';
import { useRef } from 'react';

const { queryReviewList } = services.ReviewController;

const ReviewRecord: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: '设备ID',
      dataIndex: 'id',
      search: true,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
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
    },
    {
      title: '返回地址',
      dataIndex: 'download_url',
    },
    {
      title: '响应时间',
      dataIndex: 'response_time',
      valueType: 'dateTime',
      search: false,
    },
  ];

  return (
    <PageContainer title="审查记录查询">
      <ProTable<API.ReviewRecord>
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={async (params) => {
          // 处理时间范围查询
          if (params.dateRange && params.dateRange.length === 2) {
            params.start_time = params.dateRange[0].format(
              'YYYY-MM-DD HH:mm:ss',
            );
            params.end_time = params.dateRange[1].format('YYYY-MM-DD HH:mm:ss');
          }
          delete params.dateRange;

          const { data } = await queryReviewList(params);
          return {
            data: data?.list || [],
            total: data?.total || 0,
            success: true,
          };
        }}
        search={{
          items: [
            {
              name: 'id',
              label: '设备ID',
              type: 'text',
            },
            {
              name: 'dateRange',
              label: '时间范围',
              type: 'dateRange',
              component: ProFormDateRangePicker,
            },
          ],
        }}
        pagination={{
          pageSize: 10,
        }}
      />
    </PageContainer>
  );
};

export default ReviewRecord;
