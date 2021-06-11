import { createActions, io } from '@nnwa/redux-saga-actions';
import { requestSGDoutuList } from '../services';

const global = {
  namespace: 'global',

  state: {
    loading: false,
    sgDoutu: {
      query: {
        query: '哈哈 表情',
        start: 0,
        reqFrom: 'wap_result',
        xml_len: 48,
      },
      list: [],
      more: 0,
      total: 0,
    },

    query: { start: 0, w: '哈哈', size: 30 },
    list: [],
  },

  effects: {
    *fetchPicList() {
      const { query } = yield io.select((state) => state.global);
      const ret = yield io.call(window.$api.fetchPicList, query);

      yield io.put(
        globalActions.setState({
          list: ret.map((item) => ({
            ...item,
            url: `https://image.dbbqb.com/${item.path}`,
          })),
        })
      );
      return true;
    },

    *fetchSogouTuList() {
      const { sgDoutu } = yield io.select((state) => state.global);
      const ret = yield requestSGDoutuList(sgDoutu.query);

      if (ret.status === 0) {
        const { data } = ret;
        yield io.put(
          globalActions.setState({
            sgDoutu: {
              query: { ...sgDoutu.query },
              list: data.items,
              more: sgDoutu.query.start < data.maxEnd,
              total: data.maxEnd,
            },
          })
        );
        return true;
      }
      return false;
    },
  },

  reducers: {
    updateQuery(state, { payload }) {
      return {
        ...state,
        sgDoutu: {
          ...state.sgDoutu,
          query: { ...state.sgDoutu.query, ...payload },
        },
      };
    },

    setPage(state, { payload }) {
      return {
        ...state,
        sgDoutu: {
          ...state.sgDoutu,
          query: {
            ...state.sgDoutu.query,
            start: (payload.page - 1) * state.sgDoutu.query.xml_len,
          },
        },
      };
    },
  },
};

export default global;

export const globalActions = createActions(global);
