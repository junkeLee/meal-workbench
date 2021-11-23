import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Upload, Select, Radio, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ICategory } from 'interfaces/category.interface';
import { getDetail } from '../service';

import './index.scss';

interface IProps {
  visible?: boolean;
  id?: number;
  rootList?: ICategory[]
};

const CategoryDetail = (props: IProps) => {
  const { visible, id, rootList } = props;

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('新建');
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  }

  useEffect(() => {
    loadData(id);
  }, [visible]);

  const loadData = async(id: number) => {
    if (id > 0) {

      const res = await getDetail(id);
      console.log('res', res);
      // 加载数据
      form.setFieldsValue({
        name: '测试的',
        image: 'http://image.yoolife.cn/cookbooks/17d0d941127111576ea8adecf.jpg',
        isRoot: 0,
        parentId: 1
      });
      setTitle('编辑');
      setImage('http://image.yoolife.cn/cookbooks/17d0d941127111576ea8adecf.jpg')
      return;
    }
    // 新建
    
  };

   const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      console.log('info', info);
      setImage(info.file.response.data);
      form.setFieldsValue({ image: info.file.response.data });
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      okText="确定"
      cancelText="关闭"
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
            onChange={handleChange}
          >
            {image ? (
              <Image src={image} preview={false} />
              ) : (
              <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item label="是否根类目" name="isRoot" required>
          <Radio.Group>
            <Radio value={1}>是</Radio>
            <Radio value={0}>否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="父级类目" {...formItemLayout} name="parentId" required>
          <Select>
            {rootList?.map(item => (
              <Select.Option key={item.id} value={item.parentId}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryDetail;
