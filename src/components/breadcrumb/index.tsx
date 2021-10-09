import React from 'react';
import { Breadcrumb } from 'antd';

import './index.scss';

interface Path {
  link: string,
  name: string
};

const BreadCrumb = () => {
  const pathname = window.location.pathname;
  const pathList: Path[] = [];

  function slicePath(str: string) {
    if (!str) return;
    const lastIndex = str.lastIndexOf('/');
    const name = str.slice(lastIndex);
    const restPath = str.replace(name, '');
    pathList.unshift({
      link: str,
      name: name.slice(1)
    });
    slicePath(restPath);
  };

  slicePath(pathname);

  return (
    <div className="breadcrumb-container">
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">Home</a>
        </Breadcrumb.Item>
        {pathList.map(path => (
          <Breadcrumb.Item key={path.link}>
            <a href={path.link}>{path.name}</a>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
