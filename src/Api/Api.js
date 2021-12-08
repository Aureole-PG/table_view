import axios from 'axios';

export const Api = path => {
  return axios.create({
    baseURL: path,
  });
};
