import axios from 'axios';
import { useAuthStore } from '../statemanagment/AuthStore';

const baseUrl = 'http://localhost:7000/api';

// Helper function to get fresh token
const getToken = () => {
  return useAuthStore.getState().token;
};

const get = (url: string) => {
  const token = getToken();
  return axios.get(`${baseUrl}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getById = (url: string, id: number) => {
  const token = getToken();
    console.log({ token });

  return axios.get(`${baseUrl}${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const post = (url: string, data: any) => {
  const token = getToken();
 // console.log({token})
  return axios.post(`${baseUrl}${url}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};


const authPost = (url: string, data: any) => {

  return axios.post(`${baseUrl}${url}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


const multiPartPost = (url: string, data: any) => {
  return axios.post(`${baseUrl}${url}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


const update = (url: string, data: any) => {
  const token = getToken();
  return axios.put(`${baseUrl}${url}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const remove = (url: string, id: number) => {
  const token = getToken();
  return axios.delete(`${baseUrl}${url}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default { get, getById, post, update, remove, authPost, multiPartPost };
