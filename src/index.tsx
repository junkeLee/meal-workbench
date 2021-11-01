import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import DashBoard from './pages/dashboard/dashboard';
import Cookbook from './pages/cookbook/cookbook';
import CookbookDetail from './pages/cookbook-detail/cookbook-detail';
import Category from './pages/category/category';

import reportWebVitals from './reportWebVitals';

import './index.scss';
import BreadCrumb from './components/breadcrumb';

const { Header, Content, Sider } = Layout;
const App = () => {
  return (
    <Layout className="container">
      <Sider>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <a href="/">首页</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="cookbooks">菜谱管理</a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="/category">类目管理</a>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-header">ddd</Header>
        <BreadCrumb />
        <Content className="content">
          <BrowserRouter>
            <Switch>
              <Route exact path="/cookbooks" component={Cookbook} />
              <Route exact path="/cookbooks/detail" component={CookbookDetail} />
              <Route exact path="/category" component={Category} />
              <Route exact path="/" component={DashBoard} />
            </Switch>
          </BrowserRouter>
        </Content>
      </Layout>
    </Layout>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
