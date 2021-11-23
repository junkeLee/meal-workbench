import React from 'react';
// import test from 'images/test.svg';
import './dashboard.scss';

const Svg = (props) => {
  return (
    <svg width="100" height="100">
      {props.children}
    </svg>
  );
};

const DashBoard = () => (
  <div>
    <Svg>
      <line x1="3" y1="3" x2="48" y2="3"></line>
    </Svg>
    <svg width="750" height="500">
      {/* 线段 */}
      {/* <line x1="3" y1="3" x2="48" y2="3"></line>
        <line x1="3" y1="19" x2="65" y2="19"></line>
        <line x1="3" y1="35" x2="48" y2="35"></line>
        <line x1="3" y1="51" x2="65" y2="51"></line> */}
      {/* 右箭头 */}
      {/* <polyline points="3 3, 30 28, 3 53"></polyline> */}
      {/* 浏览器图标 */}
      {/* <rect x="3" y="3" width="80" height="60" rx="10" ry="10"></rect>
        <line x1="3" y1="19" x2="83" y2="19"></line>
        <line x1="20" y1="3" x2="20" y2="17"></line> */}
      {/* 感叹号 */}
      {/* <ellipse cx="43" cy="43" rx="40" ry="40"></ellipse> */}
      {/* 三角形 */}
      {/* <polygon points="35 23, 60 43, 35 63" /> */}
      {/* 路径 */}
      {/* <path d="
        M 18 3
        L 46 3
        L 46 40
        L 61 40
        L 30 70
        L 3 40
        L 18 40
        Z
      ">

      </path> */}
    </svg>
  </div>
);

export default DashBoard;
