import { API_KEY } from './constants.js';

export default class Interceptors {
  axios;

  constructor(axios) {
    this.axios = axios;
  }

  addRequestInterceptor() {
    const onSend = (config) => {
      if (config.headers) {
        config.headers['x-api-key'] = API_KEY;
      }
      return config;
    };

    const onError = (error) => {
      return Promise.reject(error);
    };

    this.axios.interceptors.request.use(onSend, onError);

    return this;
  }

  addResponseInterceptor() {
    const onSuccess = (response) => {
      return response;
    };

    const onError = (error) => {
      // eslint-disable-next-line
      const httpStatus = error?.response?.status;
      console.log(`error [${httpStatus}]: ${error.message}`);
      // TODO: handle wrong http status - redirect to error page
      return Promise.reject(error);
    };

    this.axios.interceptors.response.use(onSuccess, onError);

    return this;
  }
}