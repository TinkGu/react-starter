import { State } from 'jumpstate';

export type HomeStoreState = {
  count: number;
}

const initial: HomeStoreState = {
  count: 0,
};

export default State('home', {
  initial,
  add(state: HomeStoreState, payload: number) {
    return {
      ...state,
      count: state.count + payload,
    };
  }
});
