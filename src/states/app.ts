import { State } from 'jumpstate';

export type AppStoreState = {

};

/**
 * 全局数据处理
 */
export const appStore = State('app', {
	initial: {},
	/**
	 * 更新全局数据
	 */
	setData(state: AppStoreState, payload: AppStoreState) {
		return {
			...state,
			...payload,
		};
	},
});
