import axios from 'axios';

const baseUrl = 'http://localhost:7000/api';
const storageData = JSON.parse(localStorage.getItem('auth')) ;
const token = storageData?.token

const get = (url: string) => {
  return axios.get(`${baseUrl}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getById = (url: string, id: number) => {
  return axios.get(`${baseUrl}${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
      Authorization: `Bearer ${token}`,
    },
  });
};

const remove = (url: String, path: number) => {
  return axios.delete(`${baseUrl}${url}/${path}`, {
    headers: { ContentType: 'application.json' },
  });
};

export default { get, getById, post, update, remove };
