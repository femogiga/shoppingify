import axios from 'axios';

const baseUrl = 'http://localhost:7000/api';

const get = (url: string) => {
  return axios.get(`${baseUrl}${url}`);
};

const getById = (url: string, id: number) => {
  return axios.get(`${baseUrl}${url}/${id}`);
};

const post = (url, data) => {
  return axios.post(`${baseUrl}${url}`, data, {
    headers: {
      ContentType: 'application.json',
    },
  });
};

const update = (url, data) => {
  return axios.put(`${baseUrl}${url}`, data, {
    headers: {
      ContentType: 'application.json',
    },
  });
};

const remove = (url: String, path: number) => {
  return axios.delete(`${baseUrl}${url}/${path}`, {
    headers: { ContentType: 'application.json' },
  });
};

export default { get, getById, post, update, remove };
