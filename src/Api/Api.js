import axios from 'axios';

export const Api = (path = '192.168.100.1:3000') => {
  return axios.create({
    baseURL: `http://${path}`,
  });
};
