import axios from 'axios';

const instance = axios.create({});

instance.interceptors.response.use((config) => {
  return config.data;
});

export async function requestDoutuList(options) {
  return instance.get('/api/search', {
    params: { mime: 0, ...options },
  });
}
