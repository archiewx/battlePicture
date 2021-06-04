import axios from 'axios';
import JsonpAdapter from 'axios-jsonp';

const instance = axios.create({});
const jsonpInstance = axios.create({
  adapter: JsonpAdapter,
});

instance.interceptors.response.use((config) => {
  return config.data;
});

jsonpInstance.interceptors.response.use((config) => {
  return config.data;
});

export async function requestDoutuList(options) {
  return instance.get('https://www.dbbqb.com/api/search/json', {
    params: { ...options },
  });
}

export async function requestSGDoutuList(options) {
  return jsonpInstance({
    url: 'https://pic.sogou.com/napi/wap/pic',
    params: { ...options },
    headers: {
      Referer: `https://pic.sogou.com/pic/emo/searchList.jsp?statref=search_form&uID=${(
        Math.random() * 10000000
      )
        .toString(16)
        .slice(1)}&spver=0&rcer=${encodeURIComponent(options.query)}`,
    },
  });
}
