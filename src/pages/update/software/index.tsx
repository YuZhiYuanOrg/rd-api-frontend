// src/pages/update/software/index.tsx
import services from '@/services/update';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, message, Space } from 'antd';
import React, { useRef, useState } from 'react';

const { querySoftwareList, addSoftware, updateSoftware, deleteSoftware } =
  services.SoftwareController;

const SoftwareConfig: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<API.SoftwareDownload | null>(
    null,
  );
  const [formValues, setFormValues] = useState<API.SoftwareDownload>(
    {} as API.SoftwareDownload,
  );

  const handleAdd = async () => {
    setCurrentItem(null);
    setFormValues({} as API.SoftwareDownload);
    setVisible(true);
  };

  const handleEdit = (record: API.SoftwareDownload) => {
    setCurrentItem(record);
    setFormValues({ ...record });
    setVisible(true);
  };

  const handleDelete = async (id: string) => {
    const hide = message.loading('正在删除');
    try {
      await deleteSoftware({ id });
      hide();
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
    }
  };

  const handleSubmit = async () => {
    const hide = message.loading(currentItem ? '正在更新' : '正在添加');
    try {
      if (currentItem && currentItem.id) {
        await updateSoftware({ id: currentItem.id }, formValues);
      } else {
        await addSoftware(formValues);
      }
      hide();
      message.success(currentItem ? '更新成功' : '添加成功');
      setVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      hide();
      message.error(currentItem ? '更新失败，请重试' : '添加失败，请重试');
    }
  };

  const columns: ProColumns<API.SoftwareDownload>[] = [
    {
      title: '操作系统',
      dataIndex: 'os',
      search: true,
    },
    {
      title: '系统版本',
      dataIndex: 'os_version',
      search: true,
    },
    {
      title: '架构',
      dataIndex: 'arch',
      search: true,
    },
    {
      title: '类型',
      dataIndex: 'typ',
      search: true,
    },
    {
      title: '版本号',
      dataIndex: 'version',
      search: true,
    },
    {
      title: '下载地址',
      dataIndex: 'download_url',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a key="edit" onClick={() => handleEdit(record)}>
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => handleDelete(record.id as string)}
          style={{ color: '#ff4d4f' }}
        >
          删除
        </a>,
      ],
    },
  ];

  const osOptions = [
    { label: 'Windows', value: 'Windows' },
    { label: 'Ubuntu', value: 'Ubuntu' },
    { label: 'MacOS', value: 'MacOS' },
    { label: 'Android', value: 'Android' },
    { label: 'Flatpak', value: 'Flatpak' },
  ];

  const archOptions = [
    { label: 'x86_64', value: 'x86_64' },
    { label: 'aarch64', value: 'aarch64' },
    { label: 'armv7', value: 'armv7' },
    { label: 'x86-32', value: 'x86-32' },
  ];

  const typeOptions = [
    { label: 'rustdesk-client', value: 'rustdesk-client' },
    { label: 'msi', value: 'msi' },
  ];

  return (
    <PageContainer title="软件下载地址配置">
      <ProTable<API.SoftwareDownload>
        actionRef={actionRef}
        rowKey="id"
        columns={columns}
        request={async (params) => {
          const { data } = await querySoftwareList(params);
          return {
            data: data?.list || [],
            total: data?.total || 0,
            success: true,
          };
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={handleAdd} key="add-config">
            添加配置
          </Button>,
        ]}
      />

      <Drawer
        title={currentItem ? '编辑软件配置' : '添加软件配置'}
        open={visible}
        onClose={() => setVisible(false)}
        width={600}
      >
        <ProForm
          initialValues={formValues}
          onValuesChange={(_, allValues) =>
            setFormValues(allValues as API.SoftwareDownload)
          }
          onFinish={handleSubmit}
          layout="vertical"
          submitter={false}
        >
          <ProFormSelect
            name="os"
            label="操作系统"
            options={osOptions}
            rules={[{ required: true, message: '请选择操作系统' }]}
          />
          <ProFormText
            name="os_version"
            label="系统版本"
            rules={[{ required: true, message: '请输入系统版本' }]}
          />
          <ProFormSelect
            name="arch"
            label="架构"
            options={archOptions}
            rules={[{ required: true, message: '请选择架构' }]}
          />
          <ProFormSelect
            name="typ"
            label="类型"
            options={typeOptions}
            rules={[{ required: true, message: '请选择类型' }]}
          />
          <ProFormText
            name="version"
            label="软件版本"
            rules={[
              { required: true, message: '请输入软件版本号' },
              { whitespace: true, message: '版本号不能包含空格' },
            ]}
          />
          <ProFormText
            name="download_url"
            label="下载地址"
            rules={[{ required: true, message: '请输入下载地址' }]}
          />
          <ProFormTextArea
            name="description"
            label="描述"
            placeholder="请输入描述信息"
          />
          <Space.Compact>
            <Button onClick={() => setVisible(false)}>取消</Button>
            <Button type="primary" htmlType="submit">
              {currentItem ? '更新' : '添加'}
            </Button>
          </Space.Compact>
        </ProForm>
      </Drawer>
    </PageContainer>
  );
};

export default SoftwareConfig;
