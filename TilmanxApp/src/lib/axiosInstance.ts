import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {EnvironmentConfig} from './environment';
import {AsyncStorageKeys} from '../constants/store';

const apiBaseUrl = EnvironmentConfig.api_url;

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
