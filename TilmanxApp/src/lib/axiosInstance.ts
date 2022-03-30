import axios from 'axios';

// TODO: use environment
const apiBaseUrl = 'http://192.168.2.100:8000/api/';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: headers,
});
