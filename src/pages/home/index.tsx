import React from 'react';
import PageLoader from 'components/page-loader';

const PageHome = PageLoader({
  loader: () => import(/* webpackChunkName: "page-homepage" */ './main'),
  reducer: {
    home: () => import(/* webpackChunkName: "page-home-store" */ 'pages/home/state'),
  },
});

// 页面入口
export default (props: any) => <PageHome {...props} />;
