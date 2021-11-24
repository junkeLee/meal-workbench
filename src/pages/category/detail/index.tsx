import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, Select, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ICategory } from 'interfaces/category.interface';
import { editCategory, addCategory } from '../service';

import './index.scss';
interface IProps {
  visible?: boolean;
  item?: ICategory;
  rootList?: ICategory[];
  onClose?: Function;
  onFinish?: Function;
};

const CategoryDetail = (props: IProps) => {
  const { visible, item, rootList, onClose, onFinish } = props;

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  }

  useEffect(() => {
    form.setFieldsValue({
      name: item?.name,
      image: item?.image,
      parentId: item?.parentId ?? 0
    });
  }, [item?.id]);

  /**
   * 
   * @param info 文件信息
   * @returns 
   */
   const handleUploadChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      setImage(info.file.response.data);
      form.setFieldsValue({ image: info.file.response.data });
    }
  };

  const submit = async() => {
    const value = form.getFieldsValue();
    console.log('value', value);

    const data = {
      ...value,
      isRoot: value.parentId ? 0 : 1,
      parentId: value.parentId ?? null
    };

    if (item?.id) {
      await editCategory({...data, id: item?.id });
      onFinish();
      return;
    }
    addCategory(data);
  };

  return (
    <Modal
      title={item?.id ? '编辑': '新建'}
      visible={visible}
      okText="确定"
      cancelText="关闭"
      onCancel={() => onClose()}
      onOk={submit}
    >
      <Form
        layout="horizontal"
        form={form}
      >
        <Form.Item label="名称" {...formItemLayout} name="name" required>
          <Input />
        </Form.Item>
        <Form.Item label="图标" {...formItemLayout} name="image" required>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar"
            showUploadList={false}
            action="/api/file/upload"
            onChange={handleUploadChange}
          >
            {image ? (
              <Image src={image} preview={false} />
              ) : (
              <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="父级类目" {...formItemLayout} name="parentId" required>
          <Select>
            <Select.Option value={0}>无</Select.Option>
            {rootList?.map(item => (
              <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryDetail;
