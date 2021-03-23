import React, { memo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ConnectState } from 'states/connect';
import classNames from 'classnames/bind';
import { navigate } from 'utils/url-utils';
import { EXAMPLE } from 'constants/url';
import homeStore from './state';
import styles from './styles.scss';

const cx = classNames.bind(styles);

function PageHome() {
  const { count } = useSelector((x: ConnectState) => x.home);
  const gotoExample = useCallback(() => {
    navigate({
      url: EXAMPLE
    });
  }, []);


  useEffect(() => {
    const timer = window.setInterval(() => {
      homeStore.add(1);
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className={cx('page-home')}>
      这是首页
      <div onClick={gotoExample} className={cx('link')}>点击跳转到另一页</div>
      <div className={cx('counter')}>{count}</div>
    </div>
  );
}

export default memo(PageHome);
