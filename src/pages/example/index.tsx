import React from 'react';
import PageLoader from 'components/page-loader';

const PageExample = PageLoader({
  loader: () => import(/* webpackChunkName: "page-example" */ './main'),
});

// 页面入口
export default (props: any) => <PageExample {...props} />;
