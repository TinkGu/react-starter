import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.scss';

const cx = classNames.bind(styles);

/**
 * 未找到页面
 */
function NotFound() {
  return (
    <div className={cx('page-container')}>
      <p>您访问的页面不存在</p>
      <p>{window.location.pathname}</p>
    </div>
  );
}

// 页面入口
export default (props: any) => <NotFound {...props} />;
