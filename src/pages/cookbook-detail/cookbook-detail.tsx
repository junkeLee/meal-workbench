import React, { Fragment } from 'react';
import { Button, Form, Input } from 'antd';

const CookbookDetail = () => {

  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 9 }
  };

  const formItemOffsetLayout = {
    wrapperCol: { offset: 3, span: 9 }
  };

  const submit = (value: string) => {
    console.log(value);
  };

  return (
    <div className="cookbook-detail">
      <Form onFinish={submit}>
        <Form.Item label="名称" name="name" {...formItemLayout}>
          <Input />
        </Form.Item>
        <Form.Item label="头图" name="banner" {...formItemLayout}>
          <Input />
        </Form.Item>
        <Form.Item label="简短描述" name="summary" {...formItemLayout}>
          <Input />
        </Form.Item>
        <Form.Item label="所属类目" name="categories" {...formItemLayout}>
          <Input />
        </Form.Item>
        <Form.Item label="标签" name="tags" {...formItemLayout}>
          <Input />
        </Form.Item>
        <Form.List name="steps">
          {(fields, { add, remove }) => (
            <Fragment>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Form.Item key={key} label={`步骤${key + 1}`} {...formItemLayout} style={{ margin: 0 }}>
                  <Form.Item
                    {...restField}
                    name={[name, 'text']}
                    fieldKey={[fieldKey, 'text']}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'image']}
                    fieldKey={[fieldKey, 'image']}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Form.Item>
              ))}
              <Form.Item {...formItemOffsetLayout}>
                <Button type="dashed" onClick={() => add()}>
                  增加步骤
                </Button>
              </Form.Item>
            </Fragment>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CookbookDetail;
