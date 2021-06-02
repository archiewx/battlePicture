import { createActions, io } from '@nnwa/redux-saga-actions';
import { requestDoutuList } from '../services';

const global = {
  namespace: 'global',

  state: {
    doutu: {
      query: { keyword: '', page: 1 },
      list: [],
      more: 0,
    },
  },

  reducers: {},

  effects: {
    *fetchAllDoutuList() {
      const { doutu } = yield io.select((state) => state.global);
      yield requestDoutuList(doutu.query);
    },
  },
};

export default global;

export const globalActions = createActions(global);
