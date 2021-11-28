/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import { Row, Col, Table, Image, Divider, Button } from 'antd';
import CategoryDetail from './detail';

import { ICategory } from 'interfaces/category.interface';
import { getList } from './service';

import './category.scss';

enum CloseType {
  Pure,
  Effect
};

interface IProps {
};

interface IState {
  visible?: boolean;
  choosedRootItem?: ICategory;
  choosedEditItem?: ICategory;
  list?: ICategory[];
  rootList?: ICategory[];
  secondaryList?: ICategory[];
};

class Category extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
      choosedRootItem: null,
      choosedEditItem: null,
      list: [],
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
        <Image width={48} src="https://static.meishichina.com/v6/img/zhen/r07.jpg"/>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: string, record: ICategory) => (
        <div className="action">
          {record.isRoot > 0 && (
            <Fragment>
              <a href="#" onClick={() => this.getSecondaryList(record)}>展开子类目</a>
              <Divider type="vertical" />
            </Fragment>
          )}
          <a onClick={() => this.openDetailModal(record)}>编辑</a>
        </div>
      )
    }
  ];

  componentDidMount() {
    this.loadData();
  }

  /**
   * 获取类目数据
   * @param params 查询字段
   */
  async loadData(params = {}) {
    const res = await getList(params);
    this.setState({
      list: res.data,
      rootList: this.filterRootList(res.data)
    });
  }

  /**
   * 获取子类目
   * @param item 选中的类目
   * @returns 
   */
  getSecondaryList(item: ICategory) {
    const { list } = this.state;
    this.setState({
      choosedRootItem: item,
      secondaryList: list.filter(i => i.parentId === item.id)
    });
  }

  /**
   * 打开编辑类目弹框
   * @param item 要编辑的类目
   */
  openDetailModal(item?: ICategory) {
    this.setState({
      choosedEditItem: item ?? null,
      visible: true
    });
  }

  closeDetailModal(closeType: CloseType) {
    this.setState({ visible: false });
    closeType === CloseType.Effect && this.loadData();
  }

  /**
   * 获得根类目列表
   * @param list 类目列表
   * @returns 
   */
   filterRootList(list: ICategory[]) {
    return list.filter(i => i.isRoot);
  }

  render() {
    const { visible, choosedRootItem, choosedEditItem, rootList, secondaryList } = this.state;
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
          <div className="action">
            <Button type="primary" onClick={() => this.openDetailModal()}>新建</Button>
          </div>
        </Col>
        <Col className="block" span={2}></Col>
        <Col className="block" span={11}>
          <h3>{choosedRootItem?.name && `${choosedRootItem.name}-`}二级类目</h3>
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
          item={choosedEditItem}
          onClose={() => this.closeDetailModal(CloseType.Pure)}
          onFinish={() => this.closeDetailModal(CloseType.Effect)}
        />
      </Row>
    );
  }
};

export default Category;
