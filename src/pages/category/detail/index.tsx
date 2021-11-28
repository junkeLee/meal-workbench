import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ICategory } from 'interfaces/category.interface';
import { editCategory, addCategory } from '../service';

import './index.scss';
interface IProps {
  visible?: boolean;
  item?: ICategory;
  rootItem?: ICategory;
  rootList?: ICategory[];
  onClose?: Function;
  onFinish?: Function;
};

const CategoryDetail = (props: IProps) => {
  const { visible, item, rootItem, onClose, onFinish } = props;

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
      image: item?.image
    });
  }, [visible]);

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
    // const value = form.getFieldsValue();
    const value = await form.validateFields();
    console.log('value', value);

    const data = {
      ...value,
      image: 'test.png',
      isRoot: rootItem ? 0 : 1,
      parentId: rootItem?.id ?? null
    };

    if (item?.id) {
      await editCategory({...data, id: item?.id });
      onFinish();
      return;
    }
    addCategory(data);
    onFinish();
  };

  return (
    <Modal
      title={item?.id ? '编辑': '新建'}
      visible={visible}
      okText="确定"
      cancelText="关闭"
      onCancel={() => onClose()}
      onOk={submit}
      afterClose={() => form.resetFields()}
    >
      <Form
        layout="horizontal"
        form={form}
      >
        <Form.Item
          {...formItemLayout}
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入类目名称',
            },
            {
              max: 5,
              message: '最多五个字'
            }
          ]}
        >
          <Input placeholder="请输入类目名称，最多五个字" />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="图标"
          name="image"
          required
        >
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
        <Form.Item label="所属类目" {...formItemLayout}>
          {rootItem?.name || '无'}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryDetail;
