import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AsyncStorageKeys} from '../constants/store';

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

axiosInstance.interceptors.request.use(async axiosRequestConfig => {
  const accessToken = await AsyncStorage.getItem(AsyncStorageKeys.ACCESS_TOKEN);
  if (accessToken) {
    axiosRequestConfig.headers!.Authorization = `Bearer ${accessToken}`;
  } else {
    delete axiosRequestConfig.headers!.Authorization;
  }
  return axiosRequestConfig;
});
