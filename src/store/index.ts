import { createStore, applyMiddleware, combineReducers } from 'redux';
import { CreateJumpstateMiddleware } from 'jumpstate';
import { initialReducers } from '../states';

export let store: Record<string, any> = {};

/**
 * 初始化数据状态管理
 * @param {初始化数据} initialReducers
 */
function createReducerManager(initialReducers: Record<string, any>) {
  const reducers = { ...initialReducers };
  let combinedReducer = combineReducers(reducers);

  return {
    getReducer: () => combinedReducer,
    reduce: (state: {}, action: any) => combinedReducer(state, action),
    add: (key: string, reducer: Record<string, any>) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    remove: (key: string) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      combinedReducer = combineReducers(reducers);
    },
  };
}

/**
 * 动态切换reducer
 * @param {object} reducers
 */
export function injectAsyncReducer(reducers: Record<string, any> = {}) {
  Object.keys(reducers).forEach((key) => {
    if (!reducers[key]) {
      store.reducerManager.remove(key);
    } else {
      store.reducerManager.add(key, reducers[key]);
    }
  });
  store.replaceReducer(store.reducerManager.getReducer());
}

/**
 * 初始化store
 * @param  {Object} initialState [description]
 * @return {[type]}              [description]
 */
export function configureStore(initialState: Record<string, any> = {}) {
  const reducerManager = createReducerManager(initialReducers);
  const middlewares = [CreateJumpstateMiddleware()];
  store = applyMiddleware(...middlewares)(createStore)(reducerManager.reduce, initialState);
  store.reducerManager = reducerManager;
  return store;
}
