import React, { Fragment } from 'react';
import { Row, Col, Table, Image, Divider } from 'antd';

import imgurl from 'utils/imgurl';

import { connector, PropsFromRedux } from './connector';
import CategoryDetail from './detail';

import { ICategory } from './category.interface';
import { getList } from './service';

import './category.scss';

interface IProps extends PropsFromRedux {
  a?: string
};

interface IState {
  visible?: boolean;
  rootList?: ICategory[];
  secondaryList?: ICategory[];
};

class Category extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: true,
      rootList: [],
      secondaryList: []
    }
  }

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '图标',
      dataIndex: 'image',
      width: 100,
      render: (text: string) => (
        <Image width={48} src={imgurl(text || '/cookbooks/17c82a99e2afc642d72ba705.jpg')}/>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: string, record: ICategory) => (
        <div className="action">
          {!!record.isRoot && (
            <Fragment>
              <a onClick={() => this.getSecondaryList(record.id)}>展开子集</a>
              <Divider type="vertical" />
            </Fragment>
          )}
          <a>编辑</a>
        </div>
      )
    }
  ];

  componentDidMount() {
    console.log('props', this.props);
    this.getList();
  }

  getSecondaryList(pid: number) {
    this.getList({ parentId: pid, isRoot: 0 }, 'secondaryList');
  }

  async getList(params = {}, key = 'rootList') {
    const res = await getList(params);
    console.log('res', res);
    this.setState({
      [key]: res?.data || []
    });
  }

  render() {
    const { visible, rootList, secondaryList } = this.state;
    return (
      <Row className="category">
        <Col className="block" span={11}>
          <h3>一级类目</h3>
          <Table
            size="small"
            columns={this.columns}
            dataSource={rootList}
            rowKey={record => (record.name as string)}
            pagination={false}
          />
        </Col>
        <Col className="block" span={2}></Col>
        <Col className="block" span={11}>
          <h3>二级类目</h3>
          <Table
            size="small"
            columns={this.columns}
            dataSource={secondaryList}
            rowKey={record => (record.name as string)}
            pagination={false}
          />
        </Col>
        <CategoryDetail
          visible={visible}
          rootList={rootList}
          id={2}
        />
      </Row>
    );
  }
};

export default connector(Category);
