import axios from 'axios';
import qs from 'qs';
import React from 'react';
import {
  API_PATH,
  AUTH_API_PATH,
  STORE_URL,
} from '../constants/config.constants';
import {AuthenticationContext} from '../contexts/AuthContext';
interface Props {
  isAuthApi?: boolean;
}
const useAxios = (isAuthApi = false) => {
  const {
    state: {storeToken},
  } = React.useContext(AuthenticationContext);
  /*  console.log(storeToken); */
  //console.log(isAuthApi);

  const instance = axios.create({
    baseURL: STORE_URL + (isAuthApi ? AUTH_API_PATH : API_PATH),
    headers: {
      'Content-Type': isAuthApi
        ? 'application/x-www-form-urlencoded'
        : 'application/json',
    },
  });
  instance.interceptors.request.use(
    config => {
      config = {
        ...config,
        data: isAuthApi
          ? qs.stringify(config.data)
          : {
              ...config.data,

              token: storeToken,
            },
      };
      return config;
    },
    error => {
      console.log('interceptors error', error);

      return Promise.reject(error);
    },
  );
  return instance;
};

export default useAxios;
