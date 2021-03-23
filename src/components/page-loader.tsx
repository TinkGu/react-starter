import React from 'react';
import { injectAsyncReducer } from '../store';

const noop = () => null;

type perLoadState = {
  promise: Promise<React.FunctionComponent>;
}

type ReducerObject = {
  [propName: string]: any;
}

/**
 * 预加载组件
 * @param {组件}} 组件
 * @param {redux} reducer
 */
function perLoad(component: Function, reducer: ReducerObject) {
  const state: perLoadState = {
    promise: Promise.resolve(() => null)
  }; //返回state
  const reducerKeys = Object.keys(reducer);
  const storeReducer: Record<string, ReducerObject> = {};
  let promiseList = reducerKeys.map(key => {
    return reducer[key]().then((res: ReducerObject) => {
      storeReducer[key] = res.default;
      return res;
    });
  });
  promiseList = [component(), ...promiseList];
  state.promise = Promise.all(promiseList)
    .then(([component]) => {
      injectAsyncReducer(storeReducer);
      return component.default;
    })
    .catch(err => {
      throw err;
    });
  return state;
}

interface PageLoaderOptions {
  loader: () => {};
  reducer?: ReducerObject;
  loading?: React.FunctionComponent;
  error?: React.FunctionComponent<{ errmsg?: string }>;
  onEnter?: (props: ReducerObject) => {};
}

/**
 * 页面加载配置
 */
export default function PageLoader(options: PageLoaderOptions = {} as PageLoaderOptions) {
  const opt = {
    onEnter: options.onEnter || undefined,
    loading: options.loading || noop,
    loader: options.loader || noop,
    error: options.error || noop,
    reducer: options.reducer || {}
  };

  let stateStore: perLoadState;

  if (options.onEnter && typeof options.onEnter !== 'function') {
    throw new Error('Config onEnter must be function');
  }

  return class PLoader extends React.PureComponent<{}, {
    PageComponent: React.FunctionComponent;
    isLoading: boolean;
    hasError: boolean;
    error: boolean;
    errorInfo: string;
  }> {
    constructor(props: any) {
      super(props);
      stateStore = perLoad(opt.loader, opt.reducer);
      this.state = {
        PageComponent: () => null,
        isLoading: true,
        hasError: false,
        error: false,
        errorInfo: ''
      };
    }

    async componentDidMount() {
      try {
        const pageComponent = await stateStore.promise;
        if (opt.onEnter) {
          await opt.onEnter(this.props);
        }
        this.setState({
          PageComponent: pageComponent
        });
      } catch (err) {
        console.error(err.stack, JSON.stringify(err.message));
        this.setState({
          error: true,
          errorInfo: JSON.stringify(err.message || '哦，出错了！')
        });
      } finally {
        this.setState({
          isLoading: false
        });
      }
    }

    componentWillUnmount() {
      // remove dynamic reducer
      if (opt.reducer) {
        const storeNames = Object.keys(opt.reducer);
        injectAsyncReducer(
          storeNames.reduce((o, key) => {
            o[key] = false;
            return o;
          }, {} as ReducerObject)
        );
      }
    }

    render() {
      const { isLoading, PageComponent, error, errorInfo } = this.state;
      if (isLoading) {
        return <opt.loading />;
      }

      if (error) {
        return <opt.error errmsg={`Oops！出错了！${errorInfo}`} />;
      }
      return <PageComponent {...this.props} />;
    }
  };
}
